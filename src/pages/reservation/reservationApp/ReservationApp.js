import React from "react";
import { Link } from "react-router-dom";
import './ReservationApp.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Footer from "../../../menu/footer/Footer";
import Res_con_sec1 from "../res-con/res-con-sec1/Res-con-sec1";
import Res_con_payment from "../res-con/res-con-payment/Res-con-payment";


const user = {                         //////////////호스트 정보
    name:'서보형',
    carrer:3
}
const data = {                  //////////추가될 데이터 속성 : 숙소 이용규칙/환불정책 , 숙소 위치(위도,경도) , 숙소 평가 데이터 모델 세분화
    img_url:'https://cdn.mhns.co.kr/news/photo/202201/520746_630720_356.jpg',
    img_inv:['https://cdn.mhns.co.kr/news/photo/202201/520746_630720_356.jpg','https://cdn.mhns.co.kr/news/photo/202201/520746_630720_356.jpg','https://cdn.mhns.co.kr/news/photo/202201/520746_630720_356.jpg','https://cdn.mhns.co.kr/news/photo/202201/520746_630720_356.jpg'],
    title:'제주호텔',
    cityName:'제주도',
    price:12000,
    adress:'대전 둔산동 그린아트',
    evaluation:4.5,
    category:'모텔',
    keyword:['친환경'],
    grade:3,
    base_facility:[{name:'침실', cuanity:3},{name:'침대', cuanity:2},{name:'욕실', cuanity:2}],
    capacity:4,
    reply:102,
    service_facility:[{name:'주차장', img:''},{name:'조식', img:''},{name:'와이파이', img:''}],
    summary : '아늑하고 따듯하고 편안하고 끝내주는 숙소입니다.'
}


function ReservationApp(){
    return(
        <div className="ReservationApp">
            <Main_menu></Main_menu>
            <div className="ReservationApp-content">
                <div className="ReservationApp-content-sec1">
                    <Res_con_sec1></Res_con_sec1>
                </div>
                <div className="ReservationApp-content-sec2">
                    <Res_con_payment data={data}></Res_con_payment>
                </div>
            </div>
            <div className="ReservationApp-footer">
                <Footer></Footer>
            </div>

        </div>
    )
}

export default ReservationApp