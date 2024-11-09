import '@/manage_scss_style/commonness/commonness.scss'
import arrow_icon from '@/assets/icon/arrow-icon.png'
import { format } from 'date-fns'
import './reservation_detail_section1.scss'
import { pop_three_texts } from '@/util/function/util_function'

function ReservationDetailSection1({data, host}){

    return (
        <div className="reservation-detail-section1__container">
            <div className="reservation-detail-section1__title">
                <button className='reservation-detail-section1__title-button'>
                    <img 
                        src={arrow_icon}/>
                </button>
                <span>예약숙소</span>
            </div>

            {/* section1 */}
            <div className="reservation-detail-section1__section1">
                <div className="reservation-detail-section1__section1-title">
                    <span>예약정보</span>
                </div>
                <div className="reservation-detail-section1__section1-content">
                    <div className="reservation-detail-section1__section1-content-checkin">
                        <div className="reservation-detail-section1__section1-content-title">
                            <span>체크인</span>
                            <div className="reservation-detail-section1__section1-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className="reservation-detail-section1__section1-content-text">{format(new Date(data.checkin), 'yyyy년 MM월 dd일 HH시 mm분')}</div>
                    </div>
                    <div className="reservation-detail-section1__section1-content-checkout">
                        <div className="reservation-detail-section1__section1-content-title">
                            <span>체크아웃</span>
                            <div className="reservation-detail-section1__section1-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className="reservation-detail-section1__section1-content-text">{format(new Date(data.checkout), 'yyyy년 MM월 dd일 HH시 mm분')}</div>
                    </div>
                    <div className="reservation-detail-section1__section1-content-guest">
                        <div className="reservation-detail-section1__section1-content-title">
                            <span>게스트</span>
                            <div className="reservation-detail-section1__section1-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className="reservation-detail-section1__section1-content-text">{`게스트 ${data.capacity}명`}</div>
                    </div>
                </div>
            </div>

            {/* section2 */}
            <div className='reservation-detail-section1__section2'>
                <div className="reservation-detail-section1__section2-title">
                    <span>주소</span>
                </div>
                <div className="reservation-detail-section1__section2-content">
                    <div className="reservation-detail-section1__section2-content-main-adress">
                        <div className="reservation-detail-section1__section2-content-title">
                            <span>도로명 주소</span>
                            <div className="reservation-detail-section1__section2-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className="reservation-detail-section1__section2-content-text">{data.accomodation.main_adress.name}</div>
                    </div>
                    <div className="reservation-detail-section1__section2-content-sub-adress">
                        <div className="reservation-detail-section1__section2-content-title">
                            <span>상세 주소</span>
                            <div className="reservation-detail-section1__section2-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className="reservation-detail-section1__section2-content-text">{data.accomodation.sub_adress.name}</div>
                    </div>
                </div>
            </div>

            {/* section3 */}
            <div className='reservation-detail-section1__section3'>
                <div className="reservation-detail-section1__section3-title">
                    <span>이용 규칙</span>
                </div>
                <div className="reservation-detail-section1__section3-content">
                    <div className="reservation-detail-section1__section3-content-rule">
                        <div className="reservation-detail-section1__section3-content-title">
                            <span>숙소 이용규칙</span>
                            <div className="reservation-detail-section1__section3-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className="reservation-detail-section1__section3-content-text">자세히 보기</div>
                    </div>
                    <div className="reservation-detail-section1__section3-content-check">
                        <div className="reservation-detail-section1__section3-content-title">
                            <span>체크인 · 아웃</span>
                            <div className="reservation-detail-section1__section3-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className="reservation-detail-section1__section3-content-text">{data.accomodation.sub_adress.name}</div>
                    </div>
                    <div className="reservation-detail-section1__section3-content-manual">
                        <div className="reservation-detail-section1__section3-content-title">
                            <span>메뉴얼</span>
                            <div className="reservation-detail-section1__section3-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className="reservation-detail-section1__section3-content-text">{data.accomodation.sub_adress.name}</div>
                    </div>
                </div>
            </div>

            {/* section4 */}
            <div className='reservation-detail-section1__section4'>
                <div className="reservation-detail-section1__section4-title">
                    <span>청구서</span>
                </div>
                <div className="reservation-detail-section1__section4-content">
                    <div className="reservation-detail-section1__section4-content-total-price">
                        <div className="reservation-detail-section1__section4-content-title">
                            <span>총 가격</span>
                            <div className="reservation-detail-section1__section4-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className="reservation-detail-section1__section4-content-text">{pop_three_texts(data.total_price)}원</div>
                    </div>
                    <div className="reservation-detail-section1__section4-content-day-price">
                        <div className="reservation-detail-section1__section4-content-title">
                            <span>1박당 가격</span>
                            <div className="reservation-detail-section1__section4-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className="reservation-detail-section1__section4-content-text">{pop_three_texts(data.total_price / data.stay_day)}원</div>
                    </div>
                </div>
            </div>

            {/* section5 */}
            <div className='reservation-detail-section1__section5'>
                <div className="reservation-detail-section1__section5-title">
                    <span>환불 정책</span>
                </div>
                <div className="reservation-detail-section1__section5-content">
                    {host.refund_rule.content.map((el, id) => {
                        return (
                            <p key={id}>
                                <span className='reservation-detail-section1__section5-number'>{id + 1}. </span>
                                <span>{el}</span>
                            </p>
                        )
                    })}
                </div>
            </div>
            
        </div>
    )
}

export default ReservationDetailSection1