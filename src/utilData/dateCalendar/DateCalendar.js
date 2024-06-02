import React, { useState} from "react";
import './DateCalendar.css'
import Dates from "./dates/CalendarDay";
import { addMonths, subMonths } from "date-fns";



function DateCalendar({pullCheckOutData, pullCheckInData}){
    
    const [thisDate, setThisDate] = useState()             ///////////체크인 date
    const [thisMonth, setThisMonth] = useState(new Date())          ///////// 달력에 보여지는 달
    const [hoverDate, setHoverDate] = useState()                    //////////마우스 호버시 입력되는 date               
    const [checkoutDate, setCheckoutDate] = useState()              //////체크아웃 date
    ///이전달 버튼
    function prevMonth(e){            

        setThisMonth(subMonths(thisMonth,1))
    }

    //다음달 버튼
    function nextMonth(){
        setThisMonth(addMonths(thisMonth,1))
    }

    /////////날짜 버튼 클릭 시 
    function clickDay(date){
        if(!thisDate || checkoutDate){
            setThisDate(date)
            setHoverDate(date)
            setCheckoutDate(null)

            pullCheckInData(date)
            pullCheckOutData(null)
        }else if(thisDate){
            if(date < thisDate){
                setThisDate(date)
                setHoverDate(date)
                setCheckoutDate(null)

                pullCheckInData(date)
                pullCheckOutData(null)
            }else{
                setCheckoutDate(date)
                setHoverDate(date)

                pullCheckOutData(date)
            }
        }
    }

    console.log('렌더링 횟수 체크')
 
    /////////날짜 버튼 마우스 호버시
    function hoverDay(date){
        if(thisDate && date >= thisDate){
            if(checkoutDate){
                return
            }else{
                setHoverDate(date)
            }

        }
    }

    return(
        <div className="DateCalendar-container">
            <div className="DateCalendar-con-header">
                <button className="DateCalendar-con-h-nav-btn go-prev" disabled={new Date().getMonth() === thisMonth.getMonth() ? true : false} onClick={prevMonth}>&lt;</button>       
                <div className="DateCalendar-con-h-year-month">{`${thisMonth.getFullYear()}년 ${thisMonth.getMonth()+1}월`}</div>             
                <button className="DateCalendar-con-h-nav-btn go-next" onClick={nextMonth}>&gt;</button>
            </div>
            <div className="DateCalendar-con-main">
                <Dates thisMonth = {thisMonth} thisDate={thisDate} clickDay = {clickDay} hoverDay={hoverDay} hoverDate={hoverDate} checkoutDate={checkoutDate}></Dates>

            </div>
        </div>
    )
}

export default DateCalendar