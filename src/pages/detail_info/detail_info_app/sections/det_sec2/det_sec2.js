import React from "react";
import './det_sec2.scss'
import Kakaomap from "../../../../../utilComponent/material/kakaomap/Kakaomap";

function Det_sec2({data}){
    return(
        <div className="Det_sec2-container">
            <div className="Det_sec2-con-sec1">
                <div className="Det_sec2-con-s1-title">숙소 위치</div>
                <div className="Det_sec2-con-s1-subtitle">{data?.search_adress}</div>
            </div>
            <div className="Det_sec2-con-sec2">
                <Kakaomap event={false} adressData={data?.main_adress.name} scroll={false}></Kakaomap>
            </div>
        </div>
    )
}

export default Det_sec2