import React from "react";
import { NavLink } from "react-router-dom";
import './Lv4-description.css'
import Rslide_btn from "../../../utilComponent/Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "../../../utilComponent/Button/slideBtn/Lslide-btn/Lslide_btn";
import default_data from "../../../utilData/defaultData";
import { pop_three_texts } from "../../../utilData/UtilFunction";
import Pastel_img from "../../../picture/pastel-img/pastel-img";
import { Swiper, SwiperSlide } from "swiper/react";
import useMainLv4DesStyle from "../hook-store/style-hooks/main-lv4-des-style";

function Lv4_description({title, data, imgurl}){
    
    // hook
    const { RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change} = useMainLv4DesStyle()

    return(
        <div className="Lv4-description-container">
            <img className="lv4-des-con-backImg" src={`${imgurl ? imgurl : null}`} style={{display:`${imgurl ? 'block' : 'none'}`}}></img>
            <div className="lv4-des-con-wrapper">
                <div className="Lv4-description-title">{`자연과 하나 되는 ${title}`}</div>
                
                <div className="lv4-description-wrapper">
                    <div className="lv4-content-gurabox">
                        {/* left */}
                        <Lslide_btn btnState={LbtnState} handleFunction = {moveLslide}></Lslide_btn>
                        {/* right */}
                        <Rslide_btn btnState={RbtnState} handleFunction = {moveRSlide}></Rslide_btn>
                    </div>

                    <div className="Lv4-description-content">
                        <Swiper ref={swiper_ref} spaceBetween={16.6} slidesPerView={4} onSwiper={(target)=>{swiper_ref.current=target}} onSlideChange={swiper_change}>
                            {data ? data.map((ele,id)=>{  
                                let price
                                if(String(ele.price).length > 3){
                                    price = pop_three_texts(ele.price)
                                }else{
                                    price = ele.price
                                } 

                                return(
                                    <SwiperSlide key={id}>
                                        <NavLink to={`SubApp/Detail_infoApp/${ele._id}`} key={id} className="lv4-img-wrapper">
                                            <div className="lv4-img-container">
                                                <Pastel_img url={ele.main_img}></Pastel_img>
                                            </div>
                                            <div className="lv4-img-text">
                                                <div className="lv4-img-tex1">{ele.category.name}</div>
                                                <div className="lv4-img-tex2">{ele.title}</div>
                                                <div className="lv4-img-tex3">{ele.search_adress}</div>
                                                <div className="lv4-img-tex4">
                                                    <div className="lv4-img-text4__star-box">
                                                        <img src={default_data.d_imgs.star}></img>
                                                        <span>{`${ele.average ? ele.average.toFixed(2) : '미평가'}`}</span>
                                                    </div>
                                                    <span>{`${ele.counts_review !== 0 && ele.counts_review  ? `${ele.counts_review}명 평가` : ''}`}</span>
                                                </div>
                                                <div className="lv4-img-tex5">
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
        </div>
    )
}

export default Lv4_description