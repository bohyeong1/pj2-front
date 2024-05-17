import React from "react";
import { Link } from "react-router-dom";
import './SubApp.css'
import Side_menu from "../../menu/side-menu/side-menu";
import Main_menu from "../../menu/main-menu/main-menu";
import Search from "../../menu/search-menu/search/Search";
import SubList from "../subList/SubList";
import Footer from "../../menu/footer/Footer";


const data = [{
    img_url:'https://cdn.mhns.co.kr/news/photo/202201/520746_630720_356.jpg',
    img_inv:['https://cdn.mhns.co.kr/news/photo/202201/520746_630720_356.jpg','https://cdn.mhns.co.kr/news/photo/202201/520746_630720_356.jpg','https://cdn.mhns.co.kr/news/photo/202201/520746_630720_356.jpg'],
    title:'제주호텔',
    cityName:'제주도',
    price:12000,
    adress:'대전 둔산동 그린아트',
    evaluation:4.5,
    category:'모텔',
    keyword:['친환경'],
    grade:3
},{
    img_url:'http://www.bokjinews.com/news/photo/202304/99645_33265_5629.jpg',
    img_inv:['http://www.bokjinews.com/news/photo/202304/99645_33265_5629.jpg','http://www.bokjinews.com/news/photo/202304/99645_33265_5629.jpg','http://www.bokjinews.com/news/photo/202304/99645_33265_5629.jpg'],
    title:'서울신라호텔',
    cityName:'서울',
    price:20000,
    adress:'대전 탄방동 탄방역',
    evaluation:4.8,
    category:'호텔',
    keyword:['가족여행'],
    grade:5
}]



function SubApp (){
    return(
        <div className="subApp">
            <Main_menu></Main_menu>
            <div className="sub-content">
                <Side_menu></Side_menu>
                <div className="sub-main-content">
                    <Search></Search>
                    <SubList data={data}></SubList>
                </div>
            </div>
            <div className="sub-footer">
              <Footer></Footer>
            </div>

        </div>
    )
}

export default SubApp