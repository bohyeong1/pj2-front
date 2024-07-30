import React, {useRef, useState}from "react";
import { NavLink } from "react-router-dom";
import './Lv3-description.css'
import Large_main from "../../../picture/large-main/Large-main";
import Rslide_btn from "../../../Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "../../../Button/slideBtn/Lslide-btn/Lslide_btn";
import Pastel_img from "../../../picture/pastel-img/pastel-img";

function Lv3_description({title,data}){
    
            ///state
            const [RbtnState, setRbtnState] = useState(false)
            const [slidePos, setSlidePos] = useState(0)
            const [LbtnState, setLbtnState] = useState(false)
            const [left, setLeft] = useState(0)
        
            //오른쪽버튼
           function moveRSlide (distance) {
                const parentBoxWidth = slideContainer.current.parentNode.getBoundingClientRect().width ////부모너비
                const boxWidth = slideContainer.current.offsetWidth  ///박스의 너비
        
                // console.log(parentBoxWidth)
                const subtracWidthValue = boxWidth - distance - left ///////남아있는 container의 width값
                if(subtracWidthValue <parentBoxWidth){
                    setSlidePos(prevSlidePos => prevSlidePos - distance)
                    setLeft(prevLeft => prevLeft + distance)
                    // 버튼 비활성화 
                    setRbtnState(true)
        
                    setLbtnState(false)
        
        
                }else{
                    if(LbtnState){
                        setLbtnState(false)
                    }
                    setSlidePos(prevSlidePos => prevSlidePos - distance)
                    setLeft(prevLeft => prevLeft + distance)
                }
            }
            
            ///왼쪽버튼
            function moveLslide(distance){
                // const parentBoxWidth = slideContainer.current.parentNode.getBoundingClientRect().width //부모너비
        
                const subtractWidth = left - distance
        
                if(subtractWidth === 0){
                    setSlidePos(prevSlidePos => prevSlidePos + distance)
                    // 버튼 비활성화 
                    setLbtnState(true)
                    setLeft(prevLeft => prevLeft -distance)
                    if(RbtnState){
                        setRbtnState(false)
                    }
        
                }else{
                    if(RbtnState){
                        setRbtnState(false)
                    }
                    setSlidePos(prevSlidePos => prevSlidePos + distance)
                    setLeft(prevLeft => prevLeft - distance)
                }
            }
        
            ///ref
            const slideContainer = useRef()

    return(
        <div className="lv3-description-container">
            <div className="lv3-description-title">{title}</div>
            <div className="lv3-description-content">
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
                
            </div>
            {/* left */}
            <Lslide_btn  direction={true} btnState={LbtnState} moveSlide = {moveLslide} distance={1200} left={left} px={0} top={210}></Lslide_btn>
            {/* right */}
           <Rslide_btn  direction={false} btnState={RbtnState} moveSlide = {moveRSlide} distance={1200} left={left} px={0} top={210}></Rslide_btn>  
        </div>
    )
}

export default Lv3_description