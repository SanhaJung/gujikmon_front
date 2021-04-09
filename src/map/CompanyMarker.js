import React from 'react';
import MarkerData from './MarkerData';
const { kakao } = window;


const CompanyMarker = () => {
    //기업 마커 생성
    var markers = [];
    MarkerData.forEach((el) => {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(el.lat, el.lng),
        });

        var customOverlay = new kakao.maps.CustomOverlay({
            position: new kakao.maps.LatLng(el.lat, el.lng),
            content: el.coNm,
            xAnchor: 0.6,
            yAnchor: 3,
          });

           // 클러스터러 생성
      var clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true, 
        minLevel: 4,
      });
      
        customOverlay.setMap(map, marker);
        markers.push(marker);
        clusterer.addMarkers(markers);
    });
    return (
        <div>
            
        </div>
    );
};

export default CompanyMarker;