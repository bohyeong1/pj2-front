import React from "react";
import './Terms_develope.css'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Pri_side_menu from "../../../utilComponent/menu/pri-side-menu/Pri-side-menu";
import Footer from "../../../utilComponent/menu/footer/Footer";
import default_data from "../../../utilData/defaultData";

function Terms_develope(){
    return(
        <div className="Terms_develope-container">
            <Main_menu></Main_menu>
        
        
            <div className="Terms_develope-content">
                <Pri_side_menu data={default_data.terms_sidemenu}></Pri_side_menu>
        
                <div className="Terms_develope-con-main">
                    <div className="Terms_develope-con-main-title">홈페이지 개발현황</div>
        
                    <div className="Terms_develope-con-main-sec1">
                        <div className="Terms_develope-con-a-s1-b1">내 포인트</div>
                        <div className="Terms_develope-con-a-s1-b2">~~~원</div>
                    </div>
                </div>
            </div>
        
        
        
        
            <div className="Terms_develope-footer">
                <Footer></Footer>
            </div>
         </div>
    )

}

export default Terms_develope