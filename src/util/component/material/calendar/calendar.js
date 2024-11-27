import React, {useState, useRef, useMemo} from "react";
import './calendar.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import default_data from "@/util/default_data/default_data";
import clean_icon from '@/assets/icon/clean-icon.png'
import { 
    startOfMonth, 
    startOfWeek, 
    endOfMonth, 
    endOfWeek, 
    eachDayOfInterval, 
    addMonths, 
    getMonth, 
    getYear, 
    getDay,
    isSameDay, 
    isBefore, 
    isAfter,
    isEqual,
    startOfDay,
    set
} from "date-fns";
import useMaterialCalendarStyle from "../hook-store/style-hooks/material_calendar_style";
import { state_store, reference_store } from "@/util/function/util_function";

function Calendar({
    set_checkout_handler, 
    set_checkin_handler, 
    checkin_date, 
    checkout_date, 
    double = true, 
    header_font,
    possible_date,
    impossible_reservation,
    reservation_deadline,
    reservation = null,
    calendar_error_handler,
    min_date,
    max_date
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
    } = useMaterialCalendarStyle(undefined,
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
            checkout_date,
            calendar_error_handler,
            min_date,
            max_date
        }
    )

    return(
        <div className = "calendar__container">
            <div className = "calendar__header"                 
                 ref={calendar_container_ref}>
                {/* button header */}
                <button className = {`calendar__header-button calendar-left-button ${!is_left_button ? 'calendar-button-disable' : 'calendar-button-enable'}`} 
                        disabled = {!is_left_button ? true : false} 
                        ref={left_button_ref}
                        onClick = {click_prev_month}>
                    <img src = {default_data.d_imgs.drop_arrow}
                         className = "calendar-left"/>
                </button>                
                <button className = {`calendar__header-button calendar-right-button ${!is_right_button ? 'calendar-button-disable' : 'calendar-button-enable'}`} 
                        disabled = {!is_right_button ? true : false} 
                        ref={right_button_ref}
                        onClick = {click_next_month}>
                    <img src = {default_data.d_imgs.drop_arrow}
                         className = "calendar-right"/>
                </button>
                {/* slide header */}
                <div 
                    className="calendar__header-slider"
                    style={{width : double ? '300%' : '600%'}}
                     ref={header_slider_ref}>
                    {calendar_array.map((_, id)=>{
                        return(
                            <div className="calendar_header-slider-container"
                                 style={{fontSize : header_font ? header_font : '1.025rem', width : double ? '50%' : '100%'}}
                                 key={id}>
                                <div className = "calendar__header-year-month">
                                    {`${calendar_array[id].year}년 ${calendar_array[id].month}월`}
                                </div>                                                      
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* main */}
            <div 
                className = "calendar__main">
                {/* 요일 */}
                <div className = "calendar__main-header">
                    <div 
                        className = "calendar__main-header-wrapper"
                        style={{flexBasis : double ? '50%' : '100%'}}>
                        {week.map((el,id)=>{
                            return(
                                    <div 
                                        className = "calendar__main-header-box"
                                        key={id}>
                                            {el}
                                    </div>
                            )
                        })}
                    </div>
                    {double && <div 
                        className = "calendar__main-header-wrapper"
                        style={{flexBasis : double ? '50%' : '100%'}}>
                        {week.map((el,id)=>{
                            return(
                                    <div 
                                        className = "calendar__main-header-box"
                                        key={id}>
                                            {el}
                                    </div>
                            )
                        })}
                    </div>}
                </div>
                {/* 날짜 */}
                <div className = "calendar__main-dates">
                    {/* slide date */}
                    <div 
                        className = "calendar__main-dates-slider"
                        style={{width : double ? '300%' : '600%'}}
                        ref={main_slider_ref}>
                        {calendar_array.map((_, id)=>{
                            return (
                                <div 
                                    className = "calendar__main-dates-container"
                                    key={id}
                                    onClick={double ? (e) => click_date(e) : undefined}>
                                    <div className = "calendar__main-dates-wrapper">
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
                                                    double = {double}
                                                    reservation = {reservation}
                                                    possible_date = {addMonths(new Date(), possible_date)}
                                                    impossible_reservation = {impossible_reservation}
                                                    reservation_deadline = {reservation_deadline}
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
        is_sunday,
        possible_date,
        impossible_reservation,
        reservation_deadline,
        reservation,
        double
    }) => {

    const is_valid_date = (date.getMonth() + 1) === month
    const is_before_today = isBefore(date, startOfDay(new Date()))

    // =================================================
    // 비활성화 날짜 검사 //
    function check_activate_date(){
        const is_before_possible_date = isBefore(date, possible_date)
        const today_deadline = isEqual(date, startOfDay(new Date())) ?
            isBefore(new Date(), set(new Date(), {hours : reservation_deadline, minutes : 0, seconds : 0, milliseconds : 0})) : true
        const is_impossible_date = impossible_reservation.some((el)=>{
            return el.data === getDay(date)
        })

        if(!is_before_today && is_before_possible_date && today_deadline && !is_impossible_date){
            return true
        }
        else {
            return false
        }
    }

    // =================================================
    // 예약 날짜 검사 //
    function check_reservation_date(){
        for(const el of reservation){
            const checkin = startOfDay(new Date(el.checkin));
            const checkout = startOfDay(new Date(el.checkout));
            if(isSameDay(date, checkin)){
                return 'calendar-checkin-active'
            }
            if(isSameDay(date, checkout)){
                return 'calendar-checkout-active'
            }
            if(isAfter(date, checkin) && isBefore(date, checkout)){
                return 'calendar-reserved-active'
            }
        }
        return null
    }

    // =================================================
    // 준비 기간 검사 //
    function check_preparation_time(){
        for(const el of reservation){
            const final_start = startOfDay(new Date(el.final_start_date));
            const final_end = startOfDay(new Date(el.final_end_date));
            if(isSameDay(date, final_start)){
                return true
            }
            if(isSameDay(date, final_end)){
                return true
            }
        }
        return null
    }

    return(
        <div className = "calendar__main-dates-box not-user-sellect">                                  
            <button className = {`calendar__main-dates-value 
                                ${check_activate_date() && is_saturday ? 'calendar-saturday' : ''}
                                ${check_activate_date() && is_sunday ? 'calendar-sunday' : ''}
                                ${!check_activate_date() || check_reservation_date() || check_preparation_time() ? 'calendar-deactivate' : '' }
                                ${is_valid_date && check_activate_date() ? 'calendar-valid-button' : 'calendar-not-valid-button'} 
                                ${is_valid_date && (checkin_state || checkout_state) ? 'calendar-active-button-style' : ''}`}  
                    data-date = {date}>
                        {is_valid_date ? date.getDate() : ''}
            </button>    
            {check_reservation_date() && !double &&
            <div className={`${check_reservation_date() || ''}`}>
                <span>
                    {check_reservation_date() === 'calendar-checkin-active' ? 'reserved' : ''}
                </span>
            </div>
            }
            {check_preparation_time() && !double && check_activate_date() &&
            <img  
                src={clean_icon}
                className="calendar-preparation-img"/>}
            <div className = {`calendar__main-dates-tile 
                             ${is_valid_date && range_state ? 'calendar__active-background' : ''}
                             ${is_valid_date && checkin_state ? 'calendar__active-width' : ''} 
                             ${is_valid_date && checkout_state ? 'calendar__active-right-width' : ''}`}>
            </div>
        </div>  
    )
})

export default Calendar