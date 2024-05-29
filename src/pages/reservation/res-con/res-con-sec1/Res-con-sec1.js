import React from "react";
import './Res-con-sec1.css'

function Res_con_sec1 (){
    return(
        <div className="Res_con_sec1-container">
            <div className="Res_con_sec1-sec1">예약요청</div>
            <div className="Res_con_sec1-sec2">
                <div className="Res_con_sec1-sec2-title">예약정보</div>
                <div className="Res_con_sec1-sec2-content">
                    <div className="Res_con_sec1-sec2-con-sec1">날짜</div>
                    <div className="Res_con_sec1-sec2-con-sec2">게스트/명수</div>
                </div>
            </div>
            <div className="Res_con_sec1-sec3">
                <div className="Res_con_sec1-sec3-title">예약하려면 로그인을 해주세요</div>
                <div className="Res_con_sec1-sec3-content">
                    <div className="Res_con_sec1-sec3-con-sec1">ID : / PASSWORD :</div>
                    <div className="Res_con_sec1-sec3-con-sec2">비회원 숙소 신청은 지원되지 않습니다.</div>
                    <div className="Res_con_sec1-sec3-con-sec3">로그인</div>
                </div>
            </div>
            <div className="Res_con_sec1-sec4">
                <div className="Res_con_sec1-sec4-title">아이디가 없다면 회원가입 해주세요</div>
                <div className="Res_con_sec1-sec4-content">회원가입</div>
            </div>
        </div>
    )
}

export default Res_con_sec1