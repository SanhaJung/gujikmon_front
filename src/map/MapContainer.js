//Front
import React, { useEffect } from 'react';
import {MarkerData} from './MarkerData';
import '../components/css/MapContainer.css';


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

          var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          displayMarkerMyHome(locPosition);
        });
      } else {
          //서울시청으로 기본값 넣기
      }

      //GPS 내위치 마커 이미지
      var imageSrcGPS = "https://gsmb.mss.go.kr/images/icon/ico-map-pin.png",
        imageSizeGPS = new kakao.maps.Size(30, 29),
        imageOptionGPS = { offset: new kakao.maps.Point(27, 69) };

      var markerImageGPS = new kakao.maps.MarkerImage(
        imageSrcGPS,
        imageSizeGPS,
        imageOptionGPS
      );

       //GPS 내 위치 마커 생성
      function displayMarkerMyHome(locPosition, message) {
        var marker = new kakao.maps.Marker({
          map: map,
          image: markerImageGPS,
          position: locPosition
        });

        // 지도 중심좌표를 접속위치로 변경
        map.setCenter(locPosition);
        marker.setMap(map);
      }

      
      // 클러스터러 생성
      var clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 4,
      });

      //기업 마커 생성
      var markers = [];
      MarkerData.forEach((el) => {
        const marker = new kakao.maps.Marker({
          map: map,
          images : comapnyMarkerImage,
          position: new kakao.maps.LatLng(el.lat, el.lng),
        });

        var comapnyMarkerImage = [];

        var contents =
          '<div class="wrap">' +
          '    <div class="info">' +
          '        <div class="body">' +
          '            <div class="desc">' +
          "				<div class = 'el.coNm'>기업명1</div>" +
          '                <div class ="hire">채용중</div>' +
          "            </div>" +
          "        </div>" +
          "    </div>" +
          "</div>";
           
        var customOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(el.lat, el.lng),
          content: contents,
          xAnchor: 0.6,
          yAnchor: 3,
        });

        var toggle =
          '<div class="toogleBox">' +
            "<ul>" +
              '<li id = "total">' +
                "전체" +
              "</li>" +
              '<li id = "hiring">' +
               "채용중" +
              "</li>" +
            "</ul>" +
          "</div>";

        customOverlay.setMap(map, marker);
        markers.push(marker);
        clusterer.addMarkers(markers);

      });
     
    }, []);

    return (
      <div id="map" style={{ width: "100%", height: "60vh" }}></div>
    );
}

export default MapContainer; 

