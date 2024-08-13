import React,{useEffect} from "react"
import './Kakaomap.css'
import Card from "../card/card"
import ReactDOM from "react-dom/client";
import { useDispatch } from "react-redux";
import { initailized_map_target } from "../../../redux/modules/mapSlice";
import { Provider } from "react-redux";
import { store } from "../../../redux/config/configStore";




function Kakaomap({ adressData, setMain_adress_fun, set_sub_coorFn, event, scroll, city, data}){

    // adressData, setMain_adress_fun, set_sub_coorFn, event, scroll  ===> regist페이지에서 쓰는 props
    // city, data  ===> subapp 페이지에서 쓰는 props

    // console.log('렌더회수 체크')

    // dispatch
    const dispatch = useDispatch()

    //  지도 외부 찍었을 때 오버레이 상태 초기화
    function close_overlay(e){
        const boolean_value = e.target.classList.contains('card-title')
        if(boolean_value){
            return
        }else{
            dispatch(initailized_map_target())
        }
    }

    useEffect(()=>{
        const {kakao} = window
        const geocoder = new kakao.maps.services.Geocoder()

        ////////////////////////////////////////////////////////////////////////////////
        // city 프롭스가 있을 시(subapp에서 해당 지역 숙소 리스트 보여줄 때 들어오는 코드) //
        ////////////////////////////////////////////////////////////////////////////////

        if(city){
            try{
                geocoder.addressSearch(city, function(result, status) {
                    // 지도 중심 설정(지역)
                    // console.log(parseFloat(result[0].y) - 0.0005, parseFloat(result[0].x) + 0.0005)
                    // 카드 호버 시 상세정보가 표시 되므로 중심좌표 살짝 우하단으로 이동
                    const map_container = document.querySelector('.kakaomap-container')
                    const map = new kakao.maps.Map(map_container,{
                        center: new kakao.maps.LatLng(parseFloat(result[0].y) - 0.0005, parseFloat(result[0].x) + 0.0002),
                        level:8
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
            }catch(e){
                console.log(e)
            }
        }

        ////////////////////////////////////////////////
        // keyword props 없을 때 디폴트 좌표 = 카카오 본사
        ////////////////////////////////////////////////
        else{
        
        }


         

    },[adressData, data])
   


    return(
        <div className="kakaomap-container" onClick={close_overlay}></div>
    )
}

export default Kakaomap













//     const map_option = { 
        //         center: new kakao.maps.LatLng(36.3504119, 127.3845475),
        //         level: 8
        //     }
        //     const map = new kakao.maps.Map(document.getElementById('kakaoMap'), map_option)
            
        //     const imageSrc = 'https://img.icons8.com/emoji/48/triangular-flag.png', // 마커이미지의 주소입니다    
        //     imageSize = new kakao.maps.Size(100, 100), // 마커이미지의 크기입니다
        //     imageOption = {offset: new kakao.maps.Point(27, 69)} // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            
        //     // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        //     const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        //         markerPosition = new kakao.maps.LatLng(37.54699, 127.09598) // 마커가 표시될 위치입니다
    
        //     // 마커를 생성합니다
        //     const marker = new kakao.maps.Marker({
        //         position: markerPosition, 
        //         image: markerImage // 마커이미지 설정 
        //     })

        //     //////////주소 데이터 입력시 -> regist 페이지에서 사용
        //     if(adressData){
        //         const geocoder = new kakao.maps.services.Geocoder()

    
        //     // 마커가 지도 위에 표시되도록 설정합니다
        //     marker.setMap(map) 

        //         // 주소로 좌표를 검색합니다
        //         geocoder.addressSearch(adressData, function(result, status) {
        
        //         // 정상적으로 검색이 완료됐으면 
        //         if (status === kakao.maps.services.Status.OK) {
        //             // console.log(result[0].y, result[0].x)


        //             //주소setState함수 있을때만 << regist페이지에서씀 ㅇ
        //             if(setMain_adress_fun){
        //                 setMain_adress_fun(adressData, result[0]. x,result[0].y)
        //             }

        //             let coords = new kakao.maps.LatLng(result[0].y, result[0].x)
        
        //             // 결과값으로 받은 위치를 마커로 표시합니다
        //             marker.setPosition(coords)
        //             // // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        //             map.setCenter(coords)

        //             } 
        //             })
        //     }

        //     ////스크롤 가능 여부 
        //     map.setZoomable(scroll)

        //     if(event){
        //         kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
                
        //             // 클릭한 위도, 경도 정보를 가져옵니다 
        //             const latlng = mouseEvent.latLng 
        
        //             set_sub_coorFn(latlng.La, latlng.Ma)
                    
        //             // 마커 위치를 클릭한 위치로 옮깁니다
        //             marker.setPosition(latlng)                 
        //         })
        //     }






 



