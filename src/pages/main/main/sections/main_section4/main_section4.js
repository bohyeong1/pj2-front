import { NavLink } from "react-router-dom";
import './main_section4.scss'
import Rslide_btn from "@/utilComponent/Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "@/utilComponent/Button/slideBtn/Lslide-btn/Lslide_btn";
import default_data from "@/util/default_data/default_data";
import { pop_three_texts } from "@/util/function/util_function";
import Pastel_img from "@/picture/pastel-img/pastel-img";
import { Swiper, SwiperSlide } from "swiper/react";
import useMainSection4Style from "../../hook_store/style_hooks/main_section4_style";

function MainSection4({title, data, imgurl}){
    
    // =================================================
    // hooks //
    // style
    const {RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change} = useMainSection4Style()

    return(
        <div className="main-section4__container">
            <img className="main-section4__back-img" 
                 src={`${imgurl ? imgurl : null}`} 
                 style={{display:`${imgurl ? 'block' : 'none'}`}}/>
            <div className="main-section4__contents-wrapper">
                <div className="main-section4__title">
                    <span>{`자연과 하나 되는 ${title}`}</span>
                </div>
                
                <div className="main-section4__slider-wrapper">
                    <div className="main-section4__content-gurabox">
                        {/* left */}
                        <Lslide_btn button_state={LbtnState} 
                                    handle_function = {moveLslide}/>
                        {/* right */}
                        <Rslide_btn button_state={RbtnState} 
                                    handle_function = {moveRSlide}/>
                    </div>

                    <div className="main-section4__content">
                        <Swiper ref={swiper_ref} 
                                spaceBetween={16.6} 
                                slidesPerView={4} 
                                onSwiper={(target)=>{swiper_ref.current=target}} 
                                onSlideChange={swiper_change}>
                            {data ? data.map((el,id)=>{  
                                return(
                                    <SwiperSlide key={id}>
                                        <NavLink to={`/detail/${el._id}`} 
                                                 key={id} 
                                                 className="main-section4__img-wrapper">
                                            <div className="main-section4__img-container">
                                                <Pastel_img url={el.main_img}/>
                                            </div>
                                            <div className="main-section4__img-text">
                                                <div className="main-section4__img-text1">
                                                    <span>{el.category.name}</span>
                                                </div>
                                                <div className="main-section4__img-text2">
                                                    <span>{el.title}</span>
                                                </div>
                                                <div className="main-section4__img-text3">
                                                    <span>{el.search_adress}</span>
                                                </div>
                                                <div className="main-section4__img-text4">
                                                    <div className="main-section4__img-text4__star-box">
                                                        <img src={default_data.d_imgs.star}/>
                                                        <span>{`${el.average ? el.average.toFixed(2) : '미평가'}`}</span>
                                                    </div>
                                                    <span>{`${el.counts_review !== 0 && el.counts_review  ? `${el.counts_review}명 평가` : ''}`}</span>
                                                </div>
                                                <div className="main-section4__img-text5">
                                                    <span>{pop_three_texts(el.price)}</span>
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

export default MainSection4