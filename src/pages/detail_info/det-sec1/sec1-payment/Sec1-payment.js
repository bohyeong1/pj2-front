import React,{useState, useRef, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import './Sec1-payment.css'
import DateCalendar from "../../../../utilData/dateCalendar/DateCalendar";

function Sec1_payment({data, params}){
    //state
    const [pay_checkIn, setPay_checkIn] = useState()
    const [pay_checkOut, setPay_checkOut] = useState()
    const [pay_day, setPay_day] = useState()
    const [capacity, setCapacity] = useState(2)

    //ref
    const Sec1_payment_value = useRef()

    //체크아웃 데이트값 받아오기    
    function pullCheckOutData(date){
        setPay_checkOut(date)
    }

    //체크인 데이트값 받아오기
    function pullCheckInData(date){
        setPay_checkIn(date)
    }

    useEffect(()=>{
        if(pay_checkIn && pay_checkOut){
            console.log(pay_checkIn.getTime(), pay_checkOut.getTime())
            const payDay = pay_checkOut.getTime() - pay_checkIn.getTime()
            console.log(payDay, new Date(payDay).getDate())
            setPay_day(new Date(payDay).getDate())
        }
    },[pay_checkOut])

    const navigate = useNavigate()


    function clickReservation(){
        //예약화면에서 쓸 데이터 세션에 저장하기 
        const paymentData = {
            checkIn : pay_checkIn,
            checkOut : pay_checkOut,
            payday : pay_day,
            capacity : capacity,
            totalPrice : (data.price + data.addPrice * (capacity - 1)) * pay_day,
            homeName : data.title,
            homeCategory : data.category.name,
            main_img : data.main_img,
            price : data.price
        }

        sessionStorage.setItem('res_data',JSON.stringify(paymentData))
        navigate(`/ReservationApp/${params}`)
    }



    if(data){
        return(
            <div className="Sec1_payment-container">
                <div className="Sec1_payment-sec1">
                    <div className="Sec1_payment-sec1-s1">
                        <div className="Sec1_payment-sec1-s1-tite">
                            <span style={{fontSize:'1.5rem', fontWeight:'bold'}}>{`${data.price + data.addPrice * (capacity - 1)}원`}</span>
                            <span> /박</span>
                        </div>
                        <div className="Sec1_payment-sec1-s1-content">
                            <div className="Sec1_payment-con-sec1">
                                <div className="Sec1_payment-con-sec1-s1">
                                    <span className="Sec1_pay_check">체크인</span>
                                    <div className="Sec1_payment-con-sec1-s1-b1">
                                        {`${pay_checkIn ? `${pay_checkIn.getMonth()}월 ${pay_checkIn.getDate()}일` : `${new Date().getMonth()}월 ${new Date().getDate()}일`}`}
                                    </div>
                                </div>
                                <div className="Sec1_payment-con-sec1-s2">
                                    <span className="Sec1_pay_check">체크아웃</span>
                                    <div className="Sec1_payment-con-sec1-s2-b1">
                                        {`${pay_checkOut ? `${pay_checkOut.getMonth()}월 ${pay_checkOut.getDate()}일` :  `${new Date().getMonth()}월 ${new Date().getDate()}일`}`}
                                    </div>    
                                </div>                                
                            </div>
                            <div className="Sec1_payment-con-sec1-s2">
                            <DateCalendar pullCheckOutData={pullCheckOutData}  pullCheckInData={pullCheckInData}></DateCalendar>
                            </div>


                            <div className="Sec1_payment-con-sec3">
                                <div className="Sec1_payment-con-s1-b1">
                                    인원
                                </div>
                                <div className="Sec1_payment-con-s1-b2">
                                <button id="Sec1_payment-btn"  className={`Sec1_payment-con-s1-b2-lb`} onClick={(e)=>{
                                    e.stopPropagation()

                                    Sec1_payment_value.current.innerText = Number(Sec1_payment_value.current.innerText)-1

                                    if(Sec1_payment_value.current.innerText==='1'){
                                        e.target.disabled = true
                                    }else{
                                        const rb_btn = document.querySelector(`.Sec1_payment-con-s1-b2-rb`)
                                        rb_btn.disabled=false

                                        }

                                        setCapacity(Number(Sec1_payment_value.current.innerText))        /////capacity값 스테이트에 담기
                                        } 
                                }>
                                    <img id="btnImg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIUlEQVR4nGNgGAWjYBSMApLBfyrhgbNgFIyCUTAKGDABAOkcI91xODUvAAAAAElFTkSuQmCC"></img>
                                </button>

                                <div className="Sec1_payment-con-s1-b2-t1">
                                    <span ref={Sec1_payment_value} className="Sec1_payment-con-s1-b2_val">2</span>
                                    <span>명</span>
                                </div>

                                <button id="Sec1_payment-btn" className={`Sec1_payment-con-s1-b2-rb`} onClick={(e)=>{
                                    e.stopPropagation()
                                    console.log('확인')
                                    Sec1_payment_value.current.innerText = Number(Sec1_payment_value.current.innerText)+1

                                        if(Sec1_payment_value.current.innerText===`${data.capacity}`){
                                            e.target.disabled = true

                                        }else{
                                            const lb_btn = document.querySelector(`.Sec1_payment-con-s1-b2-lb`)
                                            lb_btn.disabled=false     
                                        }
                                        setCapacity(Number(Sec1_payment_value.current.innerText))        /////capacity값 스테이트에 담기
                                    }        
                                }>
                                    <img id="btnImg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAANElEQVR4nGNgGAVUBv+hmGbg/6gFhMD/0SCieRD9pxIeOAsIgf+jqYgQ+D8aRMM/iEYgAACwS0O9h1hB4QAAAABJRU5ErkJggg=="></img>
                                </button>
                                </div>
                            </div>
                        </div>


                        <div className="Sec1_payment-sec1-s1-btn" onClick={clickReservation}>예약하기</div>
                    </div>
                    <div className="Sec1_payment-sec1-s2"></div>
                    <div className="Sec1_payment-sec1-s3"></div>
                </div>
                <div className="Sec1_payment-sec2">예약 확정 전에는 요금이 청구되지 않습니다.</div>
                <div className="Sec1_payment-sec3">
                    <span style={{fontWeight:'bold'}}>총합계</span>
                    <span>
                        {data.price && data.addPrice && pay_day ? `${data.price + data.addPrice * (capacity - 1)} x ${pay_day} = 
                        ${(data.price + data.addPrice * (capacity - 1)) * pay_day }원` : '가격 합계'}
                    </span>
                </div>
            </div>
        )
    }

}

export default Sec1_payment