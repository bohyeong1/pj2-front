import React from "react";
import './Terms_library.css'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Pri_side_menu from "../../../utilComponent/menu/pri-side-menu/Pri-side-menu";
import Footer from "../../../utilComponent/menu/footer/Footer";
import default_data from "../../../utilData/defaultData";

function Terms_library(){
    return(
        <div className="Terms_library-container">
            <Main_menu></Main_menu>
        
        
            <div className="Terms_library-content">
                <Pri_side_menu data={default_data.terms_sidemenu}></Pri_side_menu>
        
                <div className="Terms_library-con-main">
                    <div className="Terms_library-con-main-title">사용 라이브러리</div>
        
                    <div className="Terms_library-con-main-sec1">
                        <div className="Terms_library-con-a-s1-b1">
                            <span>프론트엔드</span>
                            <div className="Terms_library-t1">
                                <span>aws-sdk</span>
                                <span>date-fns</span>
                                <span>react-daum-postcode</span>
                                <span>react-icons</span>
                                <span>react-js-pagination</span>
                                <span>react-kakao-maps-sdk</span>
                            </div>
                        </div>
                        <div className="Terms_library-con-a-s1-b1">
                            <span>백엔드</span>
                            <div className="Terms_library-t1">
                                <span>axios</span>
                                <span>cor</span>
                                <span>dotenv</span>
                                <span>react-icons</span>
                                <span>express-async-handler</span>
                                <span>jsonwebtoken</span>
                                <span>express-validator</span>
                                <span>express</span>
                                <span>cors</span>
                                <span>mongoose</span>
                                <span>morgan</span>
                                <span>multer</span>
                                <span>multer</span>
                                <span>nodemon</span>
                                <span>uuid</span>
                                <span>aws-sdk</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        
            <div className="Terms_library-footer">
                <Footer></Footer>
            </div>
         </div>
    )

}

export default Terms_library