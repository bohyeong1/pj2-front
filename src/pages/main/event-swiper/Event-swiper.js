import React from "react";
import './Event-swiper.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Event_swiper(){
    return(
        <div className="Event_swiper-container">
            <div className="Event_swiper-title">이벤트</div>
            <div className="Event_swiper-content">
                <Swiper
                    // className={styles.mainSwiper}
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    slidesPerView={3}
                    loop={true}
                    speed={300}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    // onActiveIndexChange={(e)=>setSwiperIndex(e.realIndex)}
                    // onSwiper={(e) => {setSwiper(e)}}
                >
                    <SwiperSlide>슬라이드 1</SwiperSlide>
                    <SwiperSlide>슬라이드 2</SwiperSlide>
                    <SwiperSlide>슬라이드 3</SwiperSlide>
                    <SwiperSlide>슬라이드 4</SwiperSlide>

                </Swiper>
            </div>
        </div>
    )

}

export default Event_swiper