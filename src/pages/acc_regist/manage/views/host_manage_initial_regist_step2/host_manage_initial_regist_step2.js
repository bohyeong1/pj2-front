import React, {useState, useContext} from 'react'
import './host_manage_initial_regist_step2.scss'
import useHostManageInitialRegistStep2Business from '../../hook_store/business_hooks/host_manage_initial_regist_step2_business.js';
import '@/manage_scss_style/commonness/commonness.scss'
import default_data from "@/util/default_data/default_data";
import { state_store } from "@/util/function/util_function";
import Loading from '@/utilComponent/material/loading/loading'
import { UserContext } from '@/context/user_context/config/user_context';

function HostManageInitialRegistStep2(){

    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // state //
    const [loading, setLoading] = useState(null) 

    // =================================================
    // hooks //  
    // business
    const {
        register, 
        handleSubmit, 
        errors, 
        isValid, 
        submit
    } = useHostManageInitialRegistStep2Business(undefined,
        state_store([
            {loading, setLoading}
        ])
    )

    return(
        loading === false ? <Loading></Loading> : 
        <div className="host-manage-initial-regist-step2">
            <div className="host-manage-initial-regist-step2__container">
                <div className="host-manage-initial-regist-step2__container-section1">
                    <span>호스트 정보 입력</span>
                </div>
                {/* contents */}
                <div className="host-manage-initial-regist-step2__container-section2">
                    <div className='host-manage-initial-regist-step2__sticky-container'>
                        <div className='host-manage-initial-regist-step2__container-section2-part1'>
                            <div className='host-manage-initial-regist-step2__container-section2-part1-box1 box-shadow-lv3'>
                                <div className='host-manage-initial-regist-step2__container-section2-part1-box1-item1'>
                                    <div className='host-manage-initial-regist-step2__container-section2-part1-box1-profile'>
                                        {user_data.profileImg ? null : <span>{user_data.defaultProfile}</span>}
                                        <img src={user_data.profileImg ? user_data.profileImg : user_data.defaultProfile}></img>
                                    </div>
                                    <div className='host-manage-initial-regist-step2__container-section2-part1-box1-name'>
                                        <span>{user_data.name} 님</span>
                                    </div>
                                </div>

                                <div className='host-manage-initial-regist-step2__container-section2-part1-box1-item2'>
                                    <div>
                                        <span>후기</span>
                                        <div>
                                            <span>0</span>
                                            <span>개</span>
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
                                        <span>호스팅 경력</span>
                                        <div>
                                            <span>0</span>
                                            <span>개월</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='host-manage-initial-regist-step2__container-section2-part1-box2'>
                                <div>
                                    <span>{user_data.name} </span>
                                    <span>님의 인증 정보</span>
                                </div>
                                <div>
                                    <div>
                                        <img src={user_data.email ? default_data.d_imgs.check : default_data.d_imgs.no_check}></img>
                                        <span>이메일 주소</span>
                                    </div>
                                    <div>
                                        <img src={default_data.d_imgs.no_check}></img>
                                        <span>휴대폰 번호(추후 구현 = 돈 너무 깨짐)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='host-manage-initial-regist-step2__container-section2-part2'>
                        <span className='host-manage-initial-regist-step2__container-section2-part2-title'>{user_data.name} 님 소개</span>
                        <form 
                            className='host-manage-initial-regist-step2__container-section2-part2-form' 
                            onSubmit={handleSubmit(submit)}>
                            <textarea 
                                className={`host-manage-initial-regist-step2__container-section2-part2-input border-textarea`}
                                spellCheck={false} 
                                placeholder={`${errors.text ? errors.text.message : '...!!'}`}
                                {...register('text')}/>
                            <div className='host-manage-initial-regist-step2__container-section2-part2-button-wrapper'>
                                <button 
                                    className={`host-manage-initial-regist-step2__container-section2-part2-button default-button ${isValid ? 'button-enable' : 'button-disable'}`}
                                    disabled = {isValid ? false : true}>
                                    작성 완료
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostManageInitialRegistStep2