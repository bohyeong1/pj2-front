import './main_section5.scss'
import Rslide_btn from "@/utilComponent/Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "@/utilComponent/Button/slideBtn/Lslide-btn/Lslide_btn";
import default_data from "@/util/default_data/default_data";
import { pop_three_texts, state_store } from "@/util/function/util_function";
import Pastel_img from "@/picture/pastel-img/pastel-img";
import { NavLink } from "react-router-dom";
import MainBtn from "@/utilComponent/Button/mainBtn/MainBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import useMainSection5Business from '../../hook_store/business_hooks/main_section5_business';
import useMainSection5Style from '../../hook_store/style_hooks/main_section5_style';
import { useState } from 'react';

function MainSection5({title}){

    // =================================================
    // states //
    const [data_store, setData_store] = useState(null)
    const [toggle, setToggle] = useState({key:'default'})

    // =================================================
    // hooks //
    // style
    const {RbtnState, LbtnState, swiper_ref, moveRSlide,
           moveLslide, swiper_change, toggle_btn} = useMainSection5Style()
    // business
    const {main_click} = useMainSection5Business({
                                'toggle_btn' : toggle_btn
                            },
                            state_store([
                                {
                                    'data_store' : data_store,
                                    'setData_store' : setData_store
                                },
                                {
                                    'toggle' : toggle,
                                    'setToggle' : setToggle
                                }
                            ])
                         )

    return(
        <div className="main-section5__container">
            <div className="main-section5__title-container">
                <p className="main-section5__title">
                    {title}
                </p>
                <div className="main-section5__selection">                  
                    <MainBtn keyword={'d_category_icon'} 
                             total={true} 
                             drop_function={main_click} 
                             toggle = {toggle}/>
                </div>
            </div>
            <div className="main-section5__wrapper">
                <div className="main-section5__content-gurabox">
                    {/* left */}
                    <Lslide_btn button_state={LbtnState} 
                                handle_function = {moveLslide}/>
                    {/* right */}
                    <Rslide_btn button_state={RbtnState} 
                                handle_function = {moveRSlide}/>
                </div>

                <div className="main-section5__content">
                    <Swiper spaceBetween={26.6} 
                            slidesPerView={4} 
                            onSwiper={(target)=>{swiper_ref.current=target}} 
                            onSlideChange={swiper_change}>
                        {data_store ? data_store.map((el,id)=>{  
                            return(
                                <SwiperSlide key={id}>
                                    <NavLink to={`/detail/${el._id}`} 
                                             key={id} 
                                             className="main-section5__img-wrapper">
                                        <div className="main-section5__img-container">
                                            <Pastel_img url={el.main_img}/>
                                        </div>
                                        <div className="main-section5__img-text">
                                            <div className="main-section5__img-tex1">
                                                <span>{el.category.name}</span>
                                            </div>
                                            <div className="main-section5__img-tex2">
                                                <span>{el.title}</span>
                                            </div>
                                            <div className="main-section5__img-tex3">
                                                <span>{el.search_adress}</span>
                                            </div>
                                            <div className="main-section5__img-tex4">
                                                <div className="main-section5__img-text4__star-box">
                                                    <img src={default_data.d_imgs.star}/>
                                                    <span>{`${el.average ? el.average.toFixed(2) : '미평가'}`}</span>
                                                </div>
                                                <span>{`${el.counts_review !== 0 && el.counts_review  ? `${el.counts_review}명 평가` : ''}`}</span>
                                            </div>
                                            <div className="main-section5__img-tex5">
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
    )
}

export default MainSection5