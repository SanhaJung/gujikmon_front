//Front
import React, { useEffect , useState} from 'react';
import {MarkerData} from './MarkerData';
import '../components/css/MapContainer.css';

import {Filter} from '../component/Filter';
import { observer } from 'mobx-react';
import { useStores } from '../store/Context';

const { kakao } = window;
//
//
export const MapContainer = observer((props) => {
  
    const[checked, setChecked] = useState(false);
    // const [myMap, setMyMap] =useState(null);


    const {companyStore,applyStore} = useStores();
    companyStore.init();
    applyStore.setApplyCompanies(companyStore.companys);

    // console.log(applyStore.applyCompanies);
    useEffect(() => {

      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5012860931305, 127.039604663862), //좌표 (y,x)
        level: 3,
      };
      const myMap = new kakao.maps.Map(container, options);
      

      //GPS 권한얻기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          let lat = position.coords.latitude, // 위도 y
            lon = position.coords.longitude; // 경도 x

          let locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 GPS로 얻어온 좌표로 생성
          displayMarkerMyHome(locPosition);
        });
      } else {
        //서울시청으로 기본값 넣기
      }

      //GPS 내위치 마커 이미지
      let imageSrcGPS = "https://gsmb.mss.go.kr/images/icon/ico-map-pin.png",
        imageSizeGPS = new kakao.maps.Size(30, 29);
        

      let markerImageGPS = new kakao.maps.MarkerImage(
        imageSrcGPS,
        imageSizeGPS,
      );

      //GPS 내 위치 마커 생성
      function displayMarkerMyHome(locPosition) {
        let marker = new kakao.maps.Marker({
          map: myMap,
          image: markerImageGPS,
          position: locPosition,
        });

        // 지도 중심좌표를 접속위치로 변경 GPS마커 생성
        myMap.setCenter(locPosition);
        marker.setMap(myMap);
      }

      // 클러스터러 생성
      let clusterer = new kakao.maps.MarkerClusterer({
        map: myMap,
        averageCenter: true,
        minLevel: 2,
        styles: [
          {
            color: "white",
            width: "50px",
            height: "50px",
            textAlign: "center",
            lineHeight: "50px",
            background:
              'url("https://gsmb.mss.go.kr/images/icon/ico-map-cluster.png") ',
          },
        ],
      });
     
      let markerImageSrc =
          "https://gsmb.mss.go.kr/images/icon/ico_kakao_medium_mark.png",
        markerImageSize = new kakao.maps.Size(64, 69),
        markerImageOption = {
          spriteSize: new kakao.maps.Size(34, 950),
          spriteOrigin: new kakao.maps.Point(0, 900),
          offset: new kakao.maps.Point(10, 50),
        };
      

      let companyMarkerImage = new kakao.maps.MarkerImage(
        markerImageSrc,
        markerImageSize,
        markerImageOption
      );

      //기업 마커 생성
      let markers = [];
      let hireMarkers = [];
      
      if (checked){
        applyStore.applyCompanies.forEach((el) => {
          removeMarker();
          const Companymarker = new kakao.maps.Marker({
            map: myMap,
            position: new kakao.maps.LatLng(el.y, el.x),
            image: companyMarkerImage,
            clickable: true,
            // MarkerImage : markerImage,
          });

          if (el.recruitment === true) {
            var contents =
              '<div class="customoverlay">' +
              '<div class="info">' +
              '<div class="title">' +
              el.coNm +
              "</div>" +
              '<div class="body">' +
              '<a href='+
              el.info[0].wantedInfoUrl+
              '>'+
              "채용중" +
              '</a>'+
              '</div ">' +
              '</div ">' +
              "</div>";
          } else {
            var contents =
              '<div class="customoverlay">' +
              '<div class="info">' +
              '<div class="title">' +
              el.coNm +
              "</div>" +
              '</div ">' +
              "</div>" 
          }

          const customOverlay = new kakao.maps.CustomOverlay({
            position: new kakao.maps.LatLng(el.y, el.x),
            content: contents,
           
          });

          //특정 지도 이상이면 말풍선 안보이는 이벤트
          kakao.maps.event.addListener(myMap, "zoom_changed", function () {
            let mapLevel = myMap.getLevel();
            if (mapLevel >= 3) {
              customOverlay.setMap(null);
            } else {
              customOverlay.setMap(myMap, Companymarker);
            }
          });

          hireMarkers.push(Companymarker); 
          
          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(Companymarker, "click", function () {
            
            customOverlay.setMap(myMap, Companymarker);
          
          });   
          //마커, 오버레이 지도 표시
          customOverlay.setMap(myMap, Companymarker);
          markers.push(Companymarker);
          clusterer.addMarkers(markers);
        });
      }
      else{

        companyStore.companys.forEach((el) => {
          removeMarker();
          const Companymarker = new kakao.maps.Marker({
            map: myMap,
            position: new kakao.maps.LatLng(el.y, el.x),
            image: companyMarkerImage,
            clickable: true,
          });

          if (el.recruitment === true) {
            var contents =
              '<div class="customoverlay">' +
              '<div class="info">' +
              '<div class="title">' +
              el.coNm +
              "</div>" +
              '<div class="body">' +
              '<a href='+
              el.info[0].wantedInfoUrl+
              '>'+
              "채용중" +
              '</a>'+
              '</div ">' +
              '</div ">' +
              "</div>";
          } else {
            var contents =
              '<div class="customoverlay">' +
              '<div class="info">' +
              '<div class="title">' +
              el.coNm +
              "</div>" +
              '</div ">' +
              "</div>" 
          }

          const customOverlay = new kakao.maps.CustomOverlay({
            position: new kakao.maps.LatLng(el.y, el.x),
            content: contents,
          
          });

          //특정 지도 이상이면 말풍선 안보이는 이벤트
          kakao.maps.event.addListener(myMap, "zoom_changed", function () {
            let mapLevel = myMap.getLevel();
            if (mapLevel >= 4) {
              customOverlay.setMap(null);
            } else {
              customOverlay.setMap(myMap, Companymarker);
            }
          });

          hireMarkers.push(Companymarker); 
          
          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(Companymarker, "click", function () {
            customOverlay.setMap(myMap, Companymarker);
          });   
          //마커, 오버레이 지도 표시
          customOverlay.setMap(myMap, Companymarker);
          markers.push(Companymarker);
          clusterer.addMarkers(markers);
        });
      }
        //↑마커 생성끝
      
      //마커 지우기
      function removeMarker() {
        for ( var i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }   
        markers = [];
    }
      myMap.setCopyrightPosition(kakao.maps.CopyrightPosition.BOTTOMRIGHT, true);
    },[checked]);

    function change() {
      setChecked(!checked);
      console.log(checked);
    }

    
    return (
      <React.Fragment>
        <div id="map" style={{ width: "100%", height: "60vh" }}>
        <Filter></Filter>

          <div
            class="can-toggle can-toggle--size-large"
            style={{ float: "right", right : '7%', top : '9%'  }}
          >
            <input id="c" type="checkbox"/>
            <label for="c">
              <div
                class="can-toggle__switch"
                data-checked="채용중"
                data-unchecked="전체"
                value={checked}
                onClick={change}
              ></div>
            </label>
          </div>
        </div>

      </React.Fragment>
    );
})

