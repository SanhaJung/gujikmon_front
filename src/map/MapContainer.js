
import React, { useEffect } from 'react';
import {MarkerData} from './MarkerData';
const { kakao } = window;

const MapContainer = () => {

    useEffect(() => {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5012860931305, 127.039604663862), //좌표 (y,x)
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
      
      //자택 위치 마커 이미지
      var imageSrc = "https://gsmb.mss.go.kr/images/icon/ico-map-pin.png",  //추후 수정 
        imageSize = new kakao.maps.Size(30, 29), 
        imageOption = { offset: new kakao.maps.Point(27, 69) };

      var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );
       
        //기업 마커 생성
        MarkerData.forEach  ((el) => {
            const companyMarker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(el.lat, el.lng),
            });
            var customOverlay = new kakao.maps.CustomOverlay({
                content: el.title,
                position: new kakao.maps.LatLng(el.lat, el.lng),
                xAnchor: 0.6,
                yAnchor: 3
            }); 
            customOverlay.setMap(map); 
          });
          

      //GPS 권한
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude, // 위도 y
              lon = position.coords.longitude; // 경도 x

          var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = ""; //

          displayMarker(locPosition);
        });
      } else {
      }

      //GPS 내 위치 마커
      function displayMarker(locPosition, message) {
        var marker = new kakao.maps.Marker({
          map: map,
          image: markerImage,
          position: locPosition
        });
        
        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);
        marker.setMap(map);
        
      }

      
    }, []);

    
    return (
        <div id='map' style={{
            width: '100%', 
            height: '40vw'
        }}></div>
    );
}

export default MapContainer; 

