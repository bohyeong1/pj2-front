import React, {useState, useRef} from "react";
import './ImgdisModal.css'
import default_data from "../../../utilData/defaultData";
import Lslide_btn from "../../Button/slideBtn/Lslide-btn/Lslide_btn";
import Rslide_btn from "../../Button/slideBtn/Rslide-btn/Rslide_btn";

function ImgdisModal({data, img_modal_state,img_modal}){
    
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
                if(subtracWidthValue  === parentBoxWidth){
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
    <div className="ImgdisModal" style={{display:`${img_modal ? 'block':'none'}`}}>
        <div className="ImgdisModal-wrapper"></div>
        <div className="ImgdisModal-container">
            <div className="ImgdisModal-con-sec1">
                <div className="ImgdisModal-con-s1-b1">
                    <img src={default_data.d_imgs.close} style={{cursor:'pointer'}} onClick={()=>{img_modal_state()}}></img>
                </div>

                <div className="ImgdisModal-con-s1-b2">{data?.title}</div>
                <div style={{width:'40px'}}></div>
            </div>
            <div className="ImgdisModal-con-sec2">
                <div className="ImgdisModal-con-sec2-wrapper">
                    <div className="ImgdisModal-con-s2-slider"  ref={slideContainer} style={{left: slidePos + 'px'}}>
                        <img className="ImgdisModal-img" src={data?.main_img}></img>
                        {data?.sub_img.map((el, id)=>{
                            return(
                                <img key={id} className="ImgdisModal-img" src={el}></img>
                            )
                        })}
                    </div>
                </div>
                {/* left */}
                <Lslide_btn  direction={true} btnState={LbtnState} moveSlide = {moveLslide} distance={800} left={left} px={0} top={260}></Lslide_btn>
                {/* right */}
                <Rslide_btn  direction={false} btnState={RbtnState} moveSlide = {moveRSlide} distance={800} left={left} px={0} top={260}></Rslide_btn>

            </div>

        </div>  
    </div>

    )

}

export default ImgdisModal