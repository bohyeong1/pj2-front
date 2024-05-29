import React from "react";
import './Private-message.css'
import Main_menu from "../../menu/main-menu/main-menu";
import Pri_side_menu from "../../menu/pri-side-menu/Pri-side-menu";
import Footer from "../../menu/footer/Footer";

function Private_message(){
    return(
        <div className="Private_message-container">
            <Main_menu></Main_menu>
            <div className="Private_message-content">
                <Pri_side_menu></Pri_side_menu>
                <div className="pri-mes-con-main">
                    <div className="pri-mes-con-main-title">메시지</div>
                    <div className="pri-mes-con-main-sec1">
                        <div className="pri-mes-con-main-sec1-s1">전체 메세지</div>
                        <div className="pri-mes-con-main-sec1-s2">세부 내용</div>
                    </div>
                </div>
            </div>
            <div className="Private_message-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Private_message