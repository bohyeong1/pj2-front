import React, {useState, useEffect, useRef} from "react";
import './lv5-description.css'
import Rslide_btn from "../../../Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "../../../Button/slideBtn/Lslide-btn/Lslide_btn";
import default_data from "../../../utilData/defaultData";
import { pop_three_texts } from "../../../utilData/UtilFunction";
import Pastel_img from "../../../picture/pastel-img/pastel-img";
import { NavLink } from "react-router-dom";
import connectData from "../../../utilData/UtilFunction";
import MainBtn from "../../../Button/mainBtn/MainBtn";


function Lv5_description({title}){
    ///state
    const [RbtnState, setRbtnState] = useState(false)
    const [slidePos, setSlidePos] = useState(0)
    const [LbtnState, setLbtnState] = useState(false)
    const [left, setLeft] = useState(0)
    const [dataStore, setDataStore] = useState(null)
    ///ref
    const slideContainer = useRef()

    useEffect(()=>{
        async function select_data(){
            let data
            try{
                data = await connectData('http://127.0.0.1:3700/api/common','POST',{
                    filter:'all',
                    counts:12
                })
            }catch(e){
                console.log(e)
            }finally{
                setDataStore(data.accomodations)
            }

        }
        select_data()        
    },[dataStore])


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
        <div className="lv5-description-container">
            <div className="lv5-description-title-container">
                <p className="lv5-description-title">{title}</p>
                <div className="lv5-description-selection">                  
                    <MainBtn keyword={'d_category_icon'} keyValue={'category'} total={true}></MainBtn>
                </div>
            </div>
            <div className="lv5-description-wrapper">
                <div className="lv5-content-gurabox">
                    {/* left */}
                    <Lslide_btn  direction={true} btnState={LbtnState} moveSlide = {moveLslide} distance={1226.6} left={left}></Lslide_btn>
                    {/* right */}
                    <Rslide_btn  direction={false} btnState={RbtnState} moveSlide = {moveRSlide} distance={1226.6}></Rslide_btn>
                </div>

                <div className="lv5-description-content">
                    <div className="lv5-content-container" ref={slideContainer} style={{left: slidePos + 'px'}}>
                        {dataStore ? dataStore.map((ele,id)=>{  
                            let price
                            if(String(ele.price).length > 3){
                                price = pop_three_texts(ele.price)
                            }else{
                                price = ele.price
                            } 
                            return(
                            <NavLink to={`SubApp/Detail_infoApp/${ele._id}`} key={id} className="lv5-img-wrapper">
                                <div className="lv5-img-container">
                                    <Pastel_img url={ele.main_img}></Pastel_img>
                                </div>
                                <div className="lv5-img-text">
                                    <div className="lv5-img-tex1">{ele.category.name}</div>
                                    <div className="lv5-img-tex2">{ele.title}</div>
                                    <div className="lv5-img-tex3">{ele.search_adress}</div>
                                    <div className="lv5-img-tex4"><img style={{width:'20px', height:'20px'}} src={default_data.d_imgs.star}></img>
                                    {`${ele.avgEvaluation.length != 0 ? (ele.avgEvaluation.reduce((prev, cur) => {return prev + cur},0)/ele.avgEvaluation.length).toFixed(2) : 
                                    '미평가'}`}</div>
                                    <div className="lv5-img-tex5">
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
        </div>
    )
}

export default Lv5_description