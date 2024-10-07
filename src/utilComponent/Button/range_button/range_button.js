import './range_button.scss'
import useButtonRangeBusiness from '../hook-store/business-hooks/button_range_business'
import React, {useRef, useState} from "react";
import { state_store, reference_store } from '@/util/function/util_function'
import '@/manage_scss_style/commonness/commonness.scss'
import { pop_three_texts } from '@/util/function/util_function'

function RangeButton({price, discount_date, rate, set_rate}){

    // =================================================
    // const //
    const index_range = [...Array(51).keys()]
    const max_index = index_range[index_range.length - 1]

    // =================================================
    // ref //
    const range_target = useRef(null)
    const range_track = useRef(null)
    const range_thumb = useRef(null)
    const button_target = useRef(null)
    const range_percent = useRef(null)
    
    // =================================================
    // states //
    const [index_state, setIndex_state] = useState(rate ? rate : 0)    

    // =================================================
    // hooks //
    // business
    const {mouse_down} = useButtonRangeBusiness({
            'index_range' : index_range,
            'max_index' : max_index
        },
    state_store([
        {
            'index_state' : index_state,
            'setIndex_state' : setIndex_state
        }
    ]),
    reference_store([
        {
            'range_track':range_track,
        },
        {
            'range_thumb':range_thumb
        },
        {
            'range_target':range_target
        },
        {
            'button_target':button_target
        },
        {
            'range_percent' : range_percent
        }
    ]),
        {
            'set_rate' : set_rate
        })

    return(
        <div className="range-button-wrapper">
            <div className="range-button-container not-user-sellect" 
                 data-drag={false} 
                 data-target={null} 
                 data-index={0} 
                 ref={range_target}
                 onMouseDown={mouse_down} 
                //  onClick={mouse_click}
                >
                <div className="range-button-track" 
                     ref={range_track}>
                </div> 
                <div className="range-button-thumb range-button" 
                     ref={range_thumb}>
                </div>      
            </div>
            <div className='range-percent'>
                <span ref={range_percent}>
                    {`${index_state}%`}
                </span>
            </div>
            <div className={`range-button__text`}>
                <span>
                    {price && discount_date && discount_date.date !== -1 ? `${discount_date.date}박 숙박 평균 요금` : null}
                    {price && discount_date && discount_date.date === -1 ? `1박 숙박 평균 요금` : null}
                </span>
                <span>
                    {price && discount_date && discount_date.date !== -1 ? `${pop_three_texts(Math.floor(price * discount_date.date * (100 - index_state) / 100))}원` : null}
                    {price && discount_date && discount_date.date === -1 ? `${pop_three_texts(Math.floor(price * (100 - index_state) / 100))}원` : null}
                </span>                
            </div>
        </div>
    )
}
export default RangeButton