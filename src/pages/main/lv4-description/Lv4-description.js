import React, {useRef, useState}from "react";
import { NavLink } from "react-router-dom";
import './Lv4-description.css'
import Rslide_btn from "../../../Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "../../../Button/slideBtn/Lslide-btn/Lslide_btn";
import default_data from "../../../utilData/defaultData";
import { pop_three_texts } from "../../../utilData/UtilFunction";
import Pastel_img from "../../../picture/pastel-img/pastel-img";
import { Swiper, SwiperSlide } from "swiper/react";

function Lv4_description({title, data, imgurl}){
    
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
        if(index === length-4){
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
                                                <div className="lv4-img-tex4"><img style={{width:'20px', height:'20px'}} src={default_data.d_imgs.star}></img>
                                                {`${ele.avgEvaluation.length != 0 ? (ele.avgEvaluation.reduce((prev, cur) => {return prev + cur},0)/ele.avgEvaluation.length).toFixed(2) : 
                                                '미평가'}`}</div>
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