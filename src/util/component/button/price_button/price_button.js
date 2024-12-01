import React, {useRef, useState} from "react";
import './price_button.scss'
import { useSearchParams } from "react-router-dom";
import { state_store, reference_store, pop_three_texts } from "@/util/function/util_function";
import useButtonPricebtnBusiness from "../hook-store/business-hooks/button-pricebtn-business";
import '@/manage_scss_style/commonness/commonness.scss'

function PriceButton({key_value1, key_value2}){

    // =================================================
    // query string //
    const [SearchParams] = useSearchParams()

    // =================================================
    // refs //
    const price_target = useRef(null)
    const price_track = useRef(null)
    const price_thumb = useRef([])
    const button_target = useRef(null)
    
    // =================================================
    // const //
    const [index_range] = useState([0, 1, 2, 3, 4, 5, 6, 7])
    const [max_index] = useState(7)
    const [value_collections] = useState([0, 30000, 50000, 100000, 200000, 300000, 400000, 500000])
    const [min_index] = useState(value_collections.indexOf(parseInt(SearchParams.get(key_value1))))
    const [over_index] = useState(value_collections.indexOf(parseInt(SearchParams.get(key_value2))))

    // =================================================
    // states //
    const [index_min_state, setIndex_min_state] = useState(min_index)    
    const [index_max_state, setIndex_max_state] = useState(over_index)

    // =================================================
    // hooks //
    // business
    const {
        mouse_down, 
        mouse_click
    } = useButtonPricebtnBusiness(
        {
            index_range,
            max_index,
            value_collections
        },
        state_store([
            {index_min_state, setIndex_min_state},
            {index_max_state, setIndex_max_state}
        ]),
        reference_store([
            {price_track},
            {price_thumb},
            {price_target},
            {button_target}
        ]),
        {
            key_value1,
            key_value2
        })

    return(
        <div className="pricebtn-wrapper">
            <div 
                className="pricebtn-container not-user-sellect" 
                data-drag={false} 
                data-min_index={0} 
                data-max_index={7} 
                ref={price_target}
                onMouseDown={mouse_down} 
                onClick={mouse_click}>
                <div 
                    className="pricebtn-track" 
                    ref={price_track}>
                </div> 
                <div 
                    className="pricebtn-thumb pricebtn-min" 
                    ref={(el)=>{price_thumb.current[0] = el}}>
                </div>      
                <div 
                    className="pricebtn-thumb pricebtn-max" 
                    ref={(el)=>{price_thumb.current[1] = el}}>
                </div> 
            </div>
            <div className={`pricebtn__text ${index_min_state !== 0 || index_max_state !== 7 ? 'priece-text__active' : ''}`}>
                {`${value_collections[index_min_state]}원 이상 ~ ${pop_three_texts(value_collections[index_max_state])}원 ${index_max_state < 7 ? '이하' : '이상'}`}
            </div>
        </div>
    )
}

export default PriceButton