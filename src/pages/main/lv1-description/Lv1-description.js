import React from "react";
import './Lv1-description.css'
import { NavLink } from "react-router-dom";
import Rslide_btn from "../../../utilComponent/Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "../../../utilComponent/Button/slideBtn/Lslide-btn/Lslide_btn";
import Pastel_img from "../../../picture/pastel-img/pastel-img";
import { Swiper,SwiperSlide } from "swiper/react";
import useMainLv1DesStyle from "../hook-store/style-hooks/main-lv1-des-style";

function Lv1_description({title, data}){

    // hook
    const { RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change} = useMainLv1DesStyle()

    return(
        <div className="lv1-description-container">
            <div className="lv1-description-title">{title}</div>
            <div className="lv1-description-wrapper">
                <div className="lv1-content-gurabox">
                    {/* left */}
                    <Lslide_btn btnState={LbtnState} handleFunction = {moveLslide}></Lslide_btn>
                    {/* right */}
                    <Rslide_btn btnState={RbtnState} handleFunction = {moveRSlide}></Rslide_btn>
                </div>

                <div className="lv1-description-content">
                    <Swiper ref={swiper_ref} spaceBetween={24} slidesPerView={6} onSwiper={(target)=>{swiper_ref.current=target}} onSlideChange={swiper_change}>
                        {data ? data.map((ele,id)=>{                                              
                            return(
                            <SwiperSlide key={id}>
                                <NavLink to={`SubApp/${ele.city}?sort=createAt`} key={id} className="lv1-img-wrapper">
                                    <div className="lv1-img-container">
                                        <Pastel_img url={ele.url}></Pastel_img>
                                    </div>
                                    <div className="lv1-img-title">
                                        {ele.city}
                                    </div>
                                </NavLink>
                            </SwiperSlide>
                            )                  
                        }) : null}
                    </Swiper>                           
                </div>
            </div>

        </div>
    )
}

export default Lv1_description