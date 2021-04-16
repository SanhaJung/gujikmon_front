//Front
import React, { useEffect } from 'react';
import {MarkerData} from './MarkerData';
import '../components/css/MapContainer.css';

import {Filter} from '../component/Filter';

const { kakao } = window;



const MapContainer = () => {
    useEffect(() => {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5012860931305, 127.039604663862), //좌표 (y,x)
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);

      //GPS 권한얻기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude, // 위도 y
            lon = position.coords.longitude; // 경도 x

          var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 GPS로 얻어온 좌표로 생성
          displayMarkerMyHome(locPosition);
        });
      } else {
        //서울시청으로 기본값 넣기
      }

      //GPS 내위치 마커 이미지
      var imageSrcGPS = "https://gsmb.mss.go.kr/images/icon/ico-map-pin.png",
        imageSizeGPS = new kakao.maps.Size(30, 29);
        

      var markerImageGPS = new kakao.maps.MarkerImage(
        imageSrcGPS,
        imageSizeGPS,
      );

      //GPS 내 위치 마커 생성
      function displayMarkerMyHome(locPosition) {
        var marker = new kakao.maps.Marker({
          map: map,
          image: markerImageGPS,
          position: locPosition,
        });

        // 지도 중심좌표를 접속위치로 변경 GPS마커 생성
        map.setCenter(locPosition);
        marker.setMap(map);
      }

      // 클러스터러 생성
      var clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 4,
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
     
      var markerImageSrc =
          "https://gsmb.mss.go.kr/images/icon/ico_kakao_medium_mark.png",
        markerImageSize = new kakao.maps.Size(64, 69),
        markerImageOption = {
          spriteSize: new kakao.maps.Size(30, 938),
          spriteOrigin: new kakao.maps.Point(0, 30),
          offset: new kakao.maps.Point(27, 69),
        };
      

      var companyMarkerImage = new kakao.maps.MarkerImage(
        markerImageSrc,
        markerImageSize,
        markerImageOption
      );

      //기업 마커 생성
      var markers = [];
      var hireMarkers = [];

      MarkerData.forEach((el) => {
        const Companymarker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(el.lat, el.lng),
          image: companyMarkerImage,
          clickable: true,
          // MarkerImage : markerImage,
        });

        if (el.recruitment === "true") {
          var contents =
            '<div class="customoverlay">' +
            '<div class="info">' +
            '<div class="title">' +
            el.coNm +
            "</div>" +
            '<div class="body">' +
            "채용중" +
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
          position: new kakao.maps.LatLng(el.lat, el.lng),
          content: contents,
          xAnchor: 0.35,
          yAnchor: 2.2,
        });

        //특정 지도 이상이면 말풍선 안보이는 이벤트
        kakao.maps.event.addListener(map, "zoom_changed", function () {
          var mapLevel = map.getLevel();
          if (mapLevel >= 4) {
            customOverlay.setMap(null);
          } else {
            customOverlay.setMap(map, Companymarker);
          }
        });

        //전체-채용중 
        function setMarkers(map) {
          for (var i = 0; i < hireMarkers.length; i++) {
            hireMarkers[i].setMap(map);
          }
        }
        document.getElementById("show").onclick = function showMarkers() {
          if (el.recruitment === "true") {
           setMarkers(map);
           customOverlay.setMap(map, Companymarker);
          }
        }
        document.getElementById("hide").onclick = function hideMarkers() {
          if (el.recruitment === "true") {
          setMarkers(null);
          customOverlay.setMap(null);
          }
        }
        hireMarkers.push(Companymarker);
        
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(Companymarker, "click", function () {
          customOverlay.setMap(map, Companymarker);
        });   
        //마커, 오버레이 지도 표시
        customOverlay.setMap(map, Companymarker);
        markers.push(Companymarker);
        clusterer.addMarkers(markers);
      });
      //↑마커 생성끝

      map.setCopyrightPosition(kakao.maps.CopyrightPosition.BOTTOMRIGHT, true);
    }, []);
  

  

    return (
      <React.Fragment>
        <div id="map" style={{ width: "100%", height: "60vh" }}>
          <Filter></Filter>
          <div
            class="can-toggle can-toggle--size-large"
            style={{ float: "left", left: "40%", top: "1.5%" }}
          >
            <input id="c" type="checkbox"/>
            <label for="c">
              <div
                class="can-toggle__switch"
                data-checked="채용중"
                data-unchecked="전체"
              ></div>
            </label>
          </div>
         
        </div>
        <button id="hide"  onclick="hideMarkers()">마커 감추기</button>
        <button id="show" onclick="showMarkers()">마커 보이기</button>
        {/* position:'relative', left:'91%', top:'15%' */}
      </React.Fragment>
    );
}

export default MapContainer; 

