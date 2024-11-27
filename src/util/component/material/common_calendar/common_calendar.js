import React, {useState, useRef, useMemo} from "react";
import './common_calendar.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import default_data from "@/util/default_data/default_data";
import { 
    startOfMonth, 
    startOfWeek, 
    endOfMonth, 
    endOfWeek, 
    eachDayOfInterval, 
    addMonths, 
    getMonth, 
    getYear, 
    isSameDay, 
    isBefore, 
    startOfDay,
} from "date-fns";
import useMaterialCommonCalendarStyle from "../hook-store/style-hooks/material_common_calendar_style";
import { state_store, reference_store } from "@/util/function/util_function";

function CommonCalendar({
    set_checkout_handler, 
    set_checkin_handler, 
    checkin_date, 
    checkout_date, 
    double = true, 
    header_font = undefined
}){

    // =================================================
    // states //                                 
    const [is_left_button, setIs_left_button] = useState(false)
    const [is_right_button, setIs_right_button] = useState(true)

    // =================================================
    // refs //
    const header_slider_ref = useRef(null)
    const main_slider_ref = useRef(null)
    const calendar_container_ref = useRef(null)
    const left_button_ref = useRef(null)
    const right_button_ref = useRef(null)
    
    // =================================================
    // const //
    const [today] = useState(new Date())
    const [week] = useState(['일', '월', '화', '수', '목', '금', '토'])    

    const calendar_array = useMemo(() => {
        const virtual_array = Array.from({length : 6})
        return virtual_array.map((_, index) => {
            const created_month = addMonths(today, index)
            const start_of_month = startOfMonth(created_month)
            const end_of_month = endOfMonth(created_month)
            const start_of_week = startOfWeek(start_of_month)
            const end_of_week = endOfWeek(end_of_month)
            const date_array = eachDayOfInterval({
                start : start_of_week,
                end : end_of_week,
            })
            return {
                year : getYear(created_month),
                month : getMonth(created_month) + 1,
                date_array,
            }
        })
      }, [today])

    // =================================================
    // hooks //
    // style
    const {
        click_prev_month,
        click_next_month,
        date_range_style,
        click_date
    } = useMaterialCommonCalendarStyle(undefined,
        state_store([
            {is_left_button, setIs_left_button},
            {is_right_button, setIs_right_button}
        ]),
        reference_store([
            {header_slider_ref},
            {main_slider_ref},
            {calendar_container_ref},
            {left_button_ref},
            {right_button_ref}
        ]),
        {
            set_checkout_handler,
            set_checkin_handler,
            checkin_date,
            checkout_date
        }
    )

    return(
        <div className = "common-calendar__container">
            <div className = "common-calendar__header"                 
                 ref={calendar_container_ref}>
                {/* button header */}
                <button className = {`common-calendar__header-button common-calendar-left-button ${!is_left_button ? 'common-calendar-button-disable' : 'common-calendar-button-enable'}`} 
                        disabled = {!is_left_button ? true : false} 
                        ref={left_button_ref}
                        onClick = {click_prev_month}>
                    <img src = {default_data.d_imgs.drop_arrow}
                         className = "common-calendar-left"/>
                </button>                
                <button className = {`common-calendar__header-button common-calendar-right-button ${!is_right_button ? 'common-calendar-button-disable' : 'common-calendar-button-enable'}`} 
                        disabled = {!is_right_button ? true : false} 
                        ref={right_button_ref}
                        onClick = {click_next_month}>
                    <img src = {default_data.d_imgs.drop_arrow}
                         className = "common-calendar-right"/>
                </button>
                {/* slide header */}
                <div 
                    className="common-calendar__header-slider"
                    style={{width : double ? '300%' : '600%'}}
                     ref={header_slider_ref}>
                    {calendar_array.map((_, id)=>{
                        return(
                            <div className="calendar_header-slider-container"
                                 style={{fontSize : header_font ? header_font : '1.025rem', width : double ? '50%' : '100%'}}
                                 key={id}>
                                <div className = "common-calendar__header-year-month">
                                    {`${calendar_array[id].year}년 ${calendar_array[id].month}월`}
                                </div>                                                      
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* main */}
            <div 
                className = "common-calendar__main">
                {/* 요일 */}
                <div className = "common-calendar__main-header">
                    <div 
                        className = "common-calendar__main-header-wrapper"
                        style={{flexBasis : double ? '50%' : '100%'}}>
                        {week.map((el,id)=>{
                            return(
                                    <div 
                                        className = "common-calendar__main-header-box"
                                        key={id}>
                                            {el}
                                    </div>
                            )
                        })}
                    </div>
                    {double && <div 
                        className = "common-calendar__main-header-wrapper"
                        style={{flexBasis : double ? '50%' : '100%'}}>
                        {week.map((el,id)=>{
                            return(
                                    <div 
                                        className = "common-calendar__main-header-box"
                                        key={id}>
                                            {el}
                                    </div>
                            )
                        })}
                    </div>}
                </div>
                {/* 날짜 */}
                <div className = "common-calendar__main-dates">
                    {/* slide date */}
                    <div 
                        className = "common-calendar__main-dates-slider"
                        style={{width : double ? '300%' : '600%'}}
                        ref={main_slider_ref}>
                        {calendar_array.map((_, id)=>{
                            return (
                                <div 
                                    className = "common-calendar__main-dates-container"
                                    key={id}
                                    onClick={double ? (e) => click_date(e) : undefined}>
                                    <div className = "common-calendar__main-dates-wrapper">
                                        {calendar_array[id].date_array.map((ele, id2)=>{
                                            return(              
                                                <Dates 
                                                    date = {ele}
                                                    month = {calendar_array[id].month}
                                                    is_saturday = {id2 % 7 === 6 ? true : false}
                                                    is_sunday = {id2 % 7 === 0 ? true : false}
                                                    range_state = {date_range_style(ele, checkin_date, checkout_date)}
                                                    checkin_state = {isSameDay(ele, checkin_date)}
                                                    checkout_state = {isSameDay(ele, checkout_date)}
                                                    key= {`${id}-${id2}`}/>                                    
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>            
            </div>
        </div>
    )
}

// =================================================
// dates // 
const Dates = React.memo((
    {
        date, 
        checkin_state, 
        checkout_state, 
        month, 
        range_state, 
        is_saturday, 
        is_sunday
    }) => {

    const is_valid_date = (date.getMonth() + 1) === month
    const is_before_today = isBefore(date, startOfDay(new Date()))

    // =================================================
    // 비활성화 날짜 검사 //
    function check_activate_date(){
        if(!is_before_today){
            return true
        }
        else {
            return false
        }
    }

    return(
        <div className = "common-calendar__main-dates-box not-user-sellect">                                  
            <button className = {`common-calendar__main-dates-value 
                                ${check_activate_date() && is_saturday ? 'common-calendar-saturday' : ''}
                                ${check_activate_date() && is_sunday ? 'common-calendar-sunday' : ''}
                                ${!check_activate_date() ? 'common-calendar-deactivate' : '' }
                                ${is_valid_date && check_activate_date() ? 'common-calendar-valid-button' : 'common-calendar-not-valid-button'} 
                                ${is_valid_date && (checkin_state || checkout_state) ? 'common-calendar-active-button-style' : ''}`}  
                    data-date = {date}>
                        {is_valid_date ? date.getDate() : ''}
            </button>    

            <div className = {`common-calendar__main-dates-tile 
                             ${is_valid_date && range_state ? 'common-calendar__active-background' : ''}
                             ${is_valid_date && checkin_state ? 'common-calendar__active-width' : ''} 
                             ${is_valid_date && checkout_state ? 'common-calendar__active-right-width' : ''}`}>
            </div>
        </div>  
    )
})

export default CommonCalendar