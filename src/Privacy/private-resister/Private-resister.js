import React from "react";
import './Private-resister.css'
import Main_menu from "../../menu/main-menu/main-menu";
import Pri_side_menu from "../../menu/pri-side-menu/Pri-side-menu";
import Footer from "../../menu/footer/Footer";

function Private_resister(){
    return(
        <div className="Private_resister-container">
            <Main_menu></Main_menu>
            <div className="Private_resister-content">
                <Pri_side_menu></Pri_side_menu>
                <div className="pri-res-con-main">
                    <div className="pri-res-con-main-title">숙소등록</div>
                    <div className="pri-res-con-main-sec1">숙소등록 input 컴포넌트 뺄지 안뺄지 추후 결정</div>
                </div>
            </div>
            <div className="Private_resister-footer">
                <Footer></Footer>
            </div>
        </div>
    )

}

export default Private_resister