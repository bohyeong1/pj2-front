import './user_reservation_message.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import { useSearchParams } from 'react-router-dom'
import useUserReservationMessageBusiness from '../../hook_store/business_hooks/user_reservation_message_business'
import useUserReservationMessageStyle from '../../hook_store/style_hooks/user_reservation_message_style'
import Loading from "@/utilComponent/material/loading/loading"
import message_icon from '@/assets/icon/message-icon.png'
import OriginalImg from '@/picture/original_img/original_img';
import UserProfileImg from '@/utilComponent/material/user_profile_img/user_profile_img'
import { useContext } from "react"
import { UserContext } from "@/context/user_context/config/user_context"
import { format } from 'date-fns'

function UserReservationMessage(){
    // =================================================
    // context state //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // query string //
    const [search_param, setSearch_param] = useSearchParams()

    // =================================================
    // hooks //
    // business
    const {
        data,
        error,
        isLoading
    } = useUserReservationMessageBusiness(
        {
            search_param,
            setSearch_param
        }
    ) 
    // style
    const {
        click_category_button,
        get_list_state,
        get_list_style,
        get_date_text,
        click_message
    } = useUserReservationMessageStyle(
        {
            search_param,
            setSearch_param
        }
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
        <div className='user-reservation-message__container'>
            <div className='user-reservation-message__header'>
                <button 
                    className={`small-button ${search_param.get('role') === 'guest' ? 'small-button-active' : ''}`}
                    onClick={()=>{click_category_button('guest')}}
                    disabled = {search_param.get('role') === 'guest' ? true : false}>
                        게스팅
                </button>
                <button 
                    className={`small-button ${search_param.get('role') === 'host' ? 'small-button-active' : ''}`}
                    onClick={()=>{click_category_button('host')}}
                    disabled = {search_param.get('role') === 'host' ? true : false}>
                        호스팅
                </button>
            </div>
            <div className='user-reservation-message_contents'>
                {data.message_rooms.length ? 
                <div className='user-reservation-message__contents-active-wrapper'>
                    {data.message_rooms.map((el, id) => {
                        console.log(el)
                        const recipient = el.participants.find((ele)=>{return ele.userId !== data.user.userId})
                        return (
                            <div 
                                key={id}
                                className='user-reservation-message__contents-item box-shadow-lv4'
                                onClick={()=>{click_message(el._id)}}>
                                <div className='user-reservation-message__contents-item-img-wrapper'>
                                    <div className='user-reservation-message__contents-item-img'>
                                        <OriginalImg url ={el.reservation_main_img}/>
                                    </div>
                                    <div className='user-reservation-message__contents-item-profile box-shadow-lv1'>
                                        <UserProfileImg                       
                                            url = {el.participants[0].profileImg}
                                            user_data = {el.participants[0]}/>
                                    </div>
                                </div>
                                <div className='user-reservation-message__contents-item-text'>
                                    <div className='user-reservation-message__contents-item-text-header'>
                                        <div className='user-reservation-message__contents-item-text-header-part1'>
                                            <div style={{backgroundColor : get_list_style(el.reservation_state)}}></div>
                                            <span>{get_list_state(el.reservation_state, search_param.get('role'))}</span>
                                        </div>
                                        <span>{get_date_text(new Date(el.updated_at))}</span>
                                    </div>
                                    <span className='user-reservation-message__contents-item-text-1'>
                                        {search_param.get('role') === 'guest' ? '호스트' : '게스트'} : {el.participants[0].name}
                                    </span>
                                    <pre className='user-reservation-message__contents-item-text-2'>{el.last_message}</pre>
                                    <span className='user-reservation-message__contents-item-text-3'>
                                        {format(new Date(el.checkin), 'yyyy년 MM월 dd일')} ~ {format(new Date(el.checkout), 'MM월 dd일')} · {el.reservation_title}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div> :
                <div className='user-reservation-message_contents-empty'>
                    <img src={message_icon}/>
                    <span>메세지가 없습니다.</span>    
                </div>}
            </div>
        </div>
    )
}

export default UserReservationMessage