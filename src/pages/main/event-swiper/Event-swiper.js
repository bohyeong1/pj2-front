import React from "react";
import './Event-swiper.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import Slice from "../../../utilData/slice/Slice";
import default_data from "../../../utilData/defaultData";

import 'swiper/css';

import 'swiper/css/pagination';

function Event_swiper(){
    return(
        <div className="Event_swiper-container">
            <div className="Event_swiper-title">이벤트</div>
            <div className="Event_swiper-content">
                <Swiper
                    className="Event-swiper-slide"
                    modules={[Pagination, A11y, Autoplay]}
                    slidesPerView={3}
                    loop={true}
                    speed={300}
                    spaceBetween={20}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true, className:'swp-pagination' }}
                    // onActiveIndexChange={(e)=>setSwiperIndex(e.realIndex)}
                    // onSwiper={(e) => {setSwiper(e)}}
                >
                    <SwiperSlide><Slice url={'https://daejeon.greenart.co.kr/'} img={default_data.d_imgs.slice_img1} title={'대전 그린컴퓨터학원'} text1={'신규 회원'} text2={'절찬리 모집중!'}></Slice></SwiperSlide>
                    <SwiperSlide><Slice url={'http://localhost:5000/Login'} img={default_data.d_imgs.slice_img2} title={'여행은? 보형짱닷컴'} text1={'여행의 패러다임'} text2={'보형짱닷컴!'}></Slice></SwiperSlide>
                    <SwiperSlide><Slice url={'https://www.hanwhaeagles.co.kr/index.do'} img={default_data.d_imgs.slice_img3} title={'한화 이글스 2024시즌'} text1={'한화이글스'} text2={'포스트시즌 기원!'}></Slice></SwiperSlide>
                    <SwiperSlide><Slice url={'https://comic.naver.com/webtoon/list?titleId=670143&tab=wed'} img={default_data.d_imgs.slice_img4} title={'네이버 웹툰'} text1={'최고의 웹툰은?'} text2={'헬퍼2 정주행!'}></Slice></SwiperSlide>

                </Swiper>
            </div>
        </div>
    )
}

export default Event_swiper



