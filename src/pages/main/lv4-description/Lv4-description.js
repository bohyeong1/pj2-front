import React, {useRef, useState}from "react";
import { NavLink } from "react-router-dom";
import './Lv4-description.css'
import Rslide_btn from "../../../Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "../../../Button/slideBtn/Lslide-btn/Lslide_btn";
import default_data from "../../../utilData/defaultData";
import { pop_three_texts } from "../../../utilData/UtilFunction";
import Pastel_img from "../../../picture/pastel-img/pastel-img";

function Lv4_description({title, data, imgurl}){
    
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
        <div className="Lv4-description-container">
            <img className="lv4-des-con-backImg" src={`${imgurl ? imgurl : null}`} style={{display:`${imgurl ? 'block' : 'none'}`}}></img>
            <div className="lv4-des-con-wrapper">
                <div className="Lv4-description-title">{`자연과 하나 되는 ${title}`}</div>
                <div className="Lv4-description-content">
                    <div className="lv4-content-container"  ref={slideContainer} style={{left: slidePos + 'px'}}>
                        {data ? data.map((ele,id)=>{  
                            let price
                            if(String(ele.price).length > 3){
                                price = pop_three_texts(ele.price)
                            }else{
                                price = ele.price
                            } 

                            return(
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
                            )                  
                                            
                        }) : null}
                    </div>                                                          
                </div>
                </div>

                {/* left */}
                <Lslide_btn  direction={true} btnState={LbtnState} moveSlide = {moveLslide} distance={1182} left={left} px={35} top={255}></Lslide_btn>
                {/* right */}
                <Rslide_btn  direction={false} btnState={RbtnState} moveSlide = {moveRSlide} distance={1182} left={left} px={35} top={255}></Rslide_btn>

        </div>
    )
}

export default Lv4_description