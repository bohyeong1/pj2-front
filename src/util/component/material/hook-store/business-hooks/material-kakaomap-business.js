import React, {useEffect, useState, useRef} from "react"
import Card from "../../card/card"
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { store } from "@/redux/config/configStore";
import { useDispatch } from "react-redux";
import { initailized_map_target } from "@/redux/modules/mapSlice";
import CustomMapOverlay from "../../custom_map_overlay/custom_map_overlay";
import ReactDOMServer from 'react-dom/server'

function useMaterialKakaomapBusiness(hook_data, states, refs, props){

    // =================================================
    // dispatch // 
    const dispatch = useDispatch()

    // =================================================
    // redux state // 
    const target_class = useSelector(state => state.target_class.target_class)

    // =================================================
    // props // 
    const {
        adress_data, 
        set_main_adress, 
        set_sub_coordinate, 
        sub_adress_coordinate,
        event, 
        scroll, 
        city, 
        data,
        type,
        path
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
    const map_ref = useRef(null)
    const marker_ref = useRef(null)
    const polyline_ref = useRef([])
    const path_marker_ref = useRef([])
    const zoom_control_state = useRef(false)

    // =================================================
    // kakao map render //  
    useEffect(()=>{        
        try{
            // 예약
            if(type === 'reservation'){
                // map
                const map_option = { 
                    center: new kakao.maps.LatLng(
                        adress_data ? adress_data[1] : 37.402056, 
                        adress_data ? adress_data[0] : 127.108212
                    ),
                    level: 7
                }
                map_ref.current = new kakao.maps.Map(document.querySelector('.kakaomap-container'), map_option)
                const zoom_control = new kakao.maps.ZoomControl()
                map_ref.current.addControl(zoom_control, kakao.maps.ControlPosition.RIGHT)

                // marker
                const image_src = '/imgs/map_marker_red.png',    
                image_size = new kakao.maps.Size(40, 40)            
                const marker_image = new kakao.maps.MarkerImage(image_src, image_size)
    
                const marker_position = new kakao.maps.LatLng(
                    adress_data ? adress_data[1] : 37.402056, 
                    adress_data ? adress_data[0] : 127.108212
                )

                marker_ref.current = new kakao.maps.Marker({
                    position: marker_position, 
                    image: marker_image
                })

                marker_ref.current.setMap(map_ref.current)
                marker_ref.current.setPosition(marker_position)

                //scroll 
                map_ref.current.setZoomable(scroll)

                const path_color = ['#1273E4', '#C13515', '#228B22']
                
                // polyline
                if(path.length){
                    path.forEach((el, index)=>{
                        const custom_path = el.guides.map((point) => {return new kakao.maps.LatLng(point.y, point.x)})
                        const polyline = new kakao.maps.Polyline({
                            path: custom_path,
                            strokeWeight: 5,
                            strokeColor: path_color[index],
                            strokeOpacity: 0.7,
                            strokeStyle: 'solid'
                        })

                        polyline.is_visible = true
                        polyline.target = `kakao-map__custom-overlay-${index}`
                        polyline.setMap(map_ref.current)
                        polyline_ref.current.push(polyline)

                        el.guides.forEach((ele) => {
                            if(ele.name){     
                                if(ele.name !== '목적지'){
                                    const marker_position = new kakao.maps.LatLng(ele.y, ele.x);
                                    const marker = new kakao.maps.Marker({
                                        position: marker_position
                                    })
                                    marker.target = `kakao-map__custom-overlay-${index}`
                                    marker.is_visible = true
                                    path_marker_ref.current.push(marker)
                                    marker.setMap(map_ref.current)
                                }       

                                const virtual_overlay = document.createElement('div')
                                virtual_overlay.style.position = 'absolute'
                                virtual_overlay.style.transform = 'translate(-50%, -50%)'

                                const root = ReactDOM.createRoot(virtual_overlay)
                                root.render(
                                    <Provider store={store}>
                                        <CustomMapOverlay 
                                            class_name = {`kakao-map__custom-overlay-${index}`}
                                            background_color = {path_color[index]}
                                            text = {ele.name}
                                            initial = {el.name}/>
                                    </Provider>)

                                const custom_overlay = new kakao.maps.CustomOverlay({
                                    content: virtual_overlay,
                                    position : new kakao.maps.LatLng(ele.y, ele.x),
                                    zIndex: 10
                                })
                                custom_overlay.setMap(map_ref.current)
                            }
                        })
                    })
                }
            }
            // 기본
            else if(type === 'default'){
                const map_option = { 
                    center: new kakao.maps.LatLng(
                        sub_adress_coordinate ? sub_adress_coordinate[1] : 37.402056, 
                        sub_adress_coordinate ? sub_adress_coordinate[0] : 127.108212
                    ),
                    level: 6
                }
                map_ref.current = new kakao.maps.Map(document.querySelector('.kakaomap-container'), map_option)
                const zoom_control = new kakao.maps.ZoomControl()
                map_ref.current.addControl(zoom_control, kakao.maps.ControlPosition.RIGHT)
    
                // marker style            
                const image_src = '/imgs/map_marker_red.png',    
                image_size = new kakao.maps.Size(50, 50),
                image_option = {offset: new kakao.maps.Point(25, 25)}             
                const marker_image = new kakao.maps.MarkerImage(image_src, image_size, image_option)
    
                const marker_position = new kakao.maps.LatLng(
                    sub_adress_coordinate ? sub_adress_coordinate[1] : 37.402056, 
                    sub_adress_coordinate ? sub_adress_coordinate[0] : 127.108212
                )

                // marker 생성
                marker_ref.current = new kakao.maps.Marker({
                    position: marker_position, 
                    image: marker_image
                })
    
                if(adress_data){
                    marker_ref.current.setMap(map_ref.current) 
                    geocoder.addressSearch(adress_data, function(result, status){      
                        if(status === kakao.maps.services.Status.OK){
                            // main_adress, 좌표값 설정
                            if(set_main_adress){
                                set_main_adress(adress_data, result[0].x, result[0].y)
                            }
    
                            const coordinate = new kakao.maps.LatLng(result[0].y, result[0].x)
                
                            marker_ref.current.setPosition(coordinate)
                            map_ref.current.setCenter(coordinate)
                        } 
                    })
                }else{
                    marker_ref.current.setMap(map_ref.current)
                    marker_ref.current.setPosition(marker_position)
                }
    
                //scroll 
                map_ref.current.setZoomable(scroll)
    
                // 지도 클릭 시 좌표 재 설정
                if(event){
                    kakao.maps.event.addListener(map_ref.current, 'click', function(e){   
                        // 클릭한 위치 coordinate
                        const latlng = e.latLng 
                        set_sub_coordinate(latlng.La, latlng.Ma)
                        
                        // 지도 좌표 결과값으로 이동
                        marker_ref.current.setPosition(latlng)                 
                    })
                }
            }
            // list
            else if(type === 'list'){
                geocoder.addressSearch(city, function(result, status){
                    // 지도 중심 설정(지역)
                    const map_container = document.querySelector('.kakaomap-container')
                    map_ref.current = new kakao.maps.Map(map_container,{
                        center: new kakao.maps.LatLng(parseFloat(result[0].y), parseFloat(result[0].x)),
                        level:8
                    })
                    if(map_ref.current && !zoom_control_state.current){
                        const zoom_control = new kakao.maps.ZoomControl()
                        map_ref.current.addControl(zoom_control, kakao.maps.ControlPosition.RIGHT)
                        zoom_control_state.current = true
                    }


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
                        custom_overlay.setMap(map_ref.current) 

                        // 리액트 카드 컴포넌트 렌더링
                        const root_container = ReactDOM.createRoot(portal_container)
                        root_container.render(
                            <Provider store={store}>
                                <Card 
                                    data={el} 
                                    custom_overlay={custom_overlay}/>
                            </Provider>
                        )
                    })
                })
            }
            else{
                console.log('invalid props')
            }            
        }catch(e){
            console.log(e)
        }     

        return () => {
            if(event){
                kakao.maps.event.removeListener(map_ref.current, 'click')
            } 
            marker_ref.current?.setMap(null)
            map_ref.current = null
        }
    },[adress_data, data, type])

    // =================================================
    // calculate target polyline index based on case reservation //  
    useEffect(()=>{
        if(target_class){
            if(polyline_ref.current.length){
                polyline_ref.current.forEach((el) => {
                    if(el.is_visible === false){
                        el.setMap(map_ref.current)
                        el.is_visible = true
                    } 
                })
                
                polyline_ref.current.forEach((el) => {
                    if(el.target !== target_class){
                        el.setMap(null)
                        el.is_visible = false
                    } 
                })

                path_marker_ref.current.forEach((el) => {
                    if(el.target !== target_class){
                        el.setMap(null)
                        el.is_visible = false
                    }
                })
            }
        }
        else{
            if(polyline_ref.current.length){
                polyline_ref.current.forEach((el) => {
                    if(el.is_visible === false){
                        el.setMap(map_ref.current)
                        el.is_visible = true
                    } 
                })

                path_marker_ref.current.forEach((el) => {
                    if(el.is_visible === false){
                        el.setMap(map_ref.current)
                        el.is_visible = true
                    }
                })
            }
        }
    }, [target_class])

    return {close_overlay}
}

export default useMaterialKakaomapBusiness




