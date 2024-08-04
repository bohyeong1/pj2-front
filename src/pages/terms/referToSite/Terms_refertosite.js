import React from "react";
import './Terms_refertosite.css'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Pri_side_menu from "../../../utilComponent/menu/pri-side-menu/Pri-side-menu";
import Footer from "../../../utilComponent/menu/footer/Footer";
import default_data from "../../../utilData/defaultData";

function Terms_refertosite(){
    return(
        <div className="Terms_refertosite-container">
            <Main_menu></Main_menu>
        
        
            <div className="Terms_refertosite-content">
                <Pri_side_menu data={default_data.terms_sidemenu}></Pri_side_menu>
        
                <div className="Terms_refertosite-con-main">
                    <div className="Terms_refertosite-con-main-title">참고사이트</div>
        
                    <div className="Terms_refertosite-con-main-sec1">
                        <div className="Terms_refertosite-con-a-s1-b1">
                            <span>에어비엔비</span>
                            <div>
                                <img src={default_data.d_imgs.airbnb}></img>
                                <span></span>
                            </div>
                        </div>
                        <div className="Terms_refertosite-con-a-s1-b1">
                            <span>여기어때</span>
                            <div>
                                <img src={default_data.d_imgs.yogi}></img>
                                <span></span>
                            </div>
                        </div>
                        <div className="Terms_refertosite-con-a-s1-b1">
                            <span>호텔스닷컴</span>
                            <div>
                                <img src={default_data.d_imgs.hotelsdotcom}></img>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        
        
        
            <div className="Terms_refertosite-footer">
                <Footer></Footer>
            </div>
         </div>
    )

}

export default Terms_refertosite