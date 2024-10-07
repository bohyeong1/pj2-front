import React, {useRef, useState} from "react";
import './PriceBtn.css'
import { useSearchParams } from "react-router-dom";
import { state_store, reference_store } from "../../../utilData/UtilFunction";
import useButtonPricebtnBusiness from "../hook-store/business-hooks/button-pricebtn-business";
import { pop_three_texts } from "../../../utilData/UtilFunction";
import '../../../manage_scss_style/commonness/commonness.scss'

function PriceBtn({keyValue1, keyValue2, modal}){
    // querystring
    const [SearchParams] = useSearchParams()

    // ref
    const price_target = useRef(null)
    const price_track = useRef(null)
    const price_thumb = useRef([])
    const button_target = useRef(null)
    
    // 인덱스 range
    const index_range = [0, 1, 2, 3, 4, 5, 6, 7]

    // max 인덱스
    const max_index = 7

    // 가격 range
    const value_collections = [0, 30000, 50000, 100000, 200000, 300000, 400000, 500000]

    // 새로고침 시 대응하기 위한 인덱스 추출
    const min_index = value_collections.indexOf(parseInt(SearchParams.get('price-min').split('%')[0]))
    const over_index = value_collections.indexOf(parseInt(SearchParams.get('price-over').split('%')[0]))

    // state
    const [index_min_state, setIndex_min_state] = useState(min_index)    
    const [index_max_state, setIndex_max_state] = useState(over_index)

    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // business
    const {mouse_down, mouse_click} = useButtonPricebtnBusiness(
        {
            'index_range':index_range,
            'max_index':max_index,
            'value_collections':value_collections
        },
    state_store([
        {
            'index_min_state':index_min_state,
            'setIndex_min_state':setIndex_min_state
        },
        {
            'index_max_state':index_max_state,
            'setIndex_max_state':setIndex_max_state
        }
    ]),
    reference_store([
        {
            'price_track':price_track,
        },
        {
            'price_thumb':price_thumb
        },
        {
            'price_target':price_target
        },
        {
            'button_target':button_target
        }
    ]),
        {
            'keyValue1':keyValue1,
            'keyValue2':keyValue2
        })

    return(
        <div className="pricebtn-wrapper">
            <div className="pricebtn-container not-user-sellect" 
                    data-drag={false} 
                    data-min_index={0} 
                    data-max_index={7} 
                    ref={price_target}
                    onMouseDown={mouse_down} 
                    onClick={mouse_click}>
                <div className="pricebtn-track" 
                        ref={price_track}></div> 
                <div className="pricebtn-thumb pricebtn-min" 
                        ref={(el)=>{price_thumb.current[0] = el}}></div>      
                <div className="pricebtn-thumb pricebtn-max" 
                        ref={(el)=>{price_thumb.current[1] = el}}></div> 
            </div>
            <div className={`pricebtn__text ${index_min_state !== 0 || index_max_state !== 7 ? 'priece-text__active' : ''}`}>
                {`${value_collections[index_min_state]}원 이상 ~ ${pop_three_texts(value_collections[index_max_state])}원 ${index_max_state < 7 ? '이하' : '이상'}`}
            </div>
        </div>
    )
}

export default PriceBtn