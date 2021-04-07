var content =
        '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        "            카카오 스페이스닷원" +
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
        "        </div>" +
        '        <div class="body">' +
        '            <div class="desc">' +
        "				<div>기업명1</div>" +
        '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">채용중</a></div>' +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>";

      // 커스텀 오버레이가 표시될 위치입니다
      var position = new kakao.maps.LatLng(37.49887, 127.026581);

      // 커스텀 오버레이를 생성합니다
      var customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
        xAnchor: 0.3,
        yAnchor: 0.91,
      });

      // 커스텀 오버레이를 지도에 표시합니다
      customOverlay.setMap(map);
