import './reservation_section2.scss'
import { useSearchParams } from "react-router-dom";
import { useState } from 'react'
import '@/manage_scss_style/commonness/commonness.scss'
import arrow_icon from '@/assets/icon/arrow-icon.png'
import { format, differenceInDays } from 'date-fns';
import point_icon from '@/assets/icon/point-icon.png'
import useReservationSection2Business from '../../hook_store/business_hooks/reservation_section2_business';
import { pop_three_texts } from '@/util/function/util_function';

function ReservationSection2 ({data, user}){    

    // =================================================
    // query data //
    const [search_params] = useSearchParams()

    // =================================================
    // const //
    const [stay_day] = useState(differenceInDays(new Date(search_params.get('checkout')), new Date(search_params.get('checkin'))))
    const [capacity] = useState(Number(search_params.get('capacity')))
    const [add_capacity] = useState(capacity > 1 ? capacity - 1 : 0)
    const [checkin] = useState(format(new Date(search_params.get('checkin')), 'yyyy년 MM월 dd일'))
    const [checkout] = useState(format(new Date(search_params.get('checkout')), 'yyyy년 MM월 dd일'))
    const [host] = useState(data.seller.host_text)

    // =================================================
    // states //
    const [reservation_method, setReservation_method] = useState('point')

    // =================================================
    // hooks //
    // business
    const {
        fetch_reservation,
        click_prev
    } = useReservationSection2Business()


    return(
        <div className="reservation-section2__container">
            <div className="reservation-section2__title">
                <button className='reservation-section2__title-button'>
                    <img 
                        src={arrow_icon}
                        onClick={click_prev}/>
                </button>
                <span>예약요청</span>
            </div>

            {/* section1 */}
            <div className="reservation-section2__section1">
                <div className="reservation-section2__section1-title">
                    <span>예약정보</span>
                </div>
                <div className="reservation-section2__section1-content">
                    <div className="reservation-section2__section1-content-checkin">
                        <div className="reservation-section2__section1-content-title">
                            <span>체크인</span>
                            <div className="reservation-section2__section1-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className="reservation-section2__section1-content-text">{checkin}</div>
                    </div>
                    <div className="reservation-section2__section1-content-checkout">
                        <div className="reservation-section2__section1-content-title">
                            <span>체크아웃</span>
                            <div className="reservation-section2__section1-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className="reservation-section2__section1-content-text">{checkout}</div>
                    </div>
                    <div className="reservation-section2__section1-content-guest">
                        <div className="reservation-section2__section1-content-title">
                            <span>게스트</span>
                            <div className="reservation-section2__section1-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className="reservation-section2__section1-content-text">{`게스트 ${capacity}명`}</div>
                    </div>
                </div>
            </div>

            {/* section2 */}
            <div className='reservation-section2__section2'>
                <div className="reservation-section2__section2-title">
                        <span>예약자 정보</span>
                    </div>
                <div className="reservation-section2__section2-content">
                    <div>
                        <div className='reservation-section2__section2-content-title'>
                            <span>예약자 이름</span>
                            <div className="reservation-section2__section2-content-box">
                                <div></div>
                            </div>
                        </div>
                        <span className='reservation-section2__section2-content-text'>{user?.name}</span>
                    </div>
                    <div>
                        <span className='reservation-section2__section2-content-title'>
                            <span>예약자 이메일</span>
                                <div className="reservation-section2__section2-content-box">
                                    <div></div>
                                </div>
                            </span>
                        <span className='reservation-section2__section2-content-text'>{user?.email}</span>
                    </div>
                    <span className='reservation-section2__section2-content-alert'>안전한 서비스를 위해 예약자 정보는 가입시 기입한 정보가 제공됩니다.</span>
                </div>
            </div>

            {/* section3 */}
            <div className='reservation-section2__section3'>
                <div className="reservation-section2__section3-title">
                        <span>할인 적용</span>
                    </div>
                <div className="reservation-section2__section3-content">
                    {data.discount && stay_day >= data.discount.date.date ?
                    // 할인 적용
                    <div className='reservation-section2__section3-content-onprice'>
                        <div className='reservation-section2__section3-content-title'>
                            <span>{data.discount.date.name} {data.discount.rate}% 할인 적용</span>
                            <div className="reservation-section2__section3-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className='reservation-section2__section3-content-text'>
                            <span>{pop_three_texts((data?.price + (capacity - 1) * data?.addPrice) * stay_day * (100 - data?.discount.rate) / 100)}원</span>
                            <span>{pop_three_texts((data?.price + (capacity - 1) * data?.addPrice) * stay_day)}원</span>
                        </div>
                    </div> : 
                    // 할인 미적용
                    <div>
                        <span className='reservation-section2__section3-content-alert'>
                            {data.discount ? `해당 숙소는 ${data.discount.date.name} 예약시 ${data.discount.rate}% 할인이 적용 가능 합니다.` : '해당 숙소는 할인 적용이 되지 않는 숙소입니다.'}
                        </span>
                    </div>}
                </div>
            </div>

            {/* section4 */}
            <div className='reservation-section2__section4'>
                <div className="reservation-section2__section4-title">
                        <span>결제 수단</span>
                    </div>
                <div className="reservation-section2__section4-content">
                    {/* 게스트 결제 방법 */}
                    <div className='reservation-section2__section4-content-method'>
                        <button className={`reservation-section2__section4-content-button ${reservation_method === 'point' ? 'reservation-section2__button-active' : undefined}`}>
                            <img src = {point_icon}/>
                            point
                        </button> 
                    </div>
                    {/* 호스트 결제 수락 방법 */}
                    <div className='reservation-section2__section4-content-host-method'>
                        <span>예약 수락</span>
                        <p>
                            {host.reservation_rule ? 
                            '호스트가 자동예약 서비스를 등록한 상품입니다. 예약신청과 동시에 예약이 확정됩니다.' :
                            '호스트가 48시간 이내 예약 요청을 수락하기 전까지는 예약이 아직 확정된 것이 아닙니다. 예약 확정 전까지는 요금이 청구되지 않습니다.'}                            
                        </p>
                    </div>
                </div>
            </div>

            {/* section5 */}
            <div className='reservation-section2__section5'>
                <div className="reservation-section2__section5-title">
                        <span>환불 정책</span>
                    </div>
                <div className="reservation-section2__section5-content">
                    {host.refund_rule.content.map((el, id) => {
                        return (
                            <p key={id}>
                                <span className='reservation-section2__section5-number'>{id + 1}. </span>
                                <span>{el}</span>
                            </p>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default ReservationSection2