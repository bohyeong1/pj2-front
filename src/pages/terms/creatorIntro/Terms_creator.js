import React from "react";
import './Terms_creator.css'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Pri_side_menu from "../../../utilComponent/menu/pri-side-menu/Pri-side-menu";
import Footer from "../../../utilComponent/menu/footer/Footer";
import default_data from "../../../utilData/defaultData";

function Terms_creator(){
    return(
        <div className="Terms_creator-container">
            <Main_menu></Main_menu>
        
        
            <div className="Terms_creator-content">
                <Pri_side_menu data={default_data.terms_sidemenu}></Pri_side_menu>
        
                <div className="Terms_creator-con-main">
                    <div className="Terms_creator-con-main-title">제작자 소개</div>
        
                    <div className="Terms_creator-con-main-sec1">
                        <div className="Terms_creator-con-a-s1-b1">
                            <img  className="Terms_creator-img"  src={default_data.d_imgs.myprofile}></img>
                            <div className="Terms_creator-c-a-s1-b1-d1">
                                <div>
                                    <span>이름</span>
                                    <span>서보형</span>
                                </div>
                                <div>
                                    <span>나이</span>
                                    <span>1993.5.2</span>
                                </div>
                                <div>
                                    <span>소속</span>
                                    <span>대전 그린컴퓨터학원</span>
                                </div>
                                <div>
                                    <span>수료 과목</span>
                                    <span>프론트엔드 - 리액트반</span>
                                </div>
                                <div>
                                    <span>강사</span>
                                    <span>이성용</span>
                                </div>
                                <div>
                                    <span>상담사</span>
                                    <span>류아름</span>
                                </div>
                            </div>
                        </div>
                        <div className="Terms_creator-con-a-s1-b2">
                            <span>지나친 인신공격을 제외한 건설적인 <br></br> 피드백 및 험악한 <span>(욕설 가능)</span> 피드백 또한 환영합니다
                            <br></br><span style={{color:'#1273e4', textDecoration:'none'}}>tjqhgud9104@naver.com</span></span>
                        </div>
                    </div>
                </div>
            </div>
        
        
        
        
            <div className="Terms_creator-footer">
                <Footer></Footer>
            </div>
         </div>
    )

}

export default Terms_creator