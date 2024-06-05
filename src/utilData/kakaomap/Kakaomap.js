import React,{useEffect, useState} from "react";
import './Kakaomap.css'

function Kakaomap({ adressData, setMain_adress_fun, set_sub_coorFn, event}){



    useEffect(()=>{

        // console.log(adressData)

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



        //////////주소 데이터 입력시
        if(adressData){
            const geocoder = new kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(adressData, function(result, status) {
    
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
                // console.log(result[0].y, result[0].x)


                //주소setState함수 있을때만 << regist페이지에서씀 ㅇ
                if(setMain_adress_fun){
                    setMain_adress_fun(adressData, result[0]. x,result[0].y)
                }



                let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    
                // 결과값으로 받은 위치를 마커로 표시합니다
                marker.setPosition(coords);
                // // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);

                } 
                })
        }

        if(event){
            kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
            
                // 클릭한 위도, 경도 정보를 가져옵니다 
                const latlng = mouseEvent.latLng; 
    
                set_sub_coorFn(latlng.La, latlng.Ma)
                
                // 마커 위치를 클릭한 위치로 옮깁니다
                marker.setPosition(latlng);                 
            });
        }


    },[adressData])






   
    return(
        <div className="kakaoMap-container">
            <div id="kakaoMap" style={{width:'100%',height:'100%'}}></div>
            {/* <div id="clickLatlng"></div> */}

        </div>

    )
}

export default Kakaomap