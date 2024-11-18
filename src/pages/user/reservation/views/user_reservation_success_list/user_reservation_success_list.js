import useUserReservationSuccessListBusiness from "../../hook_store/business_hooks/user_reservation_success_list_business"
import Loading from "@/utilComponent/material/loading/loading"
import './user_reservation_success_list.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import useUserReservationSuccessListStyle from "../../hook_store/style_hooks/user_reservation_success_list_style"
import OriginalImg from '@/picture/original_img/original_img';
import { pop_three_texts, transform_date } from "@/util/function/util_function"
import { format } from "date-fns"
import AlertModal from "@/utilComponent/modal/alert_modal/alert_modal";
import ConfirmModal from '@/utilComponent/modal/confirm_modal/confirm_modal'
import { useState, useContext } from "react"
import { state_store } from "@/util/function/util_function";
import { UserContext } from "@/context/user_context/config/user_context"
import default_data from '@/util/default_data/default_data'
import useUserReservationSuccessEvaluationModalBusiness from "../../hook_store/business_hooks/user_reservation_success_evaluation_modal_business"
import useUserReservationSuccessEvaluationModalStyle from "../../hook_store/style_hooks/user_reservation_success_evaluation_modal_style"

function UserReservationSuccessList(){

    // =================================================
    // context state //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // state //
    const [target_accomodation, setTarget_accomodation] = useState(null)
    const [target_reservation, setTarget_reservation] = useState(null)

    // =================================================
    // hooks //
    // business
    const {        
        data, 
        error, 
        isLoading,
        click_box
    } = useUserReservationSuccessListBusiness()
    // style
    const {
        get_list_state,
        modal_toggle
    } = useUserReservationSuccessListStyle(undefined,
        state_store([
            {target_accomodation, setTarget_accomodation},
            {target_reservation, setTarget_reservation}
        ])
    )

    if(isLoading){
        return (
            <Loading></Loading>
        )
    }

    if(error){
        // redirection url
    }

    return (
        <div className="user-reservation-success-list__container">
            <span className="user-reservation-success-list__title">결제 완료 상품</span>     
            <div className="user-reservation-success-list__contents">
                {data.reservation.length ? 
                data.reservation.map((el,id) => {
                    return(
                        <div 
                            className="user-reservation-success-list__item-wraper"
                            key={id}
                            onClick={()=>{modal_toggle('reservation-success-select', el)}}>
                            <div className="user-reservation-success-list__item-contents-wrapper">
                                <div className="user-reservation-success-list__item-img-wrapper">
                                    <OriginalImg url = {el.accomodation.main_img}/>
                                </div>
                                <div className="user-reservation-success-list__item-text">
                                    {el.payment_at ?
                                    <span>{transform_date(new Date(el.payment_at))} 결제</span> :
                                    <span>{transform_date(new Date(el.create_at))} 예약 신청</span>}
                                    <span>{el.accomodation.title}</span>
                                    <span>{pop_three_texts(el.total_price)}원</span>
                                    <p>
                                        <span>체크인</span>
                                        <span>{format(new Date(el.checkin), 'yyyy년 MM월 dd일 HH시 mm분')}</span>
                                    </p>
                                    <p>
                                        <span>체크아웃</span>
                                        <span>{format(new Date(el.checkout), 'yyyy년 MM월 dd일 HH시 mm분')}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="user-reservation-success-list__item-state-wrapper">
                                <div className="user-reservation-success-list__item-state-box">
                                    <div className="user-reservation-success-list__item-state-img">                                            
                                    </div>
                                    <span>{get_list_state(el.reservation_state)}</span>
                                </div>
                            </div>
                        </div>
                    )
                }) :
                <div></div>}
            </div>    

            {/* modal */}
            <AlertModal
                key_name = {'reservation-success-select'}
                title = {target_accomodation?.title}
                modal_toggle = {modal_toggle}>
                <div className="user-reservation-success-list__select-modal-container">
                    <div className="user-reservation-success-list__select-modal-part1">
                        <div className="user-reservation-success-list__select-modal-img-box">
                            <OriginalImg url={target_accomodation?.main_img}/>
                        </div>
                        <span>즐거운 여행이 되셨나요?</span>
                    </div>
                    <div className="user-reservation-success-list__select-modal-part2">
                        <button onClick={()=>{modal_toggle('reservation-success-order-detail')}}>주문 상세</button>
                        <button onClick={()=>{modal_toggle('reservation-success-bill')}}>영수증 조회</button>
                        {!target_reservation?.is_evaluation && <button onClick={()=>{modal_toggle('reservation-success-evaluation')}}>리뷰 작성하기</button>}
                    </div>
                </div>
            </AlertModal>

            {/* 영수증 */}
            <AlertModal
                key_name = {'reservation-success-bill'}
                title = {'온라인 영수증'}
                modal_toggle = {modal_toggle}>
                <div className='reservation-success__bill-modal-container'>
                    <span className='reservation-success__bill-modal-title'>
                        보형짱닷컴
                    </span>
                    <div className='reservation-success__bill-modal-contents'>
                        <div className='reservation-success__bill-modal-item'>
                            <span>구매자명(회원ID)</span>
                            <span>{user_data?.userId}</span>
                        </div>
                        <div className='reservation-success__bill-modal-item'>
                            <span>판매자명(회원ID)</span>
                            <span>{target_reservation?.seller.userId}</span>
                        </div>
                        <div className='reservation-success__bill-modal-item'>
                            <span>거래일시</span>
                            <span>{target_reservation?.payment_at ? format(new Date(target_reservation.payment_at), 'yyyy.MM.dd HH:mm') : '-'}</span>
                        </div>
                        <div className='reservation-success__bill-modal-item'>
                            <span>취소일시</span>
                            <span>{target_reservation?.refund_at ? format(new Date(target_reservation.refund_at), 'yyyy.MM.dd HH:mm') : '-'}</span>
                        </div>
                        <div className='reservation-success__bill-modal-item'>
                            <span>상품명</span>
                            <span>{target_accomodation?.title}</span>
                        </div>
                        <div className='reservation-success__bill-modal-item'>
                            <span>금액</span>
                            <span>
                                {target_reservation?.refund_price ? 
                                `${pop_three_texts(target_reservation.refund_price)}원 환불 완료` :
                                `${pop_three_texts(target_reservation?.total_price)}원`}
                            </span>
                        </div>
                        <div className='reservation-success__bill-modal-item'>
                            <span>결제수단</span>
                            <span>보형짱 닷컴 마일리지</span>
                        </div>
                        <div className='reservation-success__bill-modal-item'>
                            <span>결제 플랫폼</span>
                            <span>보형짱닷컴</span>
                        </div>
                    </div>
                    <div className='reservation-success__bill-modal-footer'>
                        <li>해당 영수증은 거래내역 확인을 위한 용도이며, 회계처리 증빙으로 사용이 불가능 합니다.</li>
                    </div>
                </div>
            </AlertModal>

            {/* 주문 상세 */}
            <AlertModal
                key_name = {'reservation-success-order-detail'}
                title = {'주문 상세'}
                modal_toggle = {modal_toggle}>
                <div className="reservation-success__order-detail-modal-container">
                    <div className="reservation-success__order-detail-modal-fuckyou">
                        <span className="reservation-success__order-detail-modal-title">주문 상품</span>
                        <div className="reservation-success__order-detail-modal-header">
                            <span>{get_list_state(target_reservation?.reservation_state)}</span>
                        </div>
                        <div className="reservation-success__order-detail-modal-part1">
                            <div className="reservation-success__order-detail-modal-part1-img-wrapper">
                                <OriginalImg url={target_accomodation?.main_img}/>
                            </div>
                            <div className="reservation-success__order-detail-modal-part1-contents">
                                <span>{target_accomodation?.title}</span>
                                {target_reservation && <span>체크인 - {format(new Date(target_reservation.checkin), 'yyyy년 MM월 dd일 HH시 mm분')}</span>}
                                {target_reservation && <span>체크아웃 - {format(new Date(target_reservation.checkout), 'yyyy년 MM월 dd일 HH시 mm분')}</span>}
                                <span>{pop_three_texts(target_reservation?.total_price)}원</span>
                            </div>
                        </div>
                        <button className="small-button reservation-success__order-detail-modal-button">재구매</button>
                    </div>
                    <div className="reservation-success__order-detail-modal-part2">
                        <span className="reservation-success__order-detail-modal-title">결제 정보</span>
                        <div className="reservation-success__order-detail-modal-part2-contents">
                            <p>
                                <span>주문금액</span>
                                <span>총 {pop_three_texts(target_reservation?.total_price)}원</span>
                            </p>
                            <p>
                                <span>1일당 숙박료</span>
                                <span>{pop_three_texts(target_reservation?.total_price / target_reservation?.stay_day)}원</span>
                            </p>
                            {target_reservation && target_reservation.reservation_state === 'refund_success' &&
                            <p>
                                <span>환불 금액</span>
                                <span>{pop_three_texts(target_reservation?.refund_price)}원</span>
                            </p>}
                        </div>
                    </div>
                </div>
            </AlertModal>

            {/* 리뷰 모달 */}
            <EvaluationModal
                accomodation = {target_accomodation}
                reservation = {target_reservation}
                modal_toggle={modal_toggle}
                key_name={'reservation-success-evaluation'}>

            </EvaluationModal>
        </div>
    )
}

