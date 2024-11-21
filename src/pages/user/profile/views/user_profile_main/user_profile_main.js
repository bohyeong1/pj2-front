import { UserContext } from "@/context/user_context/config/user_context"
import { useContext } from "react"
import './user_profile_main.scss'
import UserProfileImg from "@/utilComponent/material/user_profile_img/user_profile_img";
import check_icon from '@/assets/icon/check-icon.png'
import nocheck_icon from '@/assets/icon/nocheck-icon.png'
import Loading from "@/utilComponent/material/loading/loading"
import '@/manage_scss_style/commonness/commonness.scss'
import { get_date_difference } from "@/util/function/util_function";
import useUserProfileMainBusiness from "../../hook_store/business_hooks/user_profile_main_business";
import useUserProfileMainStlye from "../../hook_store/style_hooks/user_profile_main_style";
import { format } from "date-fns";
import arrow_icon from '@/assets/icon/arrow-icon.png'

function UserProfileMain(){

    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // hooks //
    // business
    const {
        isLoading,
        isError,
        data
    } = useUserProfileMainBusiness(
        {
            user_data
        }
    )
    // style 
    const {

    } = useUserProfileMainStlye()

    // =================================================
    // fetch loading //
    if(isLoading){
        return <Loading/>
    }
    console.log(data)
    return (
        <div className="user-profile-main__container">
            <span className="user-profile-main__title">{user_data.nickname ? user_data.nickname : user_data.name} 님 소개</span>
            
            {/* header */}
            <div className="user-profile-main__header">
                <div className='user-profile-main__header-box1 box-shadow-lv3'>
                    <div className='user-profile-main__header-box1-item1'>
                        <div className='user-profile-main__header-box1-profile box-shadow-lv4'>
                            <UserProfileImg 
                                url = {user_data.profileImg}
                                user_data = {user_data}/>
                        </div>
                        <div className='user-profile-main__header-box1-name'>
                            <span>{user_data.name} 님</span>
                        </div>
                    </div>

                    <div className='user-profile-main__header-box1-item2'>
                        <div>
                            <span>후기</span>
                            <div>
                                <span>0개</span>
                            </div>
                        </div>
                        <div>
                            <span>평점</span>
                            <div>
                                <span>미평가</span>
                                <img ></img>
                            </div>
                        </div>
                        <div>
                            <span>보형짱닷컴 가입기간</span>
                            <div>
                                <span>{get_date_difference(new Date(user_data.createdAt))}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='user-profile-main__header-box2'>
                    <div>
                        <span>{user_data.name} </span>
                        <span>님의 인증 정보</span>
                    </div>
                    <div>
                        <div>
                            <img src={user_data.email ? check_icon : nocheck_icon}></img>
                            <span>이메일 주소</span>
                        </div>
                        <div>
                            <img src={nocheck_icon}></img>
                            <span>휴대폰 번호(제작비용상 미구현)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* evaluations list */}
            {data && data.user_evaluations.evaluations.length &&
            <div className="user-profile-main__evaluations-list">
                <span className="user-profile-main__evaluations-list-title"><span>{user_data.nickname ? user_data.nickname : user_data.name}</span> 님이 작성한 리뷰</span>
                <div className="user-profile-main__evaluations-list-button-wrapper">
                    <button className="small-button">
                        <img src={arrow_icon}/>
                    </button>
                    <button className="small-button user-profile-main__right-button">
                        <img src={arrow_icon}/>
                    </button>
                </div>
                <div className="user-profile-main__evaluations-item-wrapper">
                    {data.user_evaluations.evaluations.slice(0,2).map((el, id) => {
                        return (
                            <div 
                                className="user-profile-main__evaluations-item"
                                key={id}>
                                <pre className="user-profile-main__evaluation-item-text">
                                    {el.text}
                                </pre>
                                <div className="user-profile-main__evaluations-item-footer">
                                    <div className="user-profile-main__evaluations-item-footer-img">
                                        <UserProfileImg 
                                            url = {el.seller.profileImg}
                                            user_data = {el.seller}/>
                                    </div>
                                    <div className="user-profile-main__evaluations-item-footer-contents">
                                        <span>{el.seller.userId}</span>
                                        <span>{format(new Date(el.createAt), 'yyyy. MM. dd')}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="user-profile-main__evaluations-list-footer">
                    <span className="user-profile-main__evaluations-list-footer-title">후기 <span>{data.user_evaluations.evaluations_counts}</span> 개 모두 표시하기</span>
                </div>               
            </div>}
        </div>
    )
}

export default UserProfileMain