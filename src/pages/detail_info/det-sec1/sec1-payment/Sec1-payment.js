import React from "react";
import { useNavigate} from "react-router-dom";
import './Sec1-payment.css'

function Sec1_payment({data}){
    const navigate = useNavigate()
    return(
        <div className="Sec1_payment-container">
            <div className="Sec1_payment-sec1">
                <div className="Sec1_payment-sec1-s1">
                    <div className="Sec1_payment-sec1-s1-tite">{`${data.price} / 박`}</div>
                    <div className="Sec1_payment-sec1-s1-content">
                        <div className="Sec1_payment-con-sec1">
                            <div className="Sec1_payment-con-sec1-s1">체크인</div>
                            <div className="Sec1_payment-con-sec1-s2">체크아웃</div>
                        </div>
                        <div className="Sec1_payment-con-sec2">인원/명수</div>
                    </div>
                    <div className="Sec1_payment-sec1-s1-btn" onClick={()=>{navigate('/ReservationApp')}}>예약하기</div>
                </div>
                <div className="Sec1_payment-sec1-s2"></div>
                <div className="Sec1_payment-sec1-s3"></div>
            </div>
            <div className="Sec1_payment-sec2">예약 확정 전에는 요금이 청구되지 않습니다.</div>
            <div className="Sec1_payment-sec3">결제 합계</div>
        </div>
    )
}

export default Sec1_payment