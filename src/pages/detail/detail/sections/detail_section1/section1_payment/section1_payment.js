import React,{useState, useRef, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import './section1_payment.scss'
import { pop_three_texts, transform_date } from "@/util/function/util_function";
import { addDays } from 'date-fns';
import { useClickAway } from 'use-click-away';
import Calendar from "@/utilComponent/material/calendar/calendar";

function Section1Payment({data, params, role}){
    // =================================================
    // states //
    const [pay_checkIn, setPay_checkIn] = useState()
    const [pay_checkOut, setPay_checkOut] = useState()
    const [pay_day, setPay_day] = useState()
    const [capacity, setCapacity] = useState(2)

    const [calendar_modal, setCalendar_modal] = useState(false)

    // =================================================
    // refs //
    const detail_capacity = useRef(null)
    const calendar_modal_ref = useRef(null)

    //체크아웃 데이트값 받아오기    
    function pullCheckOutData(date){
        setPay_checkOut(date)
    }

    // 날짜 변환


    //체크인 데이트값 받아오기
    function pullCheckInData(date){
        setPay_checkIn(date)
    }

    useEffect(()=>{
        if(pay_checkIn && pay_checkOut){
            const payDay = pay_checkOut.getTime() - pay_checkIn.getTime()
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

    // 플러스버튼
    function clickPlus(e){
        e.stopPropagation()
        detail_capacity.current.innerText = Number(detail_capacity.current.innerText)-1
        if(detail_capacity.current.innerText==='1'){
            e.target.parentNode.disabled = true
        }else{
            const rb_btn = document.querySelector(`.section1-payment__con-part1-b2-rb`)
            rb_btn.disabled=false
            }
            setCapacity(Number(detail_capacity.current.innerText))        /////capacity값 스테이트에 담기
    }
    console.log(data)
    // 마이너스버튼
    function clickMinus(e){
        e.stopPropagation()
        console.log('확인')
        detail_capacity.current.innerText = Number(detail_capacity.current.innerText)+1
            if(detail_capacity.current.innerText===`${data.capacity}`){
                e.target.parentNode.disabled = true

            }else{
                const lb_btn = document.querySelector(`.section1-payment__con-part1-b2-lb`)
                lb_btn.disabled=false     
            }
            setCapacity(Number(detail_capacity.current.innerText))        /////capacity값 스테이트에 담기
    }

    function open_calendar(e){
        e.preventDefault()
        e.stopPropagation()
        if(!calendar_modal){
            setCalendar_modal(true)
        }
    }

    useClickAway(calendar_modal_ref, (e)=>{
        if(e.target.closest('.section1-payment__section1-check')){
            return
        }
        if(calendar_modal){
            setCalendar_modal(false)
        }
    })

    if(data){
        return(
            <div className="section1-payment__container">
                {/* header */}
                <div className="section1-payment__header">                    
                    <span>₩{pop_three_texts(data.price)}</span>
                    <span>/박</span>
                </div>
                {/* section1 */}
                <div className="section1-payment__section1">
                    <div onClick={open_calendar}
                         className="section1-payment__section1-check not-user-sellect">
                        <span>체크인</span>
                        <span>{transform_date(new Date())}</span>
                    </div>
                    <div onClick={open_calendar}
                         className="section1-payment__section1-check not-user-sellect">
                        <span>체크아웃</span>
                        <span>{transform_date(addDays(new Date(), 1))}</span>
                    </div>

                    {calendar_modal && <div className="section1-payment__calendar-modal"
                                            ref={calendar_modal_ref}>
                        달력
                    </div>}
                </div>
                {/* section2 */}
                <div className="section1-payment__section2">
                    <div>
                        <span>인원</span>
                        <div>
                            <span>게스트 1명</span>
                            <button>플러스</button>
                        </div>
                    </div>
                    <div>
                        <span>애완동물</span>
                        <div>
                            <span>애완동물 0마리</span>
                            <button>플러스</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Section1Payment