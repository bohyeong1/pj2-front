import React from "react";
import './Detail_infoApp.css'
import { Link, useParams } from "react-router-dom";
import Main_menu from "../../../menu/main-menu/main-menu";
import Detail_many from "../../../picture/detail-many/Detail-many";
import Detail from "../../../picture/detail/Detail";
import Footer from "../../../menu/footer/Footer";
import Det_sec1 from "../det-sec1/Det-sec1";
import Sec1_payment from "../det-sec1/sec1-payment/Sec1-payment";

const user = {                         //////////////호스트 정보
    name:'서보형',
    carrer:3
}



function Detail_infoApp({data}){
    let params = useParams()
    const filteredData = data.filter((ele)=>{
        const houseParam = params.house
        return ele._id === houseParam
    })
    const finalData = filteredData[0]

    console.log(finalData)
    return(
        <div className="Detail_infoApp-container">
            <Main_menu></Main_menu>
            <div className="Detail_infoApp-img">
                <div className="info-imgBox1">
                    <Detail data={finalData}></Detail>
                </div>
                <div className="info-imgBox2">
                    <Detail_many data={finalData}></Detail_many>
                </div>
            </div>
            <div className="Detail_infoApp-sec1">
                <div className="det-info-con1">
                    <Det_sec1 data={finalData} user={user}></Det_sec1>
                </div>
                <div className="det-info-con2">
                    <Sec1_payment data={finalData}></Sec1_payment>
                </div>
            </div>
            <div className="Detail_infoApp-sec2">섹션 2 / 숙소 평가</div>
            <div className="Detail_infoApp-sec3">섹션 3 / 사용자 댓글</div>
            <div className="Detail_infoApp-sec4">섹션 4 / 숙소 위치/ 지도 api</div>
            <div className="Detail_infoApp-sec5">섹션 5 / 호스트 정보</div>
            <div className="Detail_infoApp-sec6">섹션 6 / 숙소 이용규칙/ 환불정책</div>

            <div className="Detail_infoApp-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Detail_infoApp 