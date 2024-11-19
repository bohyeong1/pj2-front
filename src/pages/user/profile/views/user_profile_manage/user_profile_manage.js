import './user_profile_manage.scss'
import { UserContext } from "@/context/user_context/config/user_context"
import {useState, useContext, useRef} from "react";
import '@/manage_scss_style/commonness/commonness.scss'
import UserProfileImg from "@/utilComponent/material/user_profile_img/user_profile_img";
import camera_icon from '@/assets/icon/camera-icon.png'
import FormModal from '@/utilComponent/modal/form_modal/form_modal';
import useUserProfileManageStyle from '../../hook_store/style_hooks/user_profile_manage_style';
import useUserProfileManageBusiness from '../../hook_store/business_hooks/user_profile_manage_business';
import { state_store, reference_store } from "@/util/function/util_function";
import ImgRegistModal from "@/utilComponent/modal/img_regist_modal/img_regist_modal";

function UserProfileManage(){

    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // states //
    const [modify_state, setModify_state] = useState(false)
    const [fetch_state, setFetch_state] = useState(false)
    const [password_fetch_state, setPassword_fetch_state] = useState(false)
    const [profile_img, setProfile_img] = useState({
        img : user_data.profileImg ? user_data.profileImg : null,
        delete_prev_img : null,
        img_file : null,
        img_display_url : user_data.profileImg ? user_data.profileImg : null
    })

    // =================================================
    // refs //
    const name_input_ref = useRef(null)

    // =================================================
    // hooks //
    // business
    const {
        register, 
        watch,
        errors,
        isValid
    } = useUserProfileManageBusiness(
        {
            user_data,
            setUser_data
        },
        state_store([
            {modify_state, setModify_state},
            {fetch_state, setFetch_state},
            {password_fetch_state, setPassword_fetch_state},
            {profile_img, setProfile_img}
        ])
    )
    // style
    const {
        modal_toggle,
        auth_success,
        set_img
    } = useUserProfileManageStyle(undefined,
        state_store([
            {modify_state, setModify_state},
            {profile_img, setProfile_img}
        ]),
        reference_store([
            {name_input_ref}
        ])
    )

    // =================================================
    // hook form api에서 ref 설정 필요한 필드 //
    const {ref, ...rest} = register('name')    

    return (
        <div className="user-profile-manage__container">
            <div className="user-profile-manage__content">
                <span className="user-profile-manage__title">내 정보 관리</span>

                <div className="user-profile-manage__section1">
                    <span className="user-profile-manage__section1-text">버튼 클릭 후 인증을 진행해 주세요!</span>
                    {!modify_state && <button 
                        className="user-profile-manage__section1-button" 
                        onClick={()=>{modal_toggle('user-profile-manage-auth')}}>
                            수정하기
                    </button>}
                </div>

                {/* section2 */}
                <div className="user-profile-manage__section2">
                    <span className='user-profile-manage__sub-title'>내 정보 관리</span>
                    <div className="user-profile-manage__section2-input">
                        <div className="user-profile-manage__text">
                            <span>사진</span>
                            <div className="user-profile-manage__box">
                                <div></div>
                            </div>
                        </div>
                        <div className='user-profile-manage__profile-img-wrapper'>
                            <div className='user-profile-manage__profile-img box-shadow-lv2'>
                                <UserProfileImg 
                                    url={profile_img.img_display_url}
                                    user_data = {user_data}/>                            
                            </div>
                            {modify_state && <button 
                                className="user-profile-manage__profile-button box-shadow-lv1"
                                onClick={()=>{modal_toggle('user-profile-modify-profile-img')}}
                                >
                                <img src={camera_icon}/>
                            </button>}
                        </div>                        
                    </div>
                    <div className="user-profile-manage__section2-input">
                        <div className="user-profile-manage__text">
                            <span>이름</span>
                            <div className="user-profile-manage__box">
                                <div></div>
                            </div>
                        </div>
                        <input  
                            type="text" 
                            className={`${modify_state ? '' : 'user-profile-manage__input-invalid'}`} 
                            placeholder='이름을 변경해 주세요'  
                            ref={(el)=>{
                                ref(el)
                                name_input_ref.current = el
                            }}
                            {...rest}/>
                            {errors.name && <span className='input-alert-text'>{errors.name.message}</span>}
                    </div>
                    <div className="user-profile-manage__section2-input">
                        <div className="user-profile-manage__text">
                            <span>닉네임</span>
                            <div className="user-profile-manage__box">
                                <div></div>
                            </div>
                        </div>
                        <input   
                            type="text"  
                            className={`${modify_state ? '' : 'user-profile-manage__input-invalid'}`}
                            placeholder='닉네임을 변경해 주세요'  
                            {...register('nickname')}/>
                        {errors.nickname && <span className='input-alert-text'>{errors.nickname.message}</span>}
                    </div>                    
                    <div className="user-profile-manage__section2-input">
                        <div className="user-profile-manage__text">
                            <span>이메일</span>
                            <div className="user-profile-manage__box">
                                <div></div>
                            </div>
                        </div>
                        <span>{user_data.email}</span> 
                    </div>

                    {modify_state && <button 
                        className={`user-profile-manage__fetch-button ${fetch_state ? 'button-enable' : 'button-disable'}`}
                        disabled = {fetch_state ? false : true}>
                            수정완료
                    </button>}
                </div>
                {/* section3 */}
                <div className='user-profile-manage__section3'>
                    <span className='user-profile-manage__sub-title'>비밀번호 관리</span>
                    <div className="user-profile-manage__section2-input">
                        <div className="user-profile-manage__text">
                            <span>현재 비밀번호</span>
                            <div className="user-profile-manage__box">
                                <div></div>
                            </div>
                        </div>
                        <input   
                            type="password" 
                            className={`${modify_state ? '' : 'user-profile-manage__input-invalid'}`}
                            placeholder='현재 비밀번호를 입력해 주세요'                            
                            {...register('prev_password')}/>
                        {errors.prev_password && <span className='input-alert-text'>{errors.prev_password.message}</span>}
                    </div>
                    <div className="user-profile-manage__section2-input">
                        <div className="user-profile-manage__text">
                            <span>새 비밀번호</span>
                            <div className="user-profile-manage__box">
                                <div></div>
                            </div>
                        </div>
                        <input   
                            type="password" 
                            className={`${modify_state ? '' : 'user-profile-manage__input-invalid'}`}
                            placeholder='비밀번호를 변경해 주세요'                            
                            {...register('password')}/>
                        {errors.password && <span className='input-alert-text'>{errors.password.message}</span>}
                    </div>
                    <div className="user-profile-manage__section2-input">
                        <div className="user-profile-manage__text">
                            <span>새 비밀번호 확인</span>
                            <div className="user-profile-manage__box">
                                <div></div>
                            </div>
                        </div>
                        <input   
                            type="password" 
                            className={`${modify_state ? '' : 'user-profile-manage__input-invalid'}`}
                            placeholder={'비밀번호를 재입력 해주세요'}
                            {...register('password_confirm')}/>
                        {errors.password_confirm && <span className='input-alert-text'>{errors.password_confirm.message}</span>}
                    </div>
                    {modify_state && <button 
                        className={`user-profile-manage__fetch-button ${password_fetch_state ? 'button-enable' : 'button-disable'}`}
                        disabled = {password_fetch_state ? false : true}>
                            수정완료
                    </button>}
                </div>

                <div className="user-profile-manage__section4">
                    <div className="user-profile-manage__section4-text">더 이상 보형짱닷컴을 이용하고 싶지 않으신가요?</div>
                    <div className="user-profile-manage__section4-link">회원탈퇴</div>
                </div>
            </div>

            {/* modal */}
            {/* 인증 모달 */}
            <FormModal
                key_name = {'user-profile-manage-auth'}
                form_text = {'인증하기'}
                title = {'비밀번호 인증'}
                errors = {errors}
                handle_function = {auth_success}
                modal_toggle = {modal_toggle}>
            </FormModal>

            {/* 프로필 이미지 등록 모달 */}
            <ImgRegistModal
                img_modal_toggle={modal_toggle} 
                drop_img_state={profile_img} 
                setDrop_img_state={set_img} 
                target_id={'user-profile-modify-profile-img'}/>
        </div>
    )
}

export default UserProfileManage
