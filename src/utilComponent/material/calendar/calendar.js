import React, { useState} from "react";
import './calendar.scss'
import Dates from "./dates/dates";
import { addMonths, subMonths } from "date-fns";



function Calendar({pullCheckOutData, pullCheckInData}){
    
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

    // console.log('렌더링 횟수 체크')
 
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
                <button className="DateCalendar-con-h-nav-btn go-prev" 
                        disabled={new Date().getMonth() === thisMonth.getMonth() ? true : false} 
                        onClick={prevMonth}
                        style={{cursor:`${new Date().getMonth() === thisMonth.getMonth() ? 'default' : 'pointer'}`,
                        opacity:`${new Date().getMonth() === thisMonth.getMonth() ? 0.2 : 1}`}}>
                    <img className="DateCalendar-con-h-nav-btn-l"
                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+ElEQVR4nO3YO0oEQRQF0IMgIiYaGmqkK3ABugHNXIVbcAuGpuIG3IAfUAxE9zChmWAyoPhkoE0GBHukne7nO3Djrlv9qypKKaWUUv69Szxhe+gzEU1ecShBkWhyhmUJigQesSlBkcALDiQoMskHTrBo4EW+coN1CYoEnrEnQZHAO46xMOvF7lpesOtcYK3rWfurjLCToUhgjKMMRaLJOVYyFAncVxHzvwuR5dEaZ3jZR7N8fm97MPCY+iGu6pk2Bd5+u0TpUptF464e+0mJ66Ev41NsrCZb3X0D8t3hw4aBiamcYskARZYDuis8YGveAymllFJK0b1PWPYJBNI2YFUAAAAASUVORK5CYII="></img>    
                </button>       
                <div className="DateCalendar-con-h-year-month">{`${thisMonth.getFullYear()}년 ${thisMonth.getMonth()+1}월`}</div>             
                <button className="DateCalendar-con-h-nav-btn go-next" 
                        onClick={nextMonth}>
                    <img className="DateCalendar-con-h-nav-btn-r"
                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+ElEQVR4nO3YO0oEQRQF0IMgIiYaGmqkK3ABugHNXIVbcAuGpuIG3IAfUAxE9zChmWAyoPhkoE0GBHukne7nO3Djrlv9qypKKaWUUv69Szxhe+gzEU1ecShBkWhyhmUJigQesSlBkcALDiQoMskHTrBo4EW+coN1CYoEnrEnQZHAO46xMOvF7lpesOtcYK3rWfurjLCToUhgjKMMRaLJOVYyFAncVxHzvwuR5dEaZ3jZR7N8fm97MPCY+iGu6pk2Bd5+u0TpUptF464e+0mJ66Ev41NsrCZb3X0D8t3hw4aBiamcYskARZYDuis8YGveAymllFJK0b1PWPYJBNI2YFUAAAAASUVORK5CYII="></img>
                </button>
            </div>
            <div className="DateCalendar-con-main">
                <Dates thisMonth = {thisMonth} 
                       thisDate={thisDate} 
                       clickDay = {clickDay} 
                       hoverDay={hoverDay} 
                       hoverDate={hoverDate} 
                       checkoutDate={checkoutDate}/>
            </div>
        </div>
    )
}

export default Calendar