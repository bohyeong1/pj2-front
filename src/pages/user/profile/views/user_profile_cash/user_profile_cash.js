import './user_profile_cash.scss'
import { UserContext } from "@/context/user_context/config/user_context"
import { useContext } from "react"
import { pop_three_texts } from "@/util/function/util_function";

function UserProfileCash(){

    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    return (
        <div className="user-profile-cash__container">
            <span className="user-profile-cash__title">잔액 조회</span>
            <div className='user-profile-cash__contents'>
                <span>보유 포인트</span>
                <span className='user-profile-cash__text'>{pop_three_texts(user_data.cashInv)}원</span>
            </div>
        </div>
    )
}

export default UserProfileCash