export default UserReservationSuccessList


function EvaluationModal({modal_toggle, key_name, accomodation, reservation}){

    // =================================================
    // state //
    const [hover, setHover] = useState(()=>{
        const obj = {}
        Array.from({length : 5}).forEach((_, index) => {
            obj[index] = 0
        })
        return obj
    })
    const [rating, setRating] = useState(()=>{
        const obj = {}
        Array.from({length : 5}).forEach((_, index) => {
            obj[index] = 0
        })
        return obj
    })
    const [is_button, setIs_button] = useState(false)

    // =================================================
    // hooks //
    // business
    const {
        register,
        errors,
        isValid,
        watch,
        fetch_evaluation,
        evaluation_mutation
    } = useUserReservationSuccessEvaluationModalBusiness(
        {
            accomodation,
            reservation
        },
        state_store([
            {rating, setRating},
            {is_button, setIs_button}
        ]),
        undefined,
        {
            modal_toggle
        }
    )
    // style
    const {
        click_star,
        hover_star,
        out_star,
        output_rating_text
    } = useUserReservationSuccessEvaluationModalStyle(undefined,
        state_store([
            {hover, setHover},
            {rating, setRating}
        ])
    )

    return (
        evaluation_mutation.isPending ?
        <Loading/> :
        <ConfirmModal
            key_name = {key_name}
            confirm_text = {'등록'}
            button_state = {is_button}
            handle_function = {fetch_evaluation}
            modal_toggle = {modal_toggle}>
            <div className="reservation-success__evaluation-modal-container">
                <span className="reservation-success__evaluation-modal-title">숙소 평가</span>
                <div className="reservation-success__evaluation-modal-check-grade-wrapper">
                    {default_data.d_evaluation.map((el,id)=>{
                        return(
                            <div 
                                className="reservation-success__evaluation-modal-check-grade-item" 
                                key={id}>
                                <div className="reservation-success__evaluation-modal-check-grade-item-img">
                                    <img src={el.url}/>
                                    <span>{el.title}</span>
                                </div>
                                
                                <div className="reservation-success__evaluation-modal-check-grade-star-rating">
                                    {[1,2,3,4,5].map((el, ide) => {
                                        return (
                                            <div
                                                key={ide}
                                                onMouseLeave={()=>{out_star(id)}}
                                                onMouseEnter={()=>{hover_star(el, id)}}
                                                onClick={()=>{click_star(el, id)}}>
                                                <span className={`reservation-success__evaluation-modal-check-grade-star ${el <= Math.max(hover[id], rating[id]) ? 'reservation-success__evaluation-active' : ''}`}>
                                                    ★
                                                </span>
                                            </div>

                                        )
                                    })}
                                </div>

                                <div className="reservation-success__evaluation-modal-check-grade-item-result">
                                    {output_rating_text(id)}
                                </div>
                            </div>
                        )
                    })} 
                </div>
                <span className="reservation-success__evaluation-modal-title">리뷰 쓰기</span>
                {errors.evaluation && <span className="reservation-success__evaluation-modal-error">{errors.evaluation.message}</span>}
                <textarea 
                    className="reservation-success__evaluation-modal-input"
                    {...register('evaluation')}>                
                </textarea>
            </div>
        </ConfirmModal>
    )
}