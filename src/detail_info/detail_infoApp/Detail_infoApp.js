import React from "react";
import './Detail_infoApp.css'
import { Link } from "react-router-dom";
import Main_menu from "../../menu/main-menu/main-menu";
import Detail_many from "../../picture/detail-many/Detail-many";
import Detail from "../../picture/detail/Detail";
import Footer from "../../menu/footer/Footer";
import Det_sec1 from "../det-sec1/Det-sec1";
import Sec1_payment from "../det-sec1/sec1-payment/Sec1-payment";

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


function Detail_infoApp(){
    return(
        <div className="Detail_infoApp-container">
            <Main_menu></Main_menu>
            <div className="Detail_infoApp-img">
                <div className="info-imgBox1">
                    <Detail data={data}></Detail>
                </div>
                <div className="info-imgBox2">
                    <Detail_many data={data}></Detail_many>
                </div>
            </div>
            <div className="Detail_infoApp-sec1">
                <div className="det-info-con1">
                    <Det_sec1 data={data} user={user}></Det_sec1>
                </div>
                <div className="det-info-con2">
                    <Sec1_payment data={data}></Sec1_payment>
                </div>
            </div>
            <div className="Detail_infoApp-sec2">섹션 2 / 숙소 평가</div>
            <div className="Detail_infoApp-sec3">섹션 3 / 사용자 댓글</div>
            <div className="Detail_infoApp-sec4">섹션 4 / 숙소 위치/ 지도 api</div>
            <div className="Detail_infoApp-sec5">섹션 5 / 호스트 정보</div>
            <div className="Detail_infoApp-sec6">섹션 6 / 숙소 이용규칙/ 환불정책</div>

            <div className="Detail_infoApp-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Detail_infoApp 