import React, {useRef, useState, useEffect} from "react";
import './Lv1-description.css'
import { NavLink } from "react-router-dom";
import Small_main from "../../../picture/small-main/Small-main";
import Rslide_btn from "../../../Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "../../../Button/slideBtn/Lslide-btn/Lslide_btn";



function Lv1_description({title, data}){

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
    const slideWrapper = useRef()



    // 부모 컨테이너 너비 = 미는 양
    // const parentBoxWidth = slideContainer.current.parentNode.getBoundingClientRect().width

    //해당 div의 전체 width값
    // const boxWidth = slideContainer.current.offsetWidth

    //미는 방향 ->문자열로 넘김

    //스크롤 left값 = 버튼의 활성화 비활성화 state요소
    // const boxScrollLeft = slideContainer.current.scrollLeft

    ///미는 박스의 ref
    // const box = slideContainer.current

 
    console.log(left)

 

    return(
        <div className="lv1-description-container">
            <div className="lv1-description-title">{title}</div>
            <div className="lv1-description-content" ref={slideWrapper} onClick={(el)=>{console.log(el.target.scrollLeft)}}>
                <div className="lv1-content-container" ref={slideContainer} style={{left: slidePos + 'px'}}>
                    {data ? data.map((ele,id)=>{                                              
                        return(
                        <NavLink to={`SubApp/${ele.cityName}`} key={id} className="lv1-img-wrapper">
                            <div className="lv1-img-container">
                                <Small_main data={ele}></Small_main>
                            </div>
                            <div className="lv1-img-title">
                                {ele.cityName}
                            </div>
                        </NavLink>
                        )                  
                        
                    }) : null}
                </div>                            
                
            </div>

                {/* left */}
                <Lslide_btn  direction={true} btnState={LbtnState} moveSlide = {moveLslide} distance={1200} left={left}></Lslide_btn>
                {/* right */}
                <Rslide_btn  direction={false} btnState={RbtnState} moveSlide = {moveRSlide} distance={1200} left={left}></Rslide_btn>
        </div>
    )
}

export default Lv1_description