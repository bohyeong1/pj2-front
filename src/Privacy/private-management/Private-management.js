import React from "react";
import './Private-management.css'
import Main_menu from "../../menu/main-menu/main-menu";
import Pri_side_menu from "../../menu/pri-side-menu/Pri-side-menu";
import Footer from "../../menu/footer/Footer";

function Private_management(){
    return(
        <div className="Private_management-container">
            <Main_menu></Main_menu>
            <div className="Private_management-content">
                <Pri_side_menu></Pri_side_menu>
                <div className="pri-man-con-main">
                    <div className="pri-man-con-main-title">내 정보 관리</div>
                    <div className="pri-man-con-main-sec1">
                        <div className="pri-man-con-main-sec1-s1">회원 정보</div>
                        <div className="pri-man-con-main-sec1-s1">수정할 정보를 입력해 주세요</div>
                    </div>
                    <div className="pri-man-con-main-sec2">인풋태그 컴포넌트로 빼기</div>
                    <div className="pri-man-con-main-sec3">회원탈퇴</div>
                </div>
            </div>
            <div className="Private_management-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Private_management