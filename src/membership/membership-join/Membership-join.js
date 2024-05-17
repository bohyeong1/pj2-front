import React from "react";
import './Membership-join.css'
import Main_menu from "../../menu/main-menu/main-menu";
import Footer from "../../menu/footer/Footer";

function Membership_join(){
    return(
        <div className="Membership_join-container">
            <Main_menu></Main_menu>
            <div className="Membership_join-content">
                <div className="Membership_join-content-sec1">
                    <div className="Membership_join-content-sec1-s1">보형짱 닷컴</div>
                    <div className="Membership_join-content-sec1-s2">step2</div>
                    <div className="Membership_join-content-sec1-s3">
                        보형짱 닷컴 계정으로 사용할 <br/> 아이디를 만들어 주세요
                    </div>
                </div>
                <div className="Membership_join-content-sec2">                                                       
                    <div className="Membership_join-content-sec2-s1">아이디</div>
                    <div className="Membership_join-content-sec2-s2">비밀번호</div>
                    <div className="Membership_join-content-sec2-s2">비밀번호 확인</div>
                    <div className="Membership_join-content-sec2-s2">이메일</div>
                    <div className="Membership_join-content-sec2-s2">성별</div>
                    <div className="Membership_join-content-sec2-btn">동의</div>                        
                </div>
            </div>

            <div className="Membership_join-footer">
                <Footer></Footer>
            </div>
        </div>
    )

}

export default Membership_join