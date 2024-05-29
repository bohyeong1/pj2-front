import React from "react";
import './Private-history.css'
import Pri_side_menu from "../../../menu/pri-side-menu/Pri-side-menu";
import Main_menu from "../../../menu/main-menu/main-menu";
import Footer from "../../../menu/footer/Footer";

function Private_history(){
    return(
        <div className="Private_history-container">
            <Main_menu></Main_menu>
            <div className="Private_history-content">
                <Pri_side_menu></Pri_side_menu>
                <div className="pri-his-con-main">
                    <div className="pri-his-con-main-title">예약내역</div>
                    <div className="pri-his-con-main-sec1">예약 리스트</div>
                    <div className="pri-his-con-main-sec2">
                        <div className="pri-his-con-main-sec2-title">이용완료</div>
                        <div className="pri-his-con-main-sec2-title">이용완료 리스트</div>
                    </div>
                </div>
            </div>
            <div className="Private_history-footer">
                <Footer></Footer>
            </div>
        </div>
    )

}

export default Private_history