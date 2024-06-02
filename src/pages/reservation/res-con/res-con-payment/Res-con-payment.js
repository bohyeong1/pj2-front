import React from "react";
import './Res-con-payment.css'
import Detail from "../../../../picture/detail/Detail";

function Res_con_payment({data}){

    // console.log(data)

    return(
        <div className="Res_con_payment-container">
            <div className="Res_con_payment-sec1">
                <div className="Res_con_payment-sec1-s1">
                    <Detail data={data}></Detail>
                </div>
                <div className="Res_con_payment-sec1-s2">
                    <div className="Res_con_payment-sec1-s2-s1">{data?.homeName}</div>
                    <div className="Res_con_payment-sec1-s2-s1">{data?.homeCategory}</div>
                    <div className="Res_con_payment-sec1-s2-s1">{}</div>
                    <div className="Res_con_payment-sec1-s2-s1">{}</div>
                </div>
            </div>
            <div className="Res_con_payment-sec2">
                <div className="Res_con_payment-sec2-s1">요금 세부정보</div>
                <div className="Res_con_payment-sec2-s2">
                    <div className="Res_con_payment-sec2-s2-s1">가격 / 1박</div>
                    <div className="Res_con_payment-sec2-s2-s2">{`${data?.price}원`}</div>
                </div>
                <div className="Res_con_payment-sec2-s3">
                    <div className="Res_con_payment-sec2-s3-s1">숙박 일수</div>
                    <div className="Res_con_payment-sec2-s3-s1">{`${data?.payday}일`}</div>
                </div>
            </div>
            <div className="Res_con_payment-sec3">
                <div className="Res_con_payment-sec3-s1">총 합계</div>
                <div className="Res_con_payment-sec3-s2">{`${data?.totalPrice}원`}</div>
            </div>
            <div className="Res_con_payment-sec4">해당 홈페이지는 실제 현금이 아닌 가상의 마일리지로 결제됩니다.</div>
        </div>
    )
}

export default Res_con_payment