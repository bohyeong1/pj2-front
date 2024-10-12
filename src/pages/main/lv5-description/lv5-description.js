import React from "react";
import './lv5-description.css'
import Rslide_btn from "../../../utilComponent/Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "../../../utilComponent/Button/slideBtn/Lslide-btn/Lslide_btn";
import default_data from "../../../utilData/defaultData";
import { pop_three_texts } from "../../../utilData/UtilFunction";
import Pastel_img from "../../../picture/pastel-img/pastel-img";
import { NavLink } from "react-router-dom";
import MainBtn from "../../../utilComponent/Button/mainBtn/MainBtn";
import { Swiper, SwiperSlide } from "swiper/react";

import useMainLv5DesBusiness from "../hook-store/business-hooks/main-lv5-des-business";
import useMainLv5DesStyle from "../hook-store/style-hooks/main-lv5-des-style";



function Lv5_description({title}){

    // hook
    const { RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change, toggle_btn} = useMainLv5DesStyle()
    const {dataStore,main_click,toggle} = useMainLv5DesBusiness(toggle_btn)

    return(
        <div className="lv5-description-container">
            <div className="lv5-description-title-container">
                <p className="lv5-description-title">{title}</p>
                <div className="lv5-description-selection">                  
                    <MainBtn keyword={'d_category_icon'} total={true} drop_function={main_click} toggle = {toggle}></MainBtn>
                </div>
            </div>
            <div className="lv5-description-wrapper">
                <div className="lv5-content-gurabox">
                    {/* left */}
                    <Lslide_btn btnState={LbtnState} handleFunction = {moveLslide}></Lslide_btn>
                    {/* right */}
                    <Rslide_btn btnState={RbtnState} handleFunction = {moveRSlide}></Rslide_btn>
                </div>

                <div className="lv5-description-content">
                    <Swiper spaceBetween={26.6} slidesPerView={4} onSwiper={(target)=>{swiper_ref.current=target}} onSlideChange={swiper_change}>
                        {dataStore ? dataStore.map((ele,id)=>{  
                            let price
                            if(String(ele.price).length > 3){
                                price = pop_three_texts(ele.price)
                            }else{
                                price = ele.price
                            } 
                            return(
                                <SwiperSlide key={id}>
                                    <NavLink to={`/detail/${ele._id}`} key={id} className="lv5-img-wrapper">
                                        <div className="lv5-img-container">
                                            <Pastel_img url={ele.main_img}></Pastel_img>
                                        </div>
                                        <div className="lv5-img-text">
                                            <div className="lv5-img-tex1">{ele.category.name}</div>
                                            <div className="lv5-img-tex2">{ele.title}</div>
                                            <div className="lv5-img-tex3">{ele.search_adress}</div>
                                            <div className="lv5-img-tex4">
                                                <div className="lv5-img-text4__star-box">
                                                    <img src={default_data.d_imgs.star}></img>
                                                    <span>{`${ele.average ? ele.average.toFixed(2) : '미평가'}`}</span>
                                                </div>
                                                <span>{`${ele.counts_review !== 0 && ele.counts_review  ? `${ele.counts_review}명 평가` : ''}`}</span>
                                            </div>
                                            <div className="lv5-img-tex5">
                                                <span>{price}</span>
                                                <span>원</span>
                                            </div>
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

export default Lv5_description