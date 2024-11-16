import './user_reservation_detail_message.scss'
import arrow_icon from '@/assets/icon/arrow-icon.png'
import { useContext, useState, useRef } from "react"
import { UserContext } from "@/context/user_context/config/user_context"
import UserProfileImg from '@/utilComponent/material/user_profile_img/user_profile_img'
import useUserReservationDetailMessageBusiness from '../../hook_store/business_hooks/user_reservation_detail_message_business'
import Loading from "@/utilComponent/material/loading/loading"
import send_icon from '@/assets/icon/send-icon.png'
import { state_store } from "@/util/function/util_function";

function UserReservationDetailMessage(){

    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // states //
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])

    // =================================================
    // refs //
    const content_ref = useRef(null)
    console.log(messages)
    // =================================================
    // hooks //
    // business
    const {
        data,
        error,
        isLoading,
        send_message
    } = useUserReservationDetailMessageBusiness(
        {
            user_data, 
            setUser_data
        },
        state_store([
            {socket, setSocket},
            {messages, setMessages}
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
    // console.log(data)
    return (
        <div className="user-reservation-detail-message__container">
            <div className='user-reservation-detail-message__header'>
                <button className='user-reservation-detail-message__header-prev-button'>
                    <img src = {arrow_icon}/>
                </button>
                <div className='user-reservation-detail-message__header-part1'>

                </div>
                <div className='user-reservation-detail-message__header-part2'>
                    <span>{data.message.reservation_title}</span>
                </div>
                <div className='user-reservation-detail-message__header-part3'>
                    <div className='user-reservation-detail-message__header-profile'>
                        <UserProfileImg
                            url = {user_data.profileImg}
                            user_data = {user_data}/>
                    </div>
                    <div className='user-reservation-detail-message__header-profile'>
                        <UserProfileImg
                            url = {data.message.other_profile.profileImg}
                            user_data = {data.message.other_profile}/>
                    </div>
                </div>
            </div>

            {/* contents */}
            <div className='user-reservation-detail-message__contents'>
                {messages.map((el, id) => {
                    if(el.sender_id !== user_data._id){
                        const target_user = data.message.other_profile
                        return (
                            <div 
                                className='user-reseration-detail-message__contents-item-other'
                                key={id}>
                                <span className='user-reseration-detail-message__contents-item-text-other'>
                                    {el.content}
                                    {el.content}
                                    {el.content}
                                    {el.content}
                                    {el.content}
                                    {el.content}
                                    {el.content}
                                </span>
                                <div className='user-reseration-detail-message__contents-item-profile'>
                                    <UserProfileImg
                                        url = {target_user.profileImg}
                                        user_data = {target_user}/>
                                </div>
                            </div>
                        )
                    }
                    if(el.sender_id === user_data._id){
                        const target_user = user_data
                        return (
                            <div 
                                className='user-reseration-detail-message__contents-item-self'
                                id={id}>
                                <div className='user-reseration-detail-message__contents-item-profile'>
                                    <UserProfileImg
                                        url = {target_user.profileImg}
                                        user_data = {target_user}/>
                                </div>
                                <span className='user-reseration-detail-message__contents-item-text-self'>
                                    {el.content}
                                </span>
                            </div>
                        )
                    }
                })}
            </div>
            {/* message input */}
            <div className='user-reservation-deatil-message__text-input-wrapper'>
                <textarea 
                    type='text'
                    ref={content_ref}
                    spellCheck = {false}
                    className='user-reservation-detail-message__text-input common-scroll-bar'/>

                <button 
                    className='user-reservation-detail-message__text-input-button'
                    onClick={()=>{send_message(content_ref.current.value)}}>
                    <img src={send_icon}/>
                </button>
            </div>
        </div>
    )
}

export default UserReservationDetailMessage