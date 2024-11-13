import './user_reservation_detail_message.scss'
import arrow_icon from '@/assets/icon/arrow-icon.png'
import { useContext } from "react"
import { UserContext } from "@/context/user_context/config/user_context"
import UserProfileImg from '@/utilComponent/material/user_profile_img/user_profile_img'

function UserReservationDetailMessage(){

    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    return (
        <div className="user-reservation-detail-message__container">
            <div className='user-reservation-detail-message__header'>
                <button className='user-reservation-detail-message__header-prev-button'>
                    <img src = {arrow_icon}/>
                </button>
                <div className='user-reservation-detail-message__header-profile'>
                    <UserProfileImg
                        url = {user_data.profileImg}
                        user_data = {user_data}/>
                </div>
            </div>
        </div>
    )
}

export default UserReservationDetailMessage