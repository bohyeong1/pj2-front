import React from "react";
import './Mem-join-complete.css'
import Main_menu from "../../menu/main-menu/main-menu";
import Footer from "../../menu/footer/Footer";

function Mem_join_complete(){
    return(
        <div className="Mem_join_complete-container">
            <Main_menu></Main_menu>
            <div className="Mem_join_complete-content">
                <div className="Mem_join_complete-content-sec1">
                    <div className="Mem_join_complete-content-sec1-s1">환영합니다</div>
                    <div className="Mem_join_complete-content-sec1-s2">보형짱닷컴에 가입이 완료되었습니다 <br/> 다양한 서비스를 이용해 보세요</div>
                </div>
                <div className="Mem_join_complete-content-sec2">
                    <div className="Mem_join_complete-content-sec2-s1">
                        <div className="Mem_join_complete-content-sec2-s1-profile"></div>
                        <div className="Mem_join_complete-content-sec2-s1-profileBtn">이미지추가</div>
                    </div>
                    <div className="Mem_join_complete-content-sec2-s2">가입 아이디</div>
                    <div className="Mem_join_complete-content-sec2-btn">시작하기</div>   
                </div>
            </div>
            <div className="Mem_join_complete-footer">
                <Footer></Footer>
            </div>

        </div>
    )
}

export default Mem_join_complete

