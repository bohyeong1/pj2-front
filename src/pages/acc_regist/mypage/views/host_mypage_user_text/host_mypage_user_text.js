import {useContext} from "react";
import './host_mypage_user_text.scss'
import default_data from "@/util/default_data/default_data";
import { UserContext } from '@/context/user_context/config/user_context';
import OriginalImg from "@/picture/original_img/original_img"

function HostMypageUserText(){

    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)
    console.log(user_data)
    return(
        <div className="host-mypage-user-text__container">
            <div className="host-mypage-user-text__title">
                <span>호스팅 정보</span>
            </div>
            <div className="host-mypage-user-text__content">
                <div className="host-mypage-user-text__content-section1">
                    <span className="host-mypage-user-text__content-sub-title">프로필</span>
                    <span>다른 게스트들이나, 숙소를 소개하는 페이지에서 보여지는 호스트의 모습입니다!</span>
                    <div className="host-mypage-user-text__content-section1-profile">
                        <div className="host-mypage-user-text__content-section1-profile-img">
                            <OriginalImg url={user_data.profileImg}/>
                        </div>
                        <div className="host-mypage-user-text__content-section1-profile-text">

                        </div>
                    </div>
                </div>
                <div className="host-mypage-user-text__content-section2">
                    <span className="host-mypage-user-text__content-sub-title">환불 정책</span>
                </div>
                <div className="host-mypage-user-text__content-section3">
                    <span className="host-mypage-user-text__content-sub-title">예약 정책</span>
                </div>
            </div>
        </div>
    )
}

export default HostMypageUserText