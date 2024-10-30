import './host_manage_calendar.scss'
import { useState } from 'react';
import Calendar from "@/utilComponent/material/calendar/calendar";
import '@/manage_scss_style/commonness/commonness.scss'
import arrow from '@/assets/icon/arrow-icon.png'
import useHostManageCalendarStyle from '../../hook_store/style_hooks/host_manage_calendar_style';
import {state_store} from '@/util/function/util_function'
import default_data from '@/util/default_data/default_data';

function HostManageCalendar(){

    // =================================================
    // states //
    const [modal_state, setModal_state] = useState(null)    

    const {click_box} = useHostManageCalendarStyle(undefined,
        state_store([
            {modal_state, setModal_state}
        ])
    )

    return (
        <div className="host-manage-calendar__container">
            <div className='host-manage-calendar__calendar-wrapper common-scroll-bar'>
                <div className='host-manage-calendar__calendar'>
                    <Calendar
                        // set_checkin_handler = {setCheckin_date} 
                        // set_checkout_handler = {setCheckout_date}
                        // checkin_date = {checkin_date}
                        // checkout_date = {checkout_date}
                        header_font = {'1.325rem'}
                        double = {false}
                        container_width = {'200%'}/>
                </div>
            </div>
            <div className='host-manage-calendar__input-wrapper common-scroll-bar'>
                <div className='host-manage-calendar__input'>
                    {/* title */}
                    <div className='host-manage-calendar__input-title'>
                        <span className='host-manage-calendar__input-main-title'>설정</span>
                        <span className='host-manage-calendar__input-main-text'>예약 가능일과 숙박 가능일을 설정해 주세요!</span>
                    </div>
                    {/* contents */}
                    <div className='host-manage-calendar__input-contents'>
                        {/* 숙박 가능 일수 설정 */}
                        <div className='host-manage-calendar__input-reservation-date'>
                            <span>숙박 기간</span>
                            {/* 최소 숙박 일수 */}
                            <div className='host-manage-calendar__box-wrapper'>
                                <div 
                                    className='host-manage-calendar__input-min-reservation host-manage-calendar__box not-user-sellect'
                                    onClick={()=>{click_box('min-reservation')}}>
                                    <span>최소 숙박 일수</span>
                                    <span>1</span>                                    
                                </div>
                                <img 
                                    className={`host-manage-calendar__arrow ${modal_state === 'min-reservation' ? 'arrow-active' : undefined}`}
                                    onClick={()=>{click_box('min-reservation')}}
                                    src={arrow}/>
                                <div className={`host-manage-calendar__input-min-reservation-modal host-manage-calendar__modal-box 
                                    ${modal_state === 'min-reservation' ? 'host-manage-calendar__modal-active' : undefined}`}>
                                    <div 
                                        className='host-manage-calendar__modal-hearder'
                                        onClick={()=>{click_box('min-reservation')}}>
                                        <span>최소 숙박 일수</span>
                                        <span>최소 숙박 일수를 지정해 주세요</span>
                                    </div>
                                    <div className='host-manage-calendar__modal-content'>
                                        <input
                                            className='host-manage-calendar__modal-input'/>
                                        <button
                                            className='host-manage-calendar__modal-button button-enable'>
                                            저장하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* 최대 숙박 일수 */}
                            <div className='host-manage-calendar__box-wrapper'>
                                <div 
                                    className='host-manage-calendar__input-max-reservation host-manage-calendar__box not-user-sellect'
                                    onClick={()=>{click_box('max-reservation')}}>
                                    <span>최대 숙박 일수</span>
                                    <span>30</span>                                    
                                </div>
                                <img 
                                    className={`host-manage-calendar__arrow ${modal_state === 'max-reservation' ? 'arrow-active' : undefined}`} 
                                    onClick={()=>{click_box('max-reservation')}}
                                    src={arrow}/>
                                <div className={`host-manage-calendar__input-min-reservation-modal host-manage-calendar__modal-box 
                                    ${modal_state === 'max-reservation' ? 'host-manage-calendar__modal-active' : undefined}`}>
                                    <div 
                                        className='host-manage-calendar__modal-hearder'
                                        onClick={()=>{click_box('max-reservation')}}>
                                        <span>최대 숙박 일수</span>
                                        <span>최대 숙박 일수를 지정해 주세요</span>
                                    </div>
                                    <div className='host-manage-calendar__modal-content'>
                                        <input
                                            className='host-manage-calendar__modal-input'/>
                                        <button
                                            className='host-manage-calendar__modal-button button-enable'>
                                            저장하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 예약 가능일 */}
                        <div className='host-manage-calendar__input-possible-date'>
                            <span>예약 가능일</span>
                            {/* 예약 가능 기간*/}
                            <div className='host-manage-calendar__box-wrapper'>
                                <div 
                                    className='host-manage-calendar__input-before-reservation host-manage-calendar__box not-user-sellect'
                                    onClick={()=>{click_box('before-reservation', true)}}>
                                    <span>예약 가능 기간</span>
                                    <span>1</span>                                    
                                </div>
                                <img 
                                    className={`host-manage-calendar__arrow ${modal_state === 'before-reservation' ? 'arrow-active' : undefined}`}
                                    onClick={()=>{click_box('before-reservation', true)}}
                                    src={arrow}/>
                                <div className={`host-manage-calendar__input-before-reservation-modal host-manage-calendar__modal-box 
                                    ${modal_state === 'before-reservation' ? 'host-manage-calendar__modal-active' : undefined}`}>
                                    <div 
                                        className='host-manage-calendar__modal-hearder'
                                        onClick={()=>{click_box('before-reservation')}}>
                                        <span>예약 가능 기간</span>
                                        <span>게스트가 얼마나 미리 예약할 수 <br/> 있나요?</span>
                                    </div>
                                    <div className='host-manage-calendar__modal-content'>
                                        <div className='host-manage-calendar__modal-select-input common-scroll-bar'>
                                            {default_data.possible_date_structure.map((el,id)=>{
                                                return (
                                                    <div 
                                                        className='host-manage-calendar__select'
                                                        key={id}>     
                                                        <span>{el.name}</span>                                                      
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <button
                                            className='host-manage-calendar__modal-button button-enable'>
                                            저장하기
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 예약 가능일 추가 설정 */}
                            <div className='host-manage-calendar__box-wrapper'>
                                <div 
                                    className='host-manage-calendar__input-possible-reservation host-manage-calendar__box not-user-sellect'
                                    onClick={()=>{click_box('possible-reservation', true)}}>
                                    <span>예약 가능일 추가 설정</span>
                                    <span>예약이 불가능한 날짜를 지정해 주세요!</span>                                    
                                </div>
                                <img 
                                    className={`host-manage-calendar__arrow ${modal_state === 'possible-reservation' ? 'arrow-active' : undefined}`}
                                    onClick={()=>{click_box('possible-reservation', true)}}
                                    src={arrow}/>
                                <div className={`host-manage-calendar__input-possible-reservation-modal host-manage-calendar__modal-box 
                                    ${modal_state === 'possible-reservation' ? 'host-manage-calendar__modal-active' : undefined}`}>
                                    <div 
                                        className='host-manage-calendar__modal-hearder'
                                        onClick={()=>{click_box('possible-reservation')}}>
                                        <span>예약 가능일 추가 설정</span>
                                        <span>게스트는 지정한 요일에 시작하는 숙박을 <br/> 예약할 수 없습니다.</span>
                                    </div>
                                    <div className='host-manage-calendar__modal-content'>
                                        <div className='host-manage-calendar__modal-select-input common-scroll-bar'>
                                            {default_data.possible_reservation.map((el, id)=>{
                                                return (
                                                    <div 
                                                        className='host-manage-calendar__select'
                                                        key={id}>     
                                                        <span>{el.name}</span>                                                  
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <button
                                            className='host-manage-calendar__modal-button button-enable'>
                                            저장하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* 예약 마감 시한 */}
                            <div className='host-manage-calendar__box-wrapper'>
                                <div 
                                    className='host-manage-calendar__input-reservation-deadline host-manage-calendar__box not-user-sellect'
                                    onClick={()=>{click_box('reservation-deadline', true)}}>
                                    <span>예약 마감 시한</span>
                                    <span>1</span>                                    
                                </div>
                                <img 
                                    className={`host-manage-calendar__arrow ${modal_state === 'reservation-deadline' ? 'arrow-active' : undefined}`}
                                    onClick={()=>{click_box('reservation-deadline', true)}}
                                    src={arrow}/>
                                <div className={`host-manage-calendar__input-reservation-deadline-modal host-manage-calendar__modal-box 
                                    ${modal_state === 'reservation-deadline' ? 'host-manage-calendar__modal-active' : undefined}`}>
                                    <div 
                                        className='host-manage-calendar__modal-hearder'
                                        onClick={()=>{click_box('reservation-deadline')}}>
                                        <span>예약 마감 시한</span>
                                        <span>예약 시점과 체크인 사이에 어느 <br/> 정도의 시간 여유가 필요하신가요?</span>
                                    </div>
                                    <div className='host-manage-calendar__modal-content'>
                                        <div className='host-manage-calendar__modal-select-input common-scroll-bar'>
                                            {default_data.reservatio_deadline.map((el, id)=>{
                                                return (
                                                    <div 
                                                        className='host-manage-calendar__select'
                                                        key={id}>
                                                        <span>{el.name}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <button
                                            className='host-manage-calendar__modal-button button-enable'>
                                            저장하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 준비 기간 */}
                            <div className='host-manage-calendar__box-wrapper'>
                                <div 
                                    className='host-manage-calendar__input-preparation-time host-manage-calendar__box not-user-sellect'
                                    onClick={()=>{click_box('preparation-time', true)}}>
                                    <span>준비 기간</span>
                                    <span>1</span>                                    
                                </div>
                                <img 
                                    className={`host-manage-calendar__arrow ${modal_state === 'preparation-time' ? 'arrow-active' : undefined}`}
                                    onClick={()=>{click_box('preparation-time', true)}}
                                    src={arrow}/>
                                <div className={`host-manage-calendar__input-preparation-time-modal host-manage-calendar__modal-box 
                                    ${modal_state === 'preparation-time' ? 'host-manage-calendar__modal-active' : undefined}`}>
                                    <div 
                                        className='host-manage-calendar__modal-hearder'
                                        onClick={()=>{click_box('preparation-time')}}>
                                        <span>준비 기간</span>
                                        <span>예약 전후로 며칠이나 예약을 <br/> 차단하셔야 하나요?</span>
                                    </div>
                                    <div className='host-manage-calendar__modal-content'>
                                        <div className='host-manage-calendar__modal-select-input common-scroll-bar'>
                                            {default_data.before_date.map((el, id)=>{
                                                return (
                                                    <div 
                                                        className='host-manage-calendar__select'
                                                        key={id}>
                                                        <span>{el.name}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <button
                                            className='host-manage-calendar__modal-button button-enable'>
                                            저장하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>    

                        {/* 환불규정, 자동예약 설정 이동 */}
                        <div className='host-manage-calendar__navigate-to-mypage'>
                            <span>환불 규정, 예약 설정</span>
                            <div className='host-manage-calendar__navigate-to-mypage-text'>
                                <span>환불 규정 및 자동, 수동 예약을 설정하시기<br/> 위해서 이곳으로 이동해 주세요!</span>
                            </div>
                            <button className='host-manage-calendar__navigate-to-mypage-button'>이동하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostManageCalendar