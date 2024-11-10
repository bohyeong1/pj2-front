import '@/manage_scss_style/commonness/commonness.scss'
import UserProfileImg from '@/utilComponent/material/user_profile_img/user_profile_img'
import './reservation_detail_section2.scss'

function ReservationDetailSection2({user}){

    return (
        <div className="reservation-detail-section2__container box-shadow-lv3">
            {/* user profile */}
            <div className="reservation-detail-section2__section1">
                <div className="reservation-detail-section2__section1-part1">
                    <UserProfileImg
                        url = {user.profileImg}
                        user_data = {user}/>
                </div>
                <div className="reservation-detail-section2__section1-part2 box-shadow-lv1">
                    <span className="reservation-detail-section2__section1-part2-text1">
                        {user.name} 님
                    </span>
                </div>
            </div>

            {/* message */}
            <div className='reservation-detail-section2__section2'>
                <span>예약에 대해 궁금한 것이 있으세요? <br/>호스트에게 직접 물어보는 것이 가장 좋습니다.</span>
                <button>호스트에게 메세지 보내기</button>
            </div>
        </div>
    )
}

export default ReservationDetailSection2