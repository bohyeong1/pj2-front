import React, {useRef, useState} from "react";
import { NavLink } from "react-router-dom";
import './Lv2-description.css'
import Rslide_btn from "../../../Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "../../../Button/slideBtn/Lslide-btn/Lslide_btn";
import default_data from "../../../utilData/defaultData";
import { pop_three_texts } from "../../../utilData/UtilFunction";
import Pastel_img from "../../../picture/pastel-img/pastel-img";

function Lv2_description({title, data}){
    
    ///state
    const [RbtnState, setRbtnState] = useState(false)
    const [slidePos, setSlidePos] = useState(0)
    const [LbtnState, setLbtnState] = useState(false)
    const [left, setLeft] = useState(0)

    ///ref
    const slideContainer = useRef()

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
    

    return(
        <div className="lv2-description-container">
                <div className="lv2-description-title">{title}</div>
                <div className="lv2-description-content">
                    <div className="lv2-content-container" ref={slideContainer} style={{left: slidePos + 'px'}}>
                        {data ? data.map((ele,id)=>{  
                            let price
                            if(String(ele.price).length > 3){
                                price = pop_three_texts(ele.price)
                            }else{
                                price = ele.price
                            } 


                            return(
                            <NavLink to={`SubApp/Detail_infoApp/${ele._id}`} key={id} className="lv2-img-wrapper">
                                <div className="lv2-img-container">
                                    <Pastel_img url={ele.main_img}></Pastel_img>
                                </div>
                                <div className="lv2-img-text">
                                    <div className="lv2-img-tex1">{ele.category.name}</div>
                                    <div className="lv2-img-tex2">{ele.title}</div>
                                    <div className="lv2-img-tex3">{ele.search_adress}</div>
                                    <div className="lv2-img-tex4"><img style={{width:'20px', height:'20px'}} src={default_data.d_imgs.star}></img>
                                    {`${ele.avgEvaluation.length != 0 ? (ele.avgEvaluation.reduce((prev, cur) => {return prev + cur},0)/ele.avgEvaluation.length).toFixed(2) : 
                                    '미평가'}`}</div>
                                    <div className="lv2-img-tex5">
                                        <span>{price}</span>
                                        <span>원</span>
                                    </div>
                                </div>
                            </NavLink>
                            )                  
                                            
                        }) : null}
                    </div>                                                          
                </div>

                {/* left */}
                <Lslide_btn  direction={true} btnState={LbtnState} moveSlide = {moveLslide} distance={1200} left={left} px={0} top={140}></Lslide_btn>
                {/* right */}
                <Rslide_btn  direction={false} btnState={RbtnState} moveSlide = {moveRSlide} distance={1200} left={left} px={0} top={140}></Rslide_btn>
        </div>
    )
}

export default Lv2_description