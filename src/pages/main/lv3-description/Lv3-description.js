import React, {useRef, useState}from "react";
import { NavLink } from "react-router-dom";
import './Lv3-description.css'
import Rslide_btn from "../../../Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "../../../Button/slideBtn/Lslide-btn/Lslide_btn";
import Pastel_img from "../../../picture/pastel-img/pastel-img";
import { Swiper, SwiperSlide } from "swiper/react";

function Lv3_description({title,data}){
    
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
            if(btn_state){
                setRbtnState(true)
            }else{
                if(LbtnState){
                    setLbtnState(false)
                }
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
            }else{
                if(RbtnState){
                    setRbtnState(false)
                }
            }
        }
    }

    return(
        <div className="lv3-description-container">
            <div className="lv3-description-title">{title}</div>
            {/* <div className="lv3-description-content">
                <div className="lv3-content-container" ref={slideContainer} style={{left: slidePos + 'px'}}>
                    {data ? data.map((ele,id)=>{  
                        
                        return(
                        <NavLink to={`SubApp/Detail_infoApp/${ele._id}`} key={id} className="lv3-img-wrapper">
                            <div className="lv3-img-container">
                                <Pastel_img url={ele.main_img}></Pastel_img>
                            </div>
                            <div className="lv3-img-text">
                                <div className="lv3-img-tex1">{ele.keywords.slice(0,3).map((ele)=>{return ele.name}).join(' ')}</div>
                                <div className="lv3-img-tex2-box">
                                    <div className="lv3-img-tex2-1">{ele.title}</div>
                                    <div className="lv3-img-tex2-2">할인 이벤트</div>
                                </div>
                                <div className="lv3-img-tex3">~6월 30일까지</div>

                            </div>
                        </NavLink>
                        )                  
                                           
                    }) : null}
                </div>                
            </div> */}
            
            {/* left */}
            <Lslide_btn btnState={LbtnState} handleFunction = {moveLslide}></Lslide_btn>
            {/* right */}
           <Rslide_btn btnState={RbtnState} handleFunction = {moveRSlide}></Rslide_btn>  
        </div>
    )
}

export default Lv3_description