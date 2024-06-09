import React, {useRef, useState} from "react";
import { useSearchParams } from "react-router-dom";
import './PriceBtn.css'

function PriceBtn({keyValue}){
    const price_text = useRef()
    const [SearchParams, setSearchParams] = useSearchParams()
    
    function moveRangebar(e){
        let gradient_value = 100 / e.target.attributes.max.value;
        e.target.style.background = 'linear-gradient(to right, black 0%, black '+gradient_value * e.target.value +'%, rgb(236, 236, 236) ' +gradient_value *  e.target.value + '%, rgb(236, 236, 236) 100%)';

        if(e.target.value ==='200000'){
            price_text.current.innerText = Number(e.target.value) + '원 이상' 
        }else{
            price_text.current.innerText = Number(e.target.value) + 30000 + '원 미만' 
        }       
    }

    function upRange(e){
        console.log(e.target.value)
        if(e.target.value === '200000'){
            SearchParams.set(keyValue, e.target.value +'%over')
            setSearchParams(SearchParams)
        }else{
            SearchParams.set(keyValue,Number(e.target.value)+30000)
            setSearchParams(SearchParams)
        }
    }


    return(
        <div className="PriceBtn-container">
            <div className="PriceBtn-box">
                <div className="PriceBtn-benchmark"></div>
                <div className="PriceBtn-bar-box">
                    <input type='range' min={20000} max={200000} step={30000} className="PriceBtn-bar" onInput={moveRangebar} onMouseUp={upRange}></input>
                </div>

                {/* <div className="PriceBtn-movemark" ref={price_text}></div> */}
            </div>
            
            <div className="PriceBtn-text" ref={price_text}></div>


        </div>
    )
}

export default PriceBtn