import React,{useState, useRef} from "react";
import './section1_payment.scss'
import { pop_three_texts, transform_date, get_discount_price, state_store, reference_store } from "@/util/function/util_function";
import Calendar from "@/utilComponent/material/calendar/calendar";
import useDetailSection1PaymentStyle from "../../../hook_store/style_hooks/detail_section1_payment_style";
import default_data from "@/util/default_data/default_data";

function Section1Payment({data, params, role}){

    // =================================================
    // const //
    const [final_price] = useState(data && data.discount ? 
                            get_discount_price(data.price, data.discount.rate) : data.price
                          )

    // =================================================
    // states //
    const [checkin_date, setCheckin_date] = useState(null)
    const [checkout_date, setCheckout_date] = useState()
    const [pay_day, setPay_day] = useState(null)
    const [capacity, setCapacity] = useState(1)
    const [animal, setAnimal] = useState(0)
    const [calendar_modal, setCalendar_modal] = useState(false)
    const [capacity_modal, setCapacity_modal] = useState(false)
    const [animal_modal, setAnimal_modal] = useState(false)

    // =================================================
    // refs //
    const detail_capacity = useRef(null)
    const detail_animal = useRef(null)
    const calendar_modal_ref = useRef(null)
    const capacity_modal_ref = useRef(null)
    const animal_modal_ref = useRef(null)

    // =================================================
    // hooks //
    // style
    const {click_reservation, click_plus, click_minus, open_calendar,
           open_capacity, close_capacity, open_animal, close_animal,
           delete_calendar, confirm_calendar} = useDetailSection1PaymentStyle(undefined, 
                                                    state_store([
                                                        {
                                                            'checkin_date' : checkin_date,
                                                            'setCheckin_date' : setCheckin_date
                                                        },
                                                        {
                                                            'checkout_date' : checkout_date,
                                                            'setCheckout_date' : setCheckout_date
                                                        },
                                                        {
                                                            'pay_day' : pay_day,
                                                            'setPay_day' : setPay_day
                                                        },
                                                        {
                                                            'capacity' : capacity,
                                                            'setCapacity' : setCapacity
                                                        },
                                                        {
                                                            'animal' : animal,
                                                            'setAnimal' : setAnimal
                                                        },
                                                        {
                                                            'calendar_modal' : calendar_modal,
                                                            'setCalendar_modal' : setCalendar_modal
                                                        },
                                                        {
                                                            'capacity_modal' : capacity_modal,
                                                            'setCapacity_modal' : setCapacity_modal
                                                        },
                                                        {
                                                            'animal_modal' : animal_modal,
                                                            'setAnimal_modal' : setAnimal_modal
                                                        }
                                                    ]),
                                                    reference_store([
                                                        {
                                                            'detail_capacity' : detail_capacity
                                                        },
                                                        {
                                                            'detail_animal' : detail_animal
                                                        },
                                                        {
                                                            'calendar_modal_ref' : calendar_modal_ref
                                                        },
                                                        {
                                                            'capacity_modal_ref' : capacity_modal_ref
                                                        },
                                                        {
                                                            'animal_modal_ref' : animal_modal_ref
                                                        }
                                                    ]),
                                                    {
                                                        'params' : params
                                                    }
                                                )

    if(data){
        return(
            <div className="section1-payment__container">
                {/* header */}
                <div className="section1-payment__header">   
                    {data.discount &&
                    <span className="section1-payment__header-discount">
                        {data.discount.date.name} {data.discount.date.name.includes('이상') ? '예약 시' : ''}
                    </span>}     
                    <div>
                        <span className="section1-payment__header-price">
                            {pop_three_texts(final_price)}
                        </span>
                        <span className="section1-payment__header-text2">
                            원
                        </span>
                        {data.discount && 
                        <span className="section1-payment__header-original-price">{pop_three_texts(data.price)}원</span>}
                    </div>          
                </div>
                {/* section1 */}
                <div className="section1-payment__section1">
                    <div className = {`section1-payment__section1-box-wrapper
                                      ${calendar_modal ? 'section1-payment__section1-box-wrapper-active' : ''}`}>
                        <div onClick={open_calendar}
                             className = {`section1-payment__section1-check not-user-sellect
                                        ${calendar_modal ? 'section1-payment__checkin-active' : ''}`}>
                            <span>체크인</span>
                            <span>{checkin_date ? transform_date(checkin_date) : '날짜 추가'}</span>
                        </div>
                        <div onClick={open_calendar}
                            className = {`section1-payment__section1-check not-user-sellect
                                        ${calendar_modal ? 'section1-payment__checkout-active' : ''}`}>
                            <span>체크아웃</span>
                            <span>{checkout_date ? transform_date(checkout_date) : '날짜 추가'}</span>
                        </div>
                    </div>
                    <div className="section1-payment__section1-capacity"
                         onClick={open_capacity}>
                        <span>인원</span>
                        <span>게스트 {capacity}명</span>
                    </div>
                    <div className="section1-payment__section1-animal"
                         onClick={open_animal}>
                        <span>애완동물</span>
                        <span>애완동물 {animal}마리</span>                    
                    </div>

                    {/* animal modal */}
                    {animal_modal &&
                    <div className="section1-payment__animal-modal box-shadow-lv1">
                        <div className="section1-payment__animal-modal-container">
                            <span>반려동물</span>
                            <div>
                                <button className = {`${animal ? 'small-button' : 'small-button-disabled'}`}
                                        disabled = {animal ? false : true}
                                        onClick = {()=>{click_minus(setAnimal, animal)}}>
                                    <img src = {default_data.d_imgs.minus}/>
                                </button>
                                <span>{animal}</span>
                                <button className = {`${animal === data.rules[0].count ? 'small-button-disabled' : 'small-button'}`}
                                        disabled = {animal === data.rules[0].count ? true : false}
                                        onClick = {()=>{click_plus(setAnimal, animal)}}>
                                    <img src = {default_data.d_imgs.plus}/>
                                </button>
                            </div>
                        </div>
                        <div>
                            <span>{data.rules[0].count ? `반려동물 동반은 ${data.rules[0].count}마리까지 허용됩니다.` : '반려동물 동반은 허용되지 않습니다.'}</span>
                        </div>
                        <div className="section1-payment__animal-modal-footer">
                            <button className="small-button"
                                    onClick={close_animal}>
                                닫기
                            </button>
                        </div>
                        
                    </div>}                        
                    {/* capacity modal */}
                    {capacity_modal &&
                    <div className="section1-payment__capacity-modal box-shadow-lv1">
                        <div className="section1-payment__capacity-modal-container">
                            <span>인원</span>
                            <div>
                                <button className = {`${capacity === 0 ? 'small-button-disabled' : 'small-button'}`}
                                        disabled = {capacity === 0 ? true : false}
                                        onClick = {()=>{click_minus(setCapacity, capacity)}}>
                                    <img src = {default_data.d_imgs.minus}/>
                                </button>
                                <span>{capacity}</span>
                                <button className = {`${capacity === data.capacity ? 'small-button-disabled' : 'small-button'}`}
                                        disabled = {capacity === data.capacity ? true : false}
                                        onClick = {()=>{click_plus(setCapacity, capacity)}}>
                                    <img src = {default_data.d_imgs.plus}/>
                                </button>
                            </div>
                        </div>
                        <div>
                            <span>최대 숙박 인원은 {data.capacity}명 입니다.</span>
                            <span>추가 인원 가격은 {pop_three_texts(data.addPrice)}원 입니다.</span>
                        </div>
                        <div className="section1-payment__capacity-modal-footer">
                            <button className="small-button"
                                    onClick={close_capacity}>
                                닫기
                            </button>
                        </div>
                    </div>}
                    {/* calendar modal */}
                    {calendar_modal && 
                    <div className="section1-payment__calendar-modal box-shadow-lv1"
                         ref={calendar_modal_ref}>
                        <div className="section1-payment__calendar-modal-header">
                            <div className="section1-payment__calendar-modal-price-box">
                                <div>
                                    <span>기본 요금</span>
                                    <span>{pop_three_texts(data.price)}원</span>
                                </div>
                                <div>
                                    <span>추가 인원 요금</span>
                                    <span>{pop_three_texts(data.addPrice)}원</span>
                                </div>
                            </div>
                        </div>
                        <Calendar set_checkin_handler = {setCheckin_date} 
                                  set_checkout_handler = {setCheckout_date}
                                  checkin_date = {checkin_date}
                                  checkout_date = {checkout_date}
                                  container_width = {'100%'}/>
                        <div className="section1-payment__calendar-modal-footer">
                            <button className = 'small-button'
                                    onClick={delete_calendar}>
                                날짜 지우기
                            </button>
                            <button  className = {`small-button`}
                                     onClick={confirm_calendar}>
                                닫기
                            </button>
                        </div>
                    </div>}
                </div>
                {/* section2 */}
                <div className="section1-payment__section2">
                    <button className={`section1-payment__section2-button ${checkin_date && checkout_date && capacity ? 'button-enable' : 'button-disable'}`}
                            disabled={checkin_date && checkout_date && capacity ? false : true}>
                                예약하기
                    </button>
                    <span>예약 확정 전에는 요금이 청구되지 않습니다</span>
                </div>
                {/* section3 */}
                <div className="section1-payment__section3">
                    <div>
                        <span>{pay_day && capacity ? 
                              `₩${pop_three_texts(final_price)} X ${pay_day}박`  : ''}
                        </span>
                        <span>{pay_day && capacity ? 
                              `${pop_three_texts(final_price * pay_day)}원`  : ''}
                        </span>
                    </div>
                    <div>
                        <span>{pay_day && capacity > 1 ? 
                              `₩${pop_three_texts(data.addPrice)} X 추가 ${capacity - 1}명 X ${pay_day}박`  : ''}
                        </span>
                        <span>{pay_day && capacity > 1 ? 
                              `${pop_three_texts(data.addPrice * (capacity - 1) * pay_day)}원`  : ''}
                        </span>
                    </div>
                </div>

                {/* result */}
                <div className="section1-payment__result">
                    <span>총 합계</span>
                    <span>{pay_day && capacity ? 
                          `${pop_three_texts(final_price * pay_day + data.addPrice * (capacity - 1) * pay_day)}원`  : ''}
                    </span>
                </div>
            </div>
        )
    }
}

export default Section1Payment