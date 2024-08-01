import React, {useRef, useState} from "react";
import './Lv1-description.css'
import { NavLink } from "react-router-dom";
import Rslide_btn from "../../../Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "../../../Button/slideBtn/Lslide-btn/Lslide_btn";
import Pastel_img from "../../../picture/pastel-img/pastel-img";
import { Swiper,SwiperSlide } from "swiper/react";

function Lv1_description({title, data}){
    ///state
    const [RbtnState, setRbtnState] = useState(false)
    const [LbtnState, setLbtnState] = useState(true)

    ///ref
    const swiper_ref = useRef(null)

    //오른쪽버튼
    function moveRSlide () {
        if (swiper_ref.current) {
            swiper_ref.current.slideNext()
            const btn_state = swiper_ref.current.isEnd
            if(LbtnState){
                setLbtnState(false)
            }        
            if(btn_state){
                setRbtnState(true)
            }
        }
    }    

    ///왼쪽버튼
    function moveLslide(){
        if (swiper_ref.current) {
            swiper_ref.current.slidePrev()
            const btn_state = swiper_ref.current.isBeginning
            if(btn_state){
                setLbtnState(true)
            }
            if(RbtnState){
                setRbtnState(false)
            }
        }
    }

    // 스와이퍼 드래그 했을 때 버튼 상태 추적
    function swiper_change(){
        const index = swiper_ref.current.activeIndex
        const length = swiper_ref.current.slides.length
        if(index === 0){
            if(!LbtnState){
                setLbtnState(true)
            }
        }else{
            if(LbtnState){
                setLbtnState(false)
            }
        }        
        if(index === length-6){
            if(!RbtnState){
                setRbtnState(true)
            }
        }else{
            if(RbtnState){
                setRbtnState(false)
            }
        }
    }

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
                                <NavLink to={`SubApp/${ele.city}`} key={id} className="lv1-img-wrapper">
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

                {/* <div className="lv1-description-content">
                    <div className="lv1-content-container" ref={slideContainer} style={{left: slidePos + 'px'}}>
                        {data ? data.map((ele,id)=>{                                              
                            return(
                            <NavLink to={`SubApp/${ele.city}`} key={id} className="lv1-img-wrapper">
                                <div className="lv1-img-container">
                                    <Pastel_img url={ele.url}></Pastel_img>
                                </div>
                                <div className="lv1-img-title">
                                    {ele.city}
                                </div>
                            </NavLink>
                            )                  
                            
                        }) : null}
                    </div>                           
                </div> */}
            </div>

        </div>
    )
}

export default Lv1_description