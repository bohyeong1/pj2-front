import React from "react";
import './AgreeTerms.css'
import Main_menu from "../../menu/main-menu/main-menu";
import Footer from "../../menu/footer/Footer";

function AgreeTerms(){
    return(
        <div className="AgreeTerms-container">
            <Main_menu></Main_menu>
            <div className="AgreeTerms-content">
                <div className="AgreeTerms-content-sec1">
                    <div className="AgreeTerms-content-sec1-s1">보형짱 닷컴</div>
                    <div className="AgreeTerms-content-sec1-s2">step1</div>
                    <div className="AgreeTerms-content-sec1-s3">
                        보형짱 닷컴 <br/> 서비스 약관에 동의해 주세요
                    </div>
                    <div className="AgreeTerms-content-sec1-s4">모두 동의</div>
                </div>
                <div className="AgreeTerms-content-sec2">
                    <div className="AgreeTerms-content-sec2-s1">필수사항 동의/매핑으로 돌리기</div>
                    <div className="AgreeTerms-content-sec2-s2">선택사항 동의/매핑으로 돌리기</div>
                    <div className="AgreeTerms-content-sec2-btn">동의</div>
                    
                </div>
            </div>
            <div className="AgreeTerms-footer">
                    <Footer></Footer>
            </div>
        </div>
    )
}

export default AgreeTerms