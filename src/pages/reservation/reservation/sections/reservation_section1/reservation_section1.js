import './reservation_section1.scss'
import OriginalImg from '@/picture/original_img/original_img'
import { useSearchParams } from 'react-router-dom'
import { differenceInDays } from 'date-fns'
import { pop_three_texts } from '@/util/function/util_function'
import { useState } from 'react'
import '@/manage_scss_style/commonness/commonness.scss'
import ReservationTerms from './reservation_terms/reservation_terms';

function ReservationSection1({data}){

    // =================================================
    // states //
    const [is_button, setIs_button] = useState(false)

    // =================================================
    // query data //
    const [search_params] = useSearchParams()

    // =================================================
    // const //
    const [pay_day] = useState(differenceInDays(new Date(search_params.get('checkout')), new Date(search_params.get('checkin'))))
    const [capacity] = useState(Number(search_params.get('capacity')))
    const [add_capacity] = useState(capacity > 1 ? capacity - 1 : 0)

    return(
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
                        <span>{pay_day}일</span>
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
                        {data && <span>
                            {data.discount && pay_day >= data.discount.date.date ? 
                            pop_three_texts((data?.price + (capacity - 1) * data?.addPrice) * pay_day * (100 - data?.discount.rate) / 100) + '원' :
                            pop_three_texts((data.price + add_capacity * data.addPrice) * pay_day) + '원'}
                        </span>}
                    </div>
                </div>

                <ReservationTerms
                    setIs_button = {setIs_button}/>
                <button 
                    className={`reservation-section1__section3-button ${is_button ? 'button-enable' : 'button-disable'}`}
                    disabled = {is_button ? false : true}>
                        결제하기
                </button>
            </div>
        </div>
    )
}

export default ReservationSection1