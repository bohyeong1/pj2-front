import React from "react";
import './Private-point.css'
import Main_menu from "../../menu/main-menu/main-menu";
import Pri_side_menu from "../../menu/pri-side-menu/Pri-side-menu";
import Footer from "../../menu/footer/Footer";

function Private_point(){
    return(
        <div className="Private_point-container">
            <Main_menu></Main_menu>
            <div className="Private_point-content">
                <Pri_side_menu></Pri_side_menu>
                <div className="pri-po-con-main">
                    <div className="pri-po-con-main-title">포인트</div>
                    <div className="pri-po-con-main-sec1">포인트 데이터 출력</div>
                    <div className="pri-po-con-main-sec2">월별/주별 포인트 데이터 그래프 출력</div>
                </div>
            </div>
            <div className="Private_point-footer">
                <Footer></Footer>
            </div>
       </div>
    )

}

export default Private_point