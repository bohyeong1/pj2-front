import '@/manage_scss_style/commonness/commonness.scss'
import arrow_icon from '@/assets/icon/arrow-icon.png'
import { format } from 'date-fns'
import { useContext } from 'react'
import './reservation_detail_section1.scss'
import { pop_three_texts } from '@/util/function/util_function'
import useReservationDetailSection1Style from '../../hook_store/style_hooks/reservation_detail_section1_style'
import AlertModal from "@/utilComponent/modal/alert_modal/alert_modal";
import { UserContext } from "@/context/user_context/config/user_context"
import bus_icon from '@/assets/icon/bus-icon.png'
import subway_icon from '@/assets/icon/subway-icon.png'

function ReservationDetailSection1({data, host}){
    console.log(data)
    // =================================================
    // context state //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // hooks //
    // style
    const {
        get_rule_text,
        modal_toggle,
        click_prev_url
    } = useReservationDetailSection1Style()

    return (
        <div className="reservation-detail-section1__container">
            <div className="reservation-detail-section1__title">
                <button 
                    className='reservation-detail-section1__title-button'
                    onClick={click_prev_url}>
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
                    <button 
                        className='reservation-detail-section1__section4-content-detail-button small-button'
                        onClick={()=>{modal_toggle('reservation-detail-map')}}>
                            지도 보기
                    </button>
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
                        <div className="reservation-detail-section1__section3-content-text reservation-detail-section1__section3-content-padding-bottom">
                            {data.accomodation.rules.map((el, id)=> {
                                return (
                                    <li 
                                        key={id}
                                        style={{color : id === data.accomodation.rules.length - 1 ? '#C13515' : undefined}}>
                                        {get_rule_text(el)}
                                    </li>
                                )
                            })}
                            <button 
                                className='reservation-detail-section1__section3-content-detail-button small-button'
                                onClick={()=>{modal_toggle('reservation-detail-add-rule')}}
                                >
                                자세히 보기
                            </button>
                        </div>
                    </div>
                    <div className="reservation-detail-section1__section3-content-check">
                        <div className="reservation-detail-section1__section3-content-title">
                            <span>체크인 · 아웃 방법</span>
                            <div className="reservation-detail-section1__section3-content-box">
                                <div></div>
                            </div>
                        </div>
                        <div className="reservation-detail-section1__section3-content-text">
                           <div>
                                <li>체크인 방법</li>
                                {data.accomodation.check_method.check_in ? 
                                <p className='reservation-detail-section1__section3-check-method-box'>
                                    <span>{data.accomodation.check_method.check_in.name}</span>
                                    <span>{data.accomodation.check_method.check_in.text}</span>
                                </p> : 
                                <span className='reservation-detail-section1__section3-check-method-box'>메세지를 통해 호스트에게 체크인 방법을 요청하세요</span>}
                           </div>
                           <div>
                                <li>체크아웃 방법</li>
                                {data.accomodation.check_method.check_out.length ? 
                                <div className='reservation-detail-section1__section3-check-method-box-wrapper'>
                                    {data.accomodation.check_method.check_out.map((el, id) => {
                                        return (
                                            <p 
                                                key={id}
                                                className='reservation-detail-section1__section3-check-method-box'>
                                                <span>{el.name}</span>
                                                <span>{el.text}</span>
                                            </p>
                                        )
                                    })}
                                </div> : 
                                <span className='reservation-detail-section1__section3-check-method-box'>메세지를 통해 호스트에게 체크아웃 방법을 요청하세요</span>}
                           </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* section4 */}
            <div className='reservation-detail-section1__section4'>
                <div className="reservation-detail-section1__section4-title">
                    <span>영수증</span>
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
                    <button 
                        className='reservation-detail-section1__section4-content-detail-button small-button'
                        onClick={()=>{modal_toggle('reservation-detail-bill')}}>
                        영수증 보기
                    </button>
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

            {/* modal */}
            {/* 숙소 이용규칙 모달 */}
            <AlertModal
                key_name = {'reservation-detail-add-rule'}
                title = {'이용규칙 추가 확인사항'}
                modal_toggle = {modal_toggle}>
                <div className='reservation-detail-section1__add-rule-modal-container'>
                    {data.accomodation.rules[4].state &&
                    <div className='reservation-detail-section1__add-rule-modal-item'>
                        <span>추가 규칙</span>
                        <pre>{data.accomodation.rules[4].summary}</pre>
                    </div>}
                    {data.accomodation.manual &&
                    <div className='reservation-detail-section1__add-rule-modal-item'>
                        <span>숙소 이용 메뉴얼</span>
                        <pre>{data.accomodation.manual}</pre>
                    </div>}
                    {data.accomodation.comunication &&
                    <div className='reservation-detail-section1__add-rule-modal-item'>
                        <span>체크인 시 호스트와의 커뮤니케이션</span>
                        <pre>{data.accomodation.comunication.name}</pre>
                    </div>}
                    {data.accomodation.wifi_information &&
                    <div className='reservation-detail-section1__add-rule-modal-item'>
                        <span>와이파이 정보</span>
                        <div>
                            <p>
                                <span>ID</span>
                                <span>{data.accomodation.wifi_information.id}</span>
                            </p>
                            <p>
                                <span>PASSWORD</span>
                                <span>{data.accomodation.wifi_information.password}</span>
                            </p>
                        </div>
                    </div>}
                    {!data.accomodation.wifi_information && !data.accomodation.comunication && !data.accomodation.comunication && !data.accomodation.manual && !data.accomodation.rules[4].state &&
                    <div className='reservation-detail-section1__add-rule-modal-item'>
                        <span>호스트가 추가적으로 숙소에 대한 규칙을 설정하지 않으셨습니다. 메세지를 통해 호스트와의 대화를 나눈 후 숙소에 대한 정보를 제공받으세요.</span>
                    </div>
                    }
                </div>
            </AlertModal>

            {/* 영수증 */}
            <AlertModal
                key_name = {'reservation-detail-bill'}
                title = {'온라인 영수증'}
                modal_toggle = {modal_toggle}>
                <div className='reservation-detail-section1__bill-modal-container'>
                    <span className='reservation-detail-section1__bill-modal-title'>
                        보형짱닷컴
                    </span>
                    <div className='reservation-detail-section1__bill-modal-contents'>
                        <div className='reservation-detail-section1__bill-modal-item'>
                            <span>구매자명(회원ID)</span>
                            <span>{user_data?.userId}</span>
                        </div>
                        <div className='reservation-detail-section1__bill-modal-item'>
                            <span>판매자명(회원ID)</span>
                            <span>{data.seller.userId}</span>
                        </div>
                        <div className='reservation-detail-section1__bill-modal-item'>
                            <span>거래일시</span>
                            <span>{data.payment_at ? format(new Date(data.payment_at), 'yyyy.MM.dd HH:mm') : '-'}</span>
                        </div>
                        <div className='reservation-detail-section1__bill-modal-item'>
                            <span>취소일시</span>
                            <span>{data.refund_at ? format(new Date(data.refund_at), 'yyyy.MM.dd HH:mm') : '-'}</span>
                        </div>
                        <div className='reservation-detail-section1__bill-modal-item'>
                            <span>상품명</span>
                            <span>{data.accomodation.title}</span>
                        </div>
                        <div className='reservation-detail-section1__bill-modal-item'>
                            <span>금액</span>
                            <span>{pop_three_texts(data.total_price)}원</span>
                        </div>
                        <div className='reservation-detail-section1__bill-modal-item'>
                            <span>결제수단</span>
                            <span>보형짱 닷컴 마일리지</span>
                        </div>
                        <div className='reservation-detail-section1__bill-modal-item'>
                            <span>결제 플랫폼</span>
                            <span>보형짱닷컴</span>
                        </div>
                    </div>
                    <div className='reservation-detail-section1__bill-modal-footer'>
                        <li>해당 영수증은 거래내역 확인을 위한 용도이며, 회계처리 증빙으로 사용이 불가능 합니다.</li>
                    </div>
                </div>
            </AlertModal>

            {/* 지도 */}
            <AlertModal
                width = {'80%'}
                key_name = {'reservation-detail-map'}
                title = {'찾아 오시는 길'}
                modal_toggle = {modal_toggle}>
                <div className='reservation-detail-section1__map-modal-container'>
                    <div className='reservation-detail-section1__map-modal-section1 common-scroll-bar'>
                        <div className='reservation-detail-section1__map-modal-section1-item reservation-detail-section1__map-modal-section1-item-bottom'>
                            <p>
                                <span>도로명 주소</span>
                                <span className='reservation-detail-section1__map-modal-section1-item-value'>{data.accomodation.main_adress.name}</span>
                            </p>
                            <p>
                                <span>상세 주소</span>
                                <span className='reservation-detail-section1__map-modal-section1-item-value'>{data.accomodation.sub_adress.name}</span>
                            </p>
                        </div>
                        <div className='reservation-detail-section1__map-modal-section1-item reservation-detail-section1__map-modal-section1-item-bottom'>      
                            <p>
                                <span>이동 수단</span>
                                {data.navigation_date.length ? 
                                <div>
                                    {data.navigation_date.map((el, id) => {
                                        return (
                                            <div className='reservation-detail-section1__map-modal-navigation-wrapper'>
                                                <p className='reservation-detail-section1__map-modal-section1-item-value'>
                                                    <img src={el.name.includes('터미널') ? bus_icon : subway_icon}/>
                                                    <span>{el.name}</span>
                                                </p>
                                                <p>
                                                    <span>이동 거리 · 약 {Math.round((el.distance / 1000) * 10) / 10}Km</span>
                                                    <span>이동 시간 · 약 {Math.round(el.duration / 60)}분</span>
                                                    <span>택시 이용 시 요금 · {pop_three_texts(el.fare.taxi)}원 소요</span>
                                                </p>
                                            </div>

                                        )
                                    })}
                                </div> : 
                                <span className='reservation-detail-section1__map-modal-section1-item-value'>
                                    1.5km내에 지하철이나 터미널이 존재하지 않는 곳에 숙소가 위치하고 있습니다. 호스트와의 메세지를 통해 정보를 제공받으세요.
                                </span>}
                            </p>                            
                        </div>
                        <div className='reservation-detail-section1__map-modal-section1-item'>
                            <p>
                                <span>커뮤니케이션</span>
                                <span className='reservation-detail-section1__map-modal-section1-item-pre'>
                                    {data.accomodation.custom_navigation ? 
                                    data.accomodation.custom_navigation :
                                    '호스트가 숙소를 찾아오는 방법에 대해서 설정하지 않으셨습니다. 메세지를 통해 숙소를 찾아오는 방법에 대해 자세히 물어보세요!'}
                                </span>
                            </p>
                        </div>

                    </div>
                    <div className='reservation-detail-section1__map-modal-section2'>

                    </div>
                </div>
            </AlertModal>
        </div>
    )
}

export default ReservationDetailSection1