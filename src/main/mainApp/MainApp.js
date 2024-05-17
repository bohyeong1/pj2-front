import React from "react";
import { Link } from "react-router-dom";
import './MainApp.css'
import Lv1_description from "../lv1-description/Lv1-description";
import Lv2_description from "../lv2-description/Lv2-description";
import Lv3_description from "../lv3-description/Lv3-description";
import Main_menu from "../../menu/main-menu/main-menu";
import Side_menu from "../../menu/side-menu/side-menu";
import Search_menu from "../../menu/search-menu/search-menu";
import Footer from "../../menu/footer/Footer";

const data = [{
    img_url:'https://cdn.mhns.co.kr/news/photo/202201/520746_630720_356.jpg',
    title:'제주호텔',
    cityName:'제주도',
    price:12000,
    adress:'대전 둔산동 그린아트',
    evaluation:4.5,
    category:'모텔',
    keyword:['친환경']
},{
    img_url:'http://www.bokjinews.com/news/photo/202304/99645_33265_5629.jpg',
    title:'서울신라호텔',
    cityName:'서울',
    price:20000,
    adress:'대전 탄방동 탄방역',
    evaluation:4.8,
    category:'호텔',
    keyword:['가족여행']
}]

function MainApp(){

    // console.log(data[0].category)
    return(
        <div className="mainApp">
            <div className="main-gnb">
                <Main_menu></Main_menu>
                <Search_menu></Search_menu>
                {/* <Side_menu></Side_menu> */}
            </div>
            <div className="main-content">
                <Lv1_description title={'국내 인기 여행지'} data = {data}></Lv1_description>
                <Lv1_description title={'할인 해택 여행지'} data={data}></Lv1_description>
                <Lv2_description title={'인기 추천 숙소'} data={data}></Lv2_description>
                <Lv2_description title={'친환경 숙소'} data={data}></Lv2_description>
                <Lv2_description title={'가족여행 숙소'} data={data}></Lv2_description>
                <Lv3_description title={'할인 이벤트'} data={data}></Lv3_description>
                <div>이벤트 홍보</div>
            </div>
            <div className="main-footer">
                <Footer></Footer>
            </div>

        </div>

    )
}

export default MainApp