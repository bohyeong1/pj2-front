import React from "react";
import './Res-con-sec1.css'
import connectData from "../../../../utilData/UtilFunction";
import default_data from "../../../../utilData/defaultData";
import { useNavigate } from "react-router-dom";

function Res_con_sec1 ({data, param}){    

    const navigator = useNavigate()

    // console.log(param)

    const in_years = new Date(data?.checkIn).getFullYear()
    const in_months = new Date(data?.checkIn).getMonth()
    const in_days = new Date(data?.checkIn).getDate()

    const out_years = new Date(data?.checkOut).getFullYear()
    const out_months = new Date(data?.checkOut).getMonth()
    const out_days = new Date(data?.checkOut).getDate()

    const userData = JSON.parse(sessionStorage.getItem('userData')) 
    
    async function payment(data){
        await connectData(`${default_data.d_base_url}/api/reserv/reserv`, 'POST',{
            homeid : param,
            buyerid : userData._id,
            totalPrice : data.totalPrice,       /////최종가격
            capacity : data.capacity,           ///////인원수
            price : data.price,                ///1박당 가격
            restDay : data.payday            /////숙박일수

        })

    }

    return(
        <div className="Res_con_sec1-container">
            <div className="Res_con_sec1-sec1">예약요청</div>
            <div className="Res_con_sec1-sec2">
                <div className="Res_con_sec1-sec2-title">예약정보</div>
                <div className="Res_con_sec1-sec2-content">
                    <div className="Res_con_sec1-sec2-con-sec1">
                        <div className="Res_con_sec1-sec2-con-s1-b1">날짜</div>
                        <div className="Res_con_sec1-sec2-con-s1-b2">{`${in_years}년 ${in_months}월 ${in_days}일 ~ ${out_years}년 ${out_months}월 ${out_days}일`}</div>
                    </div>
                    <div className="Res_con_sec1-sec2-con-sec2">
                        <div className="Res_con_sec1-sec2-con-s1-b1">게스트</div>
                        <div className="Res_con_sec1-sec2-con-s1-b2">{`게스트 ${data?.capacity}명`}</div>
                    </div>
                </div>
            </div>
            <div className="Res_con_sec1-sec3">
                <div className="Res_con_sec1-sec3-title">기본 규칙</div>
                <div className="Res_con_sec1-sec3-content">
                    <div className="Res_con_sec1-sec3-con-sec1">훌륭한 게스트가 되기 위한 몇 가지 간단한 규칙을 지켜주실 것을 모든 게스트에게 당부드리고 있습니다</div>
                    <div className="Res_con_sec1-sec3-con-sec2"><span>1</span> 숙소 이용규칙을 준수하세요</div>
                    <div className="Res_con_sec1-sec3-con-sec2"><span>2</span> 호스트의 집도 자신의 집처럼 아껴주세요</div>
                </div>
            </div>
            <div className="Res_con_sec1-sec4">
                <div className="Res_con_sec1-sec4-title">요금 정책</div>
                <div className="Res_con_sec1-sec4-content">
                    <div className="Res_con_sec1-sec4-con-sec1"><span>1</span> 현재 페이지는 현금을 통한 거래를 허용하지 않습니다</div>
                    <div className="Res_con_sec1-sec4-con-sec1"><span>2</span> 프론트엔드 기능 확인을 위해 가상의 마일리지를 통해 거래됩니다</div>
                    <div className="Res_con_sec1-sec4-con-sec1"><span>3</span> 가상의 마일리지는 가입 시 200만원씩 주어집니다</div>
                </div>
            </div>
            <div className="Res_con_sec1-sec5">
                <div className="Res_con_sec1-sec5-title">결제 수단</div>
                <div className="Res_con_sec1-sec5-content">
                    <div className="Res_con_sec1-sec5-con-sec1">
                        <div className="Res_con_sec1-sec5-con-sec1-b1">보유 마일리지</div>
                        <div className="Res_con_sec1-sec5-con-sec1-b2">{`${userData.cashInv}원`}</div>
                    </div>
                    <div className="Res_con_sec1-sec5-con-sec2">
                        <div className="Res_con_sec1-sec5-con-sec1-b1">결제 후 마일리지</div>
                        <div className="Res_con_sec1-sec5-con-sec1-b2">{`${userData.cashInv - data?.totalPrice}원`}</div>
                    </div>                    
                </div>                
            </div>
            <div className="Res_con_sec1-sec6">
                <button className="Res_con_sec1-sec6-btn" onClick={async ()=>{await payment(data)
                                                                        navigator('/Private_history')
                }}>결제하기</button>
                <button className="Res_con_sec1-sec6-btn" onClick={()=>{navigator('/')}}>취소</button>                
            </div>
        </div>
    )
}

export default Res_con_sec1