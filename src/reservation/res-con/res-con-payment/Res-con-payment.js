import React from "react";
import './Res-con-payment.css'
import Detail from "../../../picture/detail/Detail";

function Res_con_payment({data}){
    return(
        <div className="Res_con_payment-container">
            <div className="Res_con_payment-sec1">
                <div className="Res_con_payment-sec1-s1">
                    <Detail data={data}></Detail>
                </div>
                <div className="Res_con_payment-sec1-s2">
                    <div className="Res_con_payment-sec1-s2-s1">{data.title}</div>
                    <div className="Res_con_payment-sec1-s2-s1">{data.category}</div>
                    <div className="Res_con_payment-sec1-s2-s1">{`등급:${data.grade}  평점:${data.evaluation}`}</div>
                </div>
            </div>
            <div className="Res_con_payment-sec2">
                <div className="Res_con_payment-sec2-s1">요금 세부정보</div>
                <div className="Res_con_payment-sec2-s2">
                    <div className="Res_con_payment-sec2-s2-s1">가격 * 몇박</div>
                    <div className="Res_con_payment-sec2-s2-s2">가격</div>
                </div>
                <div className="Res_con_payment-sec2-s3">
                    <div className="Res_con_payment-sec2-s3-s1">보형닷컴 자체 수수료</div>
                    <div className="Res_con_payment-sec2-s3-s1">계산식</div>
                </div>
            </div>
            <div className="Res_con_payment-sec3">
                <div className="Res_con_payment-sec3-s1">총 합계</div>
                <div className="Res_con_payment-sec3-s2">가격</div>
            </div>
            <div className="Res_con_payment-sec4">해당 홈페이지는 실제 현금이 아닌 가상의 마일리지로 결제됩니다.</div>
        </div>
    )
}

export default Res_con_payment