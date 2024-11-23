import { UserContext } from "@/context/user_context/config/user_context"
import { useContext, useState } from "react"
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
import {Swiper, SwiperSlide} from "swiper/react";
import { state_store } from "@/util/function/util_function";
import AlertModal from "@/utilComponent/modal/alert_modal/alert_modal";

function UserProfileMain(){

    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // const //
    const [limit] = useState(5)

    // =================================================
    // states //
    const [main_view, setMain_view] = useState(null)
    const [original_view, setOriginal_view] = useState(null)
    const [skip_level, setSkip_level] = useState(1)

    // =================================================
    // hooks //
    // business
    const {
        isLoading,
        isError,
        data
    } = useUserProfileMainBusiness(
        {
            user_data,
            limit
        },
        state_store([
            {main_view, setMain_view},
            {original_view, setOriginal_view},
            {skip_level, setSkip_level}
        ])
    )
    // style 
    const {
        RbtnState, 
        LbtnState, 
        swiper_ref, 
        moveRSlide, 
        moveLslide, 
        swiper_change,
        modal_toggle
    } = useUserProfileMainStlye()

    // =================================================
    // fetch loading //
    if(isLoading){
        return <Loading/>
    }

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
                                <span>{data.user_evaluations.evaluations_counts}개</span>
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
            {main_view && main_view.user_evaluations.evaluations.length &&
            <div className="user-profile-main__evaluations-list">
                <span className="user-profile-main__evaluations-list-title"><span>{user_data.nickname ? user_data.nickname : user_data.name}</span> 님이 작성한 리뷰</span>
                <div className="user-profile-main__evaluations-list-button-wrapper">
                    <button 
                        className = {`${LbtnState ? 'small-button-disabled' : 'small-button'}`}
                        onClick={moveLslide}
                        disabled = {LbtnState ? true : false}>
                        <img src={arrow_icon}/>
                    </button>
                    <button 
                        className = {`user-profile-main__right-button ${RbtnState ? 'small-button-disabled' : 'small-button'}`}
                        onClick={moveRSlide}
                        disabled = {RbtnState ? true : false}>
                        <img src={arrow_icon}/>
                    </button>
                </div>
                <div className="user-profile-main__evaluations-item-wrapper">
                    <Swiper
                        spaceBetween={30} 
                        slidesPerView = {2} 
                        onSwiper = {(target)=>{swiper_ref.current = target}} 
                        onSlideChange = {swiper_change}>
                        {main_view.user_evaluations.evaluations.map((el, id) => {
                            return (
                                <SwiperSlide key={id}>
                                    <div className="user-profile-main__evaluations-item">
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
                                </SwiperSlide>                                
                            )
                        })}
                        {main_view.user_evaluations.evaluations.map((el, id) => {
                            return (
                                <SwiperSlide key={id}>
                                    <div className="user-profile-main__evaluations-item">
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
                                </SwiperSlide>                                
                            )
                        })}
                        {main_view.user_evaluations.evaluations.map((el, id) => {
                            return (
                                <SwiperSlide key={id}>
                                    <div className="user-profile-main__evaluations-item">
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
                                </SwiperSlide>                                
                            )
                        })}
                        {main_view.user_evaluations.evaluations.map((el, id) => {
                            return (
                                <SwiperSlide key={id}>
                                    <div className="user-profile-main__evaluations-item">
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
                                </SwiperSlide>                                
                            )
                        })}
                    </Swiper>
                </div>

                <div className="user-profile-main__evaluations-list-footer">
                    <span 
                        className="user-profile-main__evaluations-list-footer-title"
                        onClick={()=>{modal_toggle('user-profile-main-evaluation-list')}}>후기 <span>{data.user_evaluations.evaluations_counts}</span> 개 모두 표시하기</span>
                </div> 

                <AlertModal
                    key_name = {'user-profile-main-evaluation-list'}
                    title = {'댓글 목록'}
                    modal_toggle = {modal_toggle}>
                    <div className="user-profile-main-evaluation-list__container">
                        <span className="user-profile-main-evaluation-list__title">후기 {data.user_evaluations.evaluations_counts}개</span>
                        <div className="user-profile-main-evaluation-list__contents">
                            {main_view.user_evaluations.evaluations.map((el, id) => {
                                return (
                                    <div className="user-profile-main-evaluation-list__evaluations-item">
                                        <div className="user-profile-main-evaluation-list__evaluations-item-footer">
                                            <div className="user-profile-main-evaluation-list__evaluations-item-footer-img">
                                                <UserProfileImg 
                                                    url = {el.seller.profileImg}
                                                    user_data = {el.seller}/>
                                            </div>
                                            <div className="user-profile-main-evaluation-list__evaluations-item-footer-contents">
                                                <span>{el.seller.userId}</span>
                                                <span>{format(new Date(el.createAt), 'yyyy. MM. dd')}</span>
                                            </div>
                                        </div>
                                        <pre className="user-profile-main-evaluation-list__evaluation-item-text">
                                            {el.text}
                                        </pre>                                        
                                    </div>                           
                                )
                            })}
                        </div>
                        <button className="user-profile-main-evaluation-list__button button-enable">
                            후기 더 보기
                        </button>
                    </div>
                </AlertModal>              
            </div>}
        </div>
    )
}

export default UserProfileMain