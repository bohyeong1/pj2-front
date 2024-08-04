import React from "react";
import './Private-wish.css'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Pri_side_menu from "../../../utilComponent/menu/pri-side-menu/Pri-side-menu";
import Footer from "../../../utilComponent/menu/footer/Footer";
import default_data from "../../../utilData/defaultData";

function Private_wish(){
    return(
        <div className="Private_wish-container">
            <Main_menu></Main_menu>

            <div className="Private_wish-content">
                <Pri_side_menu data={default_data.pri_sidemenu}></Pri_side_menu>

                <div className="Private_wish-con-main">
                    <div className="Private_wish-con-main-title">위시리스트</div>

                    <div className="Private_wish-con-main-sec1">
                    <div className="Private_wish-con-a-s1-b1">찜하기 기능 개발 준비중입니다.</div>

                    </div>
                </div>
            </div>

            <div className="Private_wish-footer">
                <Footer></Footer>
            </div>

        </div>
    )

}

export default Private_wish