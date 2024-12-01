import './main_section1.scss'
import { NavLink } from "react-router-dom";
import Rslide_btn from "@/utilComponent/Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "@/utilComponent/Button/slideBtn/Lslide-btn/Lslide_btn";
import Pastel_img from "@/picture/pastel-img/pastel-img";
import { Swiper,SwiperSlide } from "swiper/react";
import useMainSection1Style from '../../hook_store/style_hooks/main_section1_style';

function MainSection1({title, data}){

    // =================================================
    // hooks //
    // style
    const {RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change} = useMainSection1Style()

    return(
        <div className="main-section1__container">
            <div className="main-section1__title">{title}</div>
            <div className="main-section1__wrapper">
                <div className="lv1-content-gurabox">
                    {/* left */}
                    <Lslide_btn 
                        button_state={LbtnState} 
                        handle_function = {moveLslide}/>
                    {/* right */}
                    <Rslide_btn 
                        btnbutton_stateState={RbtnState} 
                        handle_function = {moveRSlide}/>
                </div>

                <div className="main-section1__content">
                    <Swiper 
                        ref={swiper_ref} 
                        spaceBetween={24} 
                        slidesPerView={6} 
                        onSwiper={(target)=>{swiper_ref.current=target}} 
                        onSlideChange={swiper_change}>
                        {data ? data.map((el,id)=>{                                              
                            return(
                            <SwiperSlide key={id}>
                                <NavLink 
                                    to={`list?search-adress=${el.city}&sort=createAt&price-min=0&price-max=500000&page=1&limit=10`} 
                                    key={id} 
                                    className="main-section1__img-wrapper">
                                    <div className="main-section1__img-container">
                                        <Pastel_img url={el.url}/>
                                    </div>
                                    <div className="main-section1__img-title">
                                        <span>
                                            {el.city}
                                        </span>                                        
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

export default MainSection1