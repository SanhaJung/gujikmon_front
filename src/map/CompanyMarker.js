import React from 'react';

const CompanyMarker = () => {

    //기업 마커 생성
    MarkerData.map ((el) => {
        const companyMarker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(el.lat, el.lng),
        });

        var customOverlay = new kakao.maps.CustomOverlay({
            position: new kakao.maps.LatLng(el.lat, el.lng),
            content : el.coNm,
            xAnchor: 0.6,
            yAnchor: 3
            //
            
            //
        }); 
    //     var contents =
    // '<div class="wrap">' +
    // '    <div class="info">' +
    // '        <div class="title">' +
    // "            카카오 스페이스닷원" +
    // '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
    // "        </div>" +
    // '        <div class="body">' +
    // '            <div class="desc">' +
    // "				<div>기업명1</div>" +
    // '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">채용중</a></div>' +
    // "            </div>" +
    // "        </div>" +
    // "    </div>" +
    // "</div>";

        customOverlay.setMap(map); 
      });
      
    return (
        <div>
            
        </div>
    );
};

export default CompanyMarker;