import React,{useState} from "react";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css'
import moment from "moment/moment";
import './customCal.css'


function CalendarData(){
    const [value, onChange] = useState()
    return(
        <>
            <Calendar onChange={onChange} value={value} formatDay={(locale, date) => moment(date).format("DD")} formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
                    showNeighboringMonth={false} calendarType="gregory" next2Label={null} prev2Label={null} ></Calendar>
        </>
    )
}

export default CalendarData