import React, {useRef, useState} from "react";
import { NavLink } from "react-router-dom";
import './Lv2-description.css'
import Midium_main from "../../../picture/midium-main/Midium-main";
import Rslide_btn from "../../../Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "../../../Button/slideBtn/Lslide-btn/Lslide_btn";



function Lv2_description({title, data}){
    
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
        <div className="lv2-description-container">
                <div className="lv2-description-title">{title}</div>
                <div className="lv2-description-content">
                    <div className="lv2-content-container" ref={slideContainer} style={{left: slidePos + 'px'}}>
                        {data ? data.map((ele,id)=>{  
                                            
                            return(
                            <NavLink to={`SubApp/Detail_infoApp/${ele._id}`} key={id} className="lv2-img-wrapper">
                                <div className="lv2-img-container">
                                    <Midium_main data={ele}></Midium_main>
                                </div>
                                <div className="lv2-img-text">
                                    <div className="lv2-img-tex1">{ele.category.name}</div>
                                    <div className="lv2-img-tex2">{ele.title}</div>
                                    <div className="lv2-img-tex3">{ele.search_adress}</div>
                                    <div className="lv2-img-tex4">{`${'평점'}`}</div>
                                    <div className="lv2-img-tex5">{`${ele.price}원`}</div>
                                </div>
                            </NavLink>
                            )                  
                                            
                        }) : null}
                    </div>                                                          
                </div>

                {/* left */}
                <Lslide_btn  direction={true} btnState={LbtnState} moveSlide = {moveLslide} distance={1200} left={left} px={0}></Lslide_btn>
                {/* right */}
                <Rslide_btn  direction={false} btnState={RbtnState} moveSlide = {moveRSlide} distance={1200} left={left} px={0}></Rslide_btn>
        </div>
    )
}

export default Lv2_description