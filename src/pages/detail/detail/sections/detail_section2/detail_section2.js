import React from "react";
import './detail_section2.scss'
import Kakaomap from "@/utilComponent/material/kakaomap/Kakaomap";

function DetailSection2({data, role}){

    if(data){
        return(
            <div className="detail-section2__container">
                <div className="detail-section2__container-section1">
                    <div className="detail-section2__container-section1-title">
                        <span>숙소 위치</span>
                    </div>
                    <div className="detail-section2__container-section1-sub-title">
                        {data?.main_adress.name}
                    </div>
                    <span>현재 위치는 도로명 주소 기반으로 정확한 위치 정보를 제공하지 않습니다. 예약 완료 후 세부주소와 위치가 공개됩니다.</span>
                </div>
                <div className="detail-section2__container-section2">
                    <Kakaomap event={false} 
                              adress_data={data?.main_adress.name} 
                              type = {'default'}
                              scroll={false}/>
                </div>
                {/* 주변 경치 summary 들어갈 곳 */}
                <div></div>
            </div>
        )
    }

}

export default DetailSection2