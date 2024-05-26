import React from "react";
import './Acc_regist.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Footer from '../../../menu/footer/Footer'

function Acc_regist(){

   console.log(localStorage.getItem('userName')) 
    const reserveData = null
    return(
        <div className="Acc_registApp">
            <div className="Acc_regist-gnb">
                <Main_menu></Main_menu>
            </div>

            <div className="Acc_regist-container">
                <div className="Acc_regist-sec1">
                    <div className="Acc_regist-s1-b1">{`${localStorage.getItem('userName')} 님, 반갑습니다!`}</div>
                    <div className="Acc_regist-s1-b2">
                        <div className="Acc_regist-s1-b2-t1">호스팅 정책</div>
                        <div className="Acc_regist-s1-b2-t2">보형짱 닷컴의 호스팅 정책을 꼭 확인해 주세요</div>
                        <div className="Acc_regist-s1-b2-t3">moreBtn</div>
                    </div>
                </div>
                <div className="Acc_regist-sec2">
                    <div className="Acc_regist-s2-b1">예약</div>
                    <div className="Acc_regist-s2-b2">
                        <div className="Acc_regist-s2-b2-t1"></div>
                        <div className={`Acc_regist-s2-b2-t2 ${'reserve_active'}`}>
                            {reserveData ? '데이터 있음' : '예약된 숙소가 없습니다'}
                        </div>
                    </div>
                </div>
            </div>
            <div className="Acc_regist-footer">
                <Footer></Footer>
            </div>
        </div>

    )

}

export default Acc_regist