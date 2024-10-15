import React, {useState, useRef, useMemo} from "react";
import './calendar.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import default_data from "@/util/default_data/default_data";
import { startOfMonth, startOfWeek, endOfMonth, endOfWeek, eachDayOfInterval, addMonths, getMonth, getYear, isSameDay, isBefore, startOfDay } from "date-fns";
import useMaterialCalendarStyle from "../hook-store/style-hooks/material_calendar_style";
import { state_store, reference_store } from "@/util/function/util_function";

function Calendar({set_checkout_handler, set_checkin_handler, container_width = null, checkin_date, checkout_date}){
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
        return virtual_array.map((el, index) => {
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
    const {click_prev_month,
           click_next_month,
           date_range_style,
           click_date} = useMaterialCalendarStyle(undefined,
                            state_store([
                                {
                                    'is_left_button' : is_left_button,
                                    'setIs_left_button' : setIs_left_button
                                },
                                {
                                    'is_right_button' : is_right_button,
                                    'setIs_right_button' : setIs_right_button
                                }
                            ]),
                            reference_store([
                                {
                                    'header_slider_ref' : header_slider_ref
                                },
                                {
                                    'main_slider_ref' : main_slider_ref
                                },
                                {
                                    'calendar_container_ref' : calendar_container_ref
                                },
                                {
                                    'left_button_ref' : left_button_ref
                                },
                                {
                                    'right_button_ref' : right_button_ref
                                }
                            ]),
                            {
                                'set_checkout_handler' : set_checkout_handler,
                                'set_checkin_handler' : set_checkin_handler,
                                'checkin_date' : checkin_date,
                                'checkout_date' : checkout_date
                            }
                         )

    return(
        <div className = "calendar__container"
             style={{width : container_width ? container_width : '100%'}}>
            {/* header */}
            <div className = "calendar__header"
                 ref={calendar_container_ref}>
                <button className = {`calendar__header-button calendar-left-button 
                            ${!is_left_button ? 'calendar-button-disable' : 'calendar-button-enable'}`} 
                        disabled = {!is_left_button ? true : false} 
                        ref={left_button_ref}
                        onClick = {click_prev_month}>
                    <img src = {default_data.d_imgs.drop_arrow}
                         className = "calendar-left"/>
                </button>                
                <button className = {`calendar__header-button calendar-right-button
                            ${!is_right_button ? 'calendar-button-disable' : 'calendar-button-enable'}`} 
                        disabled = {!is_right_button ? true : false} 
                        ref={right_button_ref}
                        onClick = {click_next_month}>
                    <img src = {default_data.d_imgs.drop_arrow}
                         className = "calendar-right"/>
                </button>
                {/* slide header */}
                <div className="calendar__header-slider"
                     ref={header_slider_ref}>
                    {calendar_array.slice(0, calendar_array.length - 1).map((el, id)=>{
                        return(
                            <div className="calendar_header-slider-container"
                                 key={id}>
                                <div className = "calendar__header-year-month">
                                    {`${calendar_array[id].year}년 ${calendar_array[id].month}월`}
                                </div> 
                                <div className = "calendar__header-year-month">
                                    {`${calendar_array[id + 1].year}년 ${calendar_array[id + 1].month}월`}
                                </div>                                                          
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* main */}
            <div className = "calendar__main">
                {/* 요일 */}
                <div className = "calendar__main-header">
                    <div className = "calendar__main-header-wrapper">
                        {week.map((el,id)=>{
                            return(
                                <div className = "calendar__main-header-box" 
                                    key={id}>
                                        {el}
                                </div>
                            )
                        })}
                    </div>
                    <div className = "calendar__main-header-wrapper">
                        {week.map((el,id)=>{
                            return(
                                <div className = "calendar__main-header-box" 
                                    key={id}>
                                        {el}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* 날짜 */}
                <div className = "calendar__main-dates">
                    {/* slide date */}
                    <div className = "calendar__main-dates-slider"
                         ref={main_slider_ref}>
                        {calendar_array.slice(0,calendar_array.length - 1).map((el, id)=>{
                            return (
                                <div className = "calendar__main-dates-container"
                                     key={id}
                                     onClick={(e) => click_date(e)}>
                                    <div className = "calendar__main-dates-wrapper">
                                        {calendar_array[id].date_array.map((ele, id2)=>{
                                            return(              
                                                <Dates date = {ele}
                                                       month = {calendar_array[id].month}
                                                       is_saturday = {id2 % 7 === 6 ? true : false}
                                                       is_sunday = {id2 % 7 === 0 ? true : false}
                                                       range_state = {date_range_style(ele, checkin_date, checkout_date)}
                                                       checkin_state = {isSameDay(ele, checkin_date)}
                                                       checkout_state = {isSameDay(ele, checkout_date)}
                                                       key= {id2}/>                                    
                                            )
                                        })}
                                    </div>
                                    <div className = "calendar__main-dates-wrapper">
                                        {calendar_array[id + 1].date_array.map((ele, id2)=>{
                                            return(   
                                                <Dates date = {ele}
                                                       month = {calendar_array[id + 1].month}
                                                       is_saturday = {id2 % 7 === 6 ? true : false}
                                                       is_sunday = {id2 % 7 === 0 ? true : false}
                                                       range_state = {date_range_style(ele, checkin_date, checkout_date)}
                                                       checkin_state = {isSameDay(ele, checkin_date)}
                                                       checkout_state = {isSameDay(ele, checkout_date)}
                                                       key= {id2}/>
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
const Dates = React.memo(({date, checkin_state, checkout_state, month, range_state, is_saturday, is_sunday}) => {
    const is_valid_date = (date.getMonth() + 1) === month
    const is_before_state = isBefore(date, startOfDay(new Date()))

    return(
        <div className = "calendar__main-dates-box">                                  
            <button className = {`calendar__main-dates-value 
                                ${!is_before_state && is_saturday ? 'calendar-saturday' : ''}
                                ${!is_before_state && is_sunday ? 'calendar-sunday' : ''}
                                ${is_before_state ? 'calendar-isbefor' : '' }
                                ${is_valid_date && !is_before_state ? 'calendar-valid-button' : 'calendar-not-valid-button'} 
                                ${is_valid_date && (checkin_state || checkout_state) ? 'calendar-active-button-style' : ''}`}  
                    data-date = {date}>
                        {is_valid_date ? date.getDate() : ''}
            </button>    
            <div className = {`calendar__main-dates-tile 
                             ${is_valid_date && range_state ? 'calendar__active-background' : ''}
                             ${is_valid_date && checkin_state ? 'calendar__active-width' : ''} 
                             ${is_valid_date && checkout_state ? 'calendar__active-right-width' : ''}`}>
            </div>
        </div>  
    )
})

export default Calendar