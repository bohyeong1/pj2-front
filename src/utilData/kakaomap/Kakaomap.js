import React,{useEffect} from "react";
import './Kakaomap.css'
// import { Map,MapMarker } from "react-kakao-maps-sdk";





function Kakaomap(){

    useEffect(()=>{
        const {kakao} = window

        const mapContainer = document.getElementById('kakaoMap'), 
        mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };
    
        const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성

        const marker = new kakao.maps.Marker({ 
            // 마커
            position: map.getCenter() 
        }); 
        // 지도에 마커를 표시합니다
        marker.setMap(map);
        
        // 지도에 클릭 이벤트를 등록합니다
        // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
            
            // 클릭한 위도, 경도 정보를 가져옵니다 
            const latlng = mouseEvent.latLng; 
            
            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);
            
            let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            message += '경도는 ' + latlng.getLng() + ' 입니다';
            
            let resultDiv = document.getElementById('clickLatlng'); 
            resultDiv.innerHTML = message;
            
        });
    },[])


    

    return(
        <div className="kakaoMap-container">
            <div id="kakaoMap" style={{width:'100%',height:'100%'}}></div>
            <div id="clickLatlng"></div>

        </div>

            // <Map 
            //     center={{ lat: 33.5563, lng: 126.79581 }}   // 지도의 중심 좌표
            //     style={{ width: '100%', height: '100%' }} // 지도 크기
            //     level={3}                                   // 지도 확대 레벨
            // >
            //             <MapMarker
            //                 position={{ lat: 33.5563, lng: 126.79581 }}
            //             >                        
            //             here
            //             </MapMarker>
            // </Map>

    )
}

export default Kakaomap