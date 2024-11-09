import useUserReservationPendingList from "../../hook_store/business_hooks/user_reservation_pending_list_business"
import Loading from "@/utilComponent/material/loading/loading"
import './user_reservation_pending_list.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import useUserReservationPendingListStyle from "../../hook_store/style_hooks/user_reservation_pending_list_style"
import OriginalImg from '@/picture/original_img/original_img';
import { pop_three_texts, transform_date } from "@/util/function/util_function"
import { format } from "date-fns"

function UserReservationPendingList(){
    // =================================================
    // hooks //
    // business
    const {        
        data, 
        error, 
        isLoading,
        click_box
    } = useUserReservationPendingList()
    // style
    const {
        get_list_style,
        get_list_state
    } = useUserReservationPendingListStyle()

    if(isLoading){
        return (
            <Loading></Loading>
        )
    }

    if(error){
        // redirection url
    }
    console.log(data)
    return (
        <div className="user-reseration-pending-list__container">
            <span className="user-reservation-pending-list__title">예약 목록</span>     
            <div className="user-reservation-pending-list__contents">
                {data.reservation.length ? 
                data.reservation.map((el,id) => {
                    return(
                        <div 
                            className="user-reservation-pending-list__item-wraper"
                            key={id}
                            onClick={()=>{click_box(el)}}>
                            <div className="user-reservation-pending-list__item-contents-wrapper">
                                <div className="user-reservation-pending-list__item-img-wrapper">
                                    <OriginalImg url = {el.accomodation.main_img}/>
                                </div>
                                <div className="user-reservation-pending-list__item-text">
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
                            <div className="user-reservation-pending-list__item-state-wrapper">
                                <div className="user-reservation-pending-list__item-state-box">
                                    <div 
                                        className="user-reservation-pending-list__item-state-img"
                                        style={{backgroundColor : get_list_style(el.reservation_state)}}>                                            
                                    </div>
                                    <span>{get_list_state(el.reservation_state)}</span>
                                </div>
                            </div>
                        </div>
                    )
                }) :
                <div></div>}
            </div>       
        </div>
    )
}
export default UserReservationPendingList