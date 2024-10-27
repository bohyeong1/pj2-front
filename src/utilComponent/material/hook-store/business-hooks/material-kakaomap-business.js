import React, {useEffect, useState} from "react"
import Card from "../../card/card"
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { initailized_map_target } from "@/redux/modules/mapSlice";

function useMaterialKakaomapBusiness(hook_data, states, refs, props){

    // =================================================
    // dispatch // 
    const dispatch = useDispatch()

    // =================================================
    // props // 
    const {
        adress_data, 
        set_main_adress, 
        set_sub_coordinate, 
        event, 
        scroll, 
        city, 
        data
    } = props

    // =================================================
    // 지도 외부 찍었을 때 오버레이 상태 초기화 //     
    function close_overlay(e){
        const boolean_value = e.target.classList.contains('card-title')
        if(boolean_value){
            return
        }else{
            dispatch(initailized_map_target())
        }
    }

    const [kakao] = useState(window.kakao)
    const [geocoder] = useState(new kakao.maps.services.Geocoder())

    // =================================================
    // regist / host / detail page 일 때 그리는 지도 & 디폴트 좌표 = 카카오 본사 //  
    useEffect(()=>{

        try{
            const map_option = { 
                center: new kakao.maps.LatLng(37.402056, 127.108212),
                level: 6
            }
            const map = new kakao.maps.Map(document.querySelector('.kakaomap-container'), map_option)
            const zoom_control = new kakao.maps.ZoomControl()
            map.addControl(zoom_control, kakao.maps.ControlPosition.RIGHT)

            // marker style            
            const image_src = '/imgs/map_marker_red.png',    
            image_size = new kakao.maps.Size(50, 50),
            image_option = {offset: new kakao.maps.Point(25, 25)}             
            const marker_image = new kakao.maps.MarkerImage(image_src, image_size, image_option)
            const marker_position = new kakao.maps.LatLng(37.54699, 127.09598)
    
            // marker 생성
            const marker = new kakao.maps.Marker({
                position: marker_position, 
                image: marker_image
            })

            if(adress_data){
                marker.setMap(map) 
                geocoder.addressSearch(adress_data, function(result, status){        
    
                if(status === kakao.maps.services.Status.OK){
                    // main_adress, 좌표값 설정
                    if(set_main_adress){
                        set_main_adress(adress_data, result[0].x, result[0].y)
                    }
                    const coordinate = new kakao.maps.LatLng(result[0].y, result[0].x)
        
                    // 지도 좌표 결과값으로 이동
                    marker.setPosition(coordinate)
                    map.setCenter(coordinate)
                    } 
                })
            }

            //스크롤 가능 여부 
            map.setZoomable(scroll)

            // 지도 클릭 시 좌표 재 설정
            if(event){
                kakao.maps.event.addListener(map, 'click', function(e){   
                    // 클릭한 위치 coordinate
                    const latlng = e.latLng 
                    set_sub_coordinate(latlng.La, latlng.Ma)
                    
                    // 지도 좌표 결과값으로 이동
                    marker.setPosition(latlng)                 
                })
            }
        }catch(e){
            console.log(e)
        }     
    },[adress_data])

    // =================================================
    // city 프롭스가 있을 시(list app에서 해당 지역 숙소 리스트 보여줄 때 지도) //  
    useEffect(()=>{
        try{
            if(city){            
                const {kakao} = window
                const geocoder = new kakao.maps.services.Geocoder()

                geocoder.addressSearch(city, function(result, status) {
                    // 지도 중심 설정(지역)
                    const map_container = document.querySelector('.kakaomap-container')
                    const map = new kakao.maps.Map(map_container,{
                        center: new kakao.maps.LatLng(parseFloat(result[0].y) - 0.1, parseFloat(result[0].x) + 0.05),
                        level:9
                    })
                    // 지도 확대 축소 + - 버튼
                    const zoom_control = new kakao.maps.ZoomControl()
                    map.addControl(zoom_control, kakao.maps.ControlPosition.RIGHT)

                    // 커스텀 오버레이 표시(지역의 숙소 위치 정보)
                    data?.forEach((el)=>{
                        // portal container
                        const portal_container = document.createElement('div')
                        portal_container.className = 'kakaomap-container__portal-container'
                        const accomodation_coor = el.main_adress.coor                        
                        const position = new kakao.maps.LatLng(accomodation_coor[1],accomodation_coor[0])
                        
                        const custom_overlay = new kakao.maps.CustomOverlay({
                            position:position,
                            content:portal_container
                        })
                        custom_overlay.setMap(map) 

                        // 리액트 카드 컴포넌트 렌더링
                        const root_container = ReactDOM.createRoot(portal_container)
                        root_container.render(
                            <Provider store={store}>
                                <Card data={el} custom_overlay={custom_overlay}></Card>
                            </Provider>
                            )
                    })
                })
            }
        }catch(e){
            console.log(e)
        }
        
    },[data])

    return {close_overlay}
}

export default useMaterialKakaomapBusiness




