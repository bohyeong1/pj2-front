import './reservation_section1.scss'
import OriginalImg from '@/picture/original_img/original_img'
import { useSearchParams } from 'react-router-dom'
import { differenceInDays } from 'date-fns'
import { pop_three_texts } from '@/util/function/util_function'
import { useState } from 'react'
import '@/manage_scss_style/commonness/commonness.scss'
import ReservationTerms from './reservation_terms/reservation_terms';
import useReservationSection1Business from '../../hook_store/business_hooks/reservation_section1_business'
import Loading from "@/utilComponent/material/loading/loading";
import {state_store} from '@/util/function/util_function'
import AlertModal from "@/utilComponent/modal/alert_modal/alert_modal";

function ReservationSection1({data}){

    // =================================================
    // states //
    const [is_button, setIs_button] = useState(false)
    const [loading, setLoading] = useState(true)

    // =================================================
    // query data //
    const [search_params] = useSearchParams()

    // =================================================
    // const //
    const [check_in] = useState(new Date(search_params.get('checkin')))
    const [check_out] = useState(new Date(search_params.get('checkout')))
    const [stay_day] = useState(differenceInDays(check_out, check_in))
    const [capacity] = useState(Number(search_params.get('capacity')))
    const [add_capacity] = useState(capacity > 1 ? capacity - 1 : 0)
    const [total_price] = useState(
        data && data.discount && stay_day >= data.discount.date.date ? 
        (data.price + (capacity - 1) * data.addPrice) * stay_day * (100 - data.discount.rate) / 100 : 
        (data.price + add_capacity * data.addPrice) * stay_day
    )

    // =================================================
    // hooks //
    // business
    const {
        fetch_reservation,
        modal_toggle
    } = useReservationSection1Business(
        {
            check_in,
            check_out,
            stay_day,
            capacity,
            total_price
        },
        state_store([
            {loading, setLoading},
            {is_button, setIs_button}
        ])
    )

    return(
        loading === false ? <Loading></Loading> :
        <div className="reservation-section1__container">
            {/* img */}
            <div className="reservation-section1__section1">
                <div className="reservation-section1__section1-part1">
                    <OriginalImg
                        url = {data?.main_img}/>
                </div>
                <div className="reservation-section1__section1-part2">
                    <div className="reservation-section1__section1-part2-text1">
                        <span>{data?.title}</span>
                    </div>
                    <div className="reservation-section1__section1-part2-text2">
                        <span>{data?.category.name}</span>
                    </div>
                    <div className="reservation-section1__section1-part2-text3">
                        <span>{data?.main_adress.name}</span>
                    </div>
                    <div className="reservation-section1__section1-part2-text4">
                        <span>{`${capacity}명 예약`}</span>
                    </div>
                </div>
            </div>

            {/* information */}
            <div className="reservation-section1__section2">
                <div className="reservation-section1__section2-part1">
                    <div className='reservation-section1__section2-part2-box-wrapper'>
                        <div className='reservation-section1__section2-part1-box'>
                            <span>기본 가격</span>
                            <span>{pop_three_texts(data?.price)}원</span>
                        </div>
                        <div className='reservation-section1__section2-part1-box'>
                            <span>추가 인원 가격</span>
                            <span>{pop_three_texts(data?.addPrice)}원</span>
                        </div>
                    </div>
                    <div className='reservation-section1__section2-part1-box reservation-section1__bottom-style'>
                        <span>추가 인원</span>
                        <span>{add_capacity}명</span>
                    </div>
                    <div className='reservation-section1__section2-part1-box'>
                        <span>숙박 일수</span>
                        <span>{stay_day}일</span>
                    </div>
                </div>
            </div>

            {/* result */}
            <div className="reservation-section1__section3">
                <div className='reservation-section1__section3-wrapper'>
                    <div className="reservation-section1__section3-part1">
                        <span>총 합계</span>
                    </div>
                    <div className="reservation-section1__section3-part2">
                        {total_price && <span>
                            {pop_three_texts(total_price) + '원'}
                        </span>}
                    </div>
                </div>

                <ReservationTerms
                    setIs_button = {setIs_button}/>
                <button 
                    className={`reservation-section1__section3-button ${is_button ? 'button-enable' : 'button-disable'}`}
                    onClick={fetch_reservation}
                    disabled = {is_button ? false : true}>
                        결제하기
                </button>
            </div>

            {/* modal */}
            <AlertModal
                key_name = {'reservation-cash-false'}
                title = {'예약 실패'}
                modal_toggle = {modal_toggle}>
                <div className='reservation-section1__cash-false-modal-container'>
                    <span className='reservation-section1__cash-false-title'>예약하기 위한 마일리지가 부족합니다.</span>
                    <p>
                        <span>현재 마일리지</span>
                        <span>{pop_three_texts(data.seller.cashInv)}원</span>
                    </p>
                    <p>
                        <span>부족한 마일리지</span>
                        <span className='reservation-section1__cash-false-value'>{pop_three_texts(total_price - data.seller.cashInv)}원</span>
                    </p>

                </div>
            </AlertModal>
        </div>
    )
}

export default ReservationSection1