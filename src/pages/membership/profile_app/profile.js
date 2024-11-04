import React, {useRef, useState} from "react";
import './profile.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import default_data from "../../../utilData/defaultData";
import '../../../manage_scss_style/commonness/commonness.scss'
import useMembershipProfileBusiness from "../hook-store/business-hooks/membership_profile_business";
import { state_store, reference_store } from "../../../utilData/UtilFunction";
import Loading from "../../../utilComponent/material/loading/loading";

function Profile({login_user}){

    // =================================================
    // state //
    const [img_file, setImg_file] = useState(null)
    const [img_url, setImg_url] = useState(null)
    const [random_index, setRandom_index] = useState(Math.floor(Math.random() * default_data.random_profile_color.length))
    const [loading_state, setLoading_state] = useState(null)

    // =================================================
    // ref //
    const user_img_display = useRef(null)
    const user_file_form = useRef(null)
    const img_file_input = useRef(null)

    // =================================================
    // hooks //
    const {
        register, 
        handleSubmit, 
        errors, 
        submit, 
        input_nickname, 
        add_profile_img, 
        click_input_img, 
        default_profile_click, 
        boolean_submit
    } = 
        useMembershipProfileBusiness(undefined, 
        state_store([
            {img_file, setImg_file},
            {img_url, setImg_url},
            {random_index, setRandom_index},
            {loading_state, setLoading_state}
        ]),
        reference_store([
            {user_img_display},
            {user_file_form},
            {img_file_input}
        ]),
        {
            login_user
        }
    )

    // =================================================
    // hook form api에서 ref 설정 필요한 필드 //
    const {ref, onChange, ...rest} = register('image')

    return(
        <div className="profile__container">
            {/* loading */}
            {loading_state === false ? <Loading></Loading> : null}
            <Main_menu login_user={login_user}></Main_menu>
            <div className="profile__content">
                <div className="profile__content-section1">
                    <div className="profile__content-section1-part1">
                        <span>프로필</span>
                        <span> (선택)</span>
                    </div>
                    <div className="profile__content-section1-part2">
                        <div className="level-bar-lv4"></div>
                    </div>
                    <div className="profile__content-section1-part3">
                        <span>프로필 사진과 닉네임을 등록해 주세요!</span>
                    </div>
                </div>
                {/* form */}
                <form 
                    className="profile__content-section2" 
                    ref={user_file_form} 
                    onSubmit={handleSubmit(submit)}>
                    <div className="profile__content-section2-part1 box-shadow-lv1 profile-box-style-column">
                        {/* img */}
                        <div className="profile__content-section2-part1-img">
                            <input 
                                className="profile__input" 
                                type="file" 
                                id='userImg' 
                                ref={(el)=>{
                                    ref(el)
                                    img_file_input.current = el
                                }} 
                                onChange={(e) => {
                                    onChange(e)
                                    click_input_img(e)
                                }}
                                style={{display:'none'}}
                                {...rest} 
                                autoComplete="off"/>
                            {/* img-profile */}
                            <div className="profile__content-section2-part1-profile" 
                                style={{backgroundColor : default_data.random_profile_color[random_index]}}>
                                {img_file && 
                                <img 
                                    className="proflie__img-profile" 
                                    ref={user_img_display} 
                                    src={img_url ? img_url : null}/>}
                                {!img_file && 
                                <span>{login_user.name.substring(0,3)}</span>}
                            </div>
                            <button 
                                type="button" 
                                className="profile__content-section2-part1-profile-btn" 
                                onClick={add_profile_img}>
                                    사진 등록
                            </button>
                            {errors.image && <span className="input-alert-text">{errors.image.message}</span>}
                            <button 
                                className="profile__content-section2-part1-default-btn" 
                                type="button" 
                                onClick={default_profile_click}>
                                    기본 프로필 사용
                            </button>
                        </div>
                        {/* text */}
                        <div className="profile__content-section2-part1-text-wrapper">
                            <div className="proflie__content-section2-part1-text">
                                <div className="proflie__content-section2-part1-text-wrapper">
                                    <span className="profile__letter">아이디</span>
                                    <div className="login__section-box">
                                        <div></div>
                                    </div>
                                </div>
                                <span>{login_user.userId}</span>
                            </div>
                            <div className="proflie__content-section2-part1-text">
                                <div className="proflie__content-section2-part1-text-wrapper">
                                    <span className="profile__letter">이메일</span>
                                    <div className="login__section-box">
                                        <div></div>
                                    </div>
                                </div>
                                <span>{login_user.email}</span>
                            </div>
                            <div className="proflie__content-section2-part1-text">
                                <div className="proflie__content-section2-part1-text-wrapper">
                                    <span>가입날짜</span>
                                    <div className="login__section-box">
                                        <div></div>
                                    </div>
                                </div>
                                <span>
                                    {new Date(login_user.createdAt).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                </span>
                            </div>
                            <div>
                                <div className="proflie__content-section2-part1-text">
                                    <div className="proflie__content-section2-part1-text-wrapper">
                                        <span className="profile__letter">닉네임</span>
                                        <div className="login__section-box">
                                            <div></div>
                                        </div>
                                    </div>
                                    <div>
                                        <input 
                                            type="text" 
                                            placeholder="닉네임을 설정해 주세요!" 
                                            className={`profile__content-section2-part1-nameinput`}
                                            {...register('nickname')} 
                                            autoComplete="off"/>
                                        {errors.nickname && <span className="input-alert-text">{errors.nickname.message}</span>}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* submit 버튼 */}
                    <input 
                        type="submit" 
                        className={`profile__content-section2-btn ${boolean_submit() ? 'button-enable' : 'button-disable'}`} 
                        value={'가입 완료'}/> 
                </form>
            </div>
        </div>
    )
}

export default Profile

