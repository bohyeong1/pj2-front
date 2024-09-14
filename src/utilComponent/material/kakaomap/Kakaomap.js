import './Kakaomap.scss'
import { useState } from 'react';
import useMaterialKakaomapBusiness from "../hook-store/business-hooks/material-kakaomap-business";
import { state_store } from '../../../utilData/UtilFunction';

function Kakaomap({adress_data, set_main_adress, set_sub_coordinate, event, scroll,
                   city = false, data}){
    // adress_data, set_main_adress, set_sub_coordinate, event, scroll  ===> regist, detail 페이지에서 쓰는 props
    // city, data  ===> subapp 페이지에서 쓰는 props

    // console.log('렌더회수 체크')

    // =================================================
    // hooks //
    // business
    const {close_overlay} = useMaterialKakaomapBusiness(undefined, undefined, undefined, 
        {
            'adress_data' : adress_data,
            'set_main_adress' : set_main_adress,
            'set_sub_coordinate' : set_sub_coordinate,
            'event' : event,
            'scroll' : scroll,
            'city' : city,
            'data' : data
        }
    )  

    return(
        <div className="kakaomap-container" onClick={close_overlay}></div>
    )
}

export default Kakaomap