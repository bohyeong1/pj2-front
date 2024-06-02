import React from "react";
import { startOfMonth, startOfWeek, endOfMonth, endOfWeek, eachDayOfInterval} from "date-fns";


function Dates({thisMonth, thisDate, clickDay, hoverDay, hoverDate,checkoutDate}){

    const start_of_month = startOfMonth(thisMonth)
    const end_of_month = endOfMonth(thisMonth)
    const start_of_week = startOfWeek(start_of_month)
    const end_of_week = endOfWeek(end_of_month)

    const week = ['일', '월', '화', '수', '목', '금', '토']       



    const currentDate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
     
    ///////한달 날짜 배열 
    const date_array = eachDayOfInterval({
        start:new Date(start_of_week),
        end:new Date(end_of_week)
    })

    

    console.log(new Date(currentDate))

    return(
        <div className="wraper">
            <div className="DateCalendar-con-m-day">
                {week?.map((el,id)=>{
                    return(
                        <div className="DateCalendar-con-m-day-box" key={id}>{el}</div>
                    )
                })}
            </div>

            <div className="DateCalendar-con-m-dates">
                {date_array?.map((el)=>{
                    return(
                        <div className="Calendar-box" style={{color:`${el.getTime() === thisDate?.getTime() || el.getTime() === checkoutDate?.getTime() ? 'white' : 
                        `${el < new Date(currentDate) ? 'purple' :`${thisMonth.getMonth() !== el.getMonth() ? 'purple' : el.getDay()===0 ? 'red' : `${el.getDay()===6 ? 'blue':'black'}`}`}`}`,
                        background:`${el.getTime() === thisDate?.getTime() || el.getTime() === checkoutDate?.getTime() ? 'black' : `${thisDate<el && el<=hoverDate ? 'beige':'white'}`}`}}
                         key={el} onClick={()=>{clickDay(el)}} onMouseOver={()=>{hoverDay(el)}}>{`${el.getDate()}`}</div>
                )
                })}
             </div>            
        </div>
    )
}

export default Dates