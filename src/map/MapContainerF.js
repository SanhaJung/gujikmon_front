import React, { useEffect } from 'react';
import {MarkerData} from './MarkerData';
import '../components/css/MapContainer.css';

function MapContainerF(props) {
    
    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.5012860931305, 127.039604663862), //좌표 (y,x)
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
    return (
        <div id='map' style={{
            width: '100%', 
            height: '40vw'
        }}>
        </div>
    );
}

export default MapContainerF;