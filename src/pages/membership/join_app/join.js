import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import './join.scss'
import '../../../manage_scss_style/commonness/commonness.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import useMembershipJoinBusiness from "../hook-store/business-hooks/membership_join_business";
import { state_store } from "../../../utilData/UtilFunction";
import Loading from "../../../utilComponent/material/loading/loading";

function Join(){
    // =================================================
    // state //
    const [duplicate, setDuplicate] = useState(null)
    const [join_state, setJoin_state] = useState(null)


    // =================================================
    // hooks //
    // business
    const {register, handleSubmit, errors, isValid, submit, input_id, check_duplicate} = useMembershipJoinBusiness(undefined, state_store([
        {
            'duplicate':duplicate,
            'setDuplicate':setDuplicate
        },
        {
            'join_state':join_state,
            'setJoin_state':setJoin_state
        }
    ]))

    return(
        <div className="join-app__container">
            {/* loading */}
            {join_state === false ? <Loading></Loading> : null}
            <Main_menu></Main_menu>
            <div className="join-app__content">
                <div className="join-app__content-section1">
                    <div className="join-app__content-section1-part1">회원가입</div>
                    <div className="join-app__content-section1-part2">
                        <div className="level-bar-lv2"></div>
                    </div>
                    <div className="join-app__content-section1-part3">
                        보형짱 닷컴 계정을 만들어 주세요!
                    </div>
                </div>
                <form className="join-app__content-section2" onSubmit={handleSubmit(submit)}>      
                    <div className="join-app__content-section2-wrapper">
                        <div className="join-app__text">
                            <span>아이디</span>
                            <div className="join-app__box">
                                <div></div>
                            </div>
                        </div>
                        {/* id */}
                        <div className="join-app__content-section2-input-wrapper">
                            <input type="text" placeholder="아이디" className={`join-app__content-section2-part1 ${errors.id ? 'input-invalid' : ''}`} 
                            {...register('id')} autoComplete="off"></input>

                            <button className={`join-app__content-section2-input-button 
                            ${(input_id && input_id.length !== 0 && !errors.id) && !(duplicate && duplicate.userId === input_id) ? 'button-enable' : 'button-disable'}`}
                            disabled={(input_id && input_id.length !== 0 && !errors.id) && !(duplicate && duplicate.userId === input_id) ? false : true} 
                            onClick={(e)=>{check_duplicate(e,input_id)}} type="button">
                                중복확인
                            </button>
                        </div>
                        {errors.id && <span className="input-alert-text">{errors.id.message}</span>}
                        {duplicate && duplicate.userId === input_id && !errors.id && <span className="input-alert-text" style={{color : `${duplicate.duplicate_state ? '#1273E4' : 'red'}`}}>
                            {duplicate.duplicate_text}
                        </span>}
                    </div>  
                    <div className="join-app__content-section2-wrapper">
                        <div className="join-app__text">
                            <span>비밀번호</span>
                            <div className="join-app__box">
                                <div></div>
                            </div>
                        </div>
                        <div className="join-app_content-section2-password-wrapper">
                            {/* 비번 입력 */}
                            <div>
                                <input type="password" placeholder="비밀번호" className={`join-app__content-section2-part2 ${errors.password ? 'input-invalid' : ''}`}
                                {...register('password')}></input>
                                {errors.password && <span className="input-alert-text">{errors.password.message}</span>}
                            </div>

                            {/* 비번확인 */}
                            <div>
                                <input type="password" placeholder="비밀번호 확인" className={`join-app__content-section2-part3 ${errors.password_confirm ? 'input-invalid' : ''}`}
                                {...register('password_confirm')}></input>
                                {errors.password_confirm && <span className="input-alert-text">{errors.password_confirm.message}</span>}
                            </div>                           
                        </div>
                    </div> 
                    <div className="join-app__content-section2-wrapper">
                        <div className="join-app__text">
                            <span>이름</span>
                            <div className="join-app__box">
                                <div></div>
                            </div>
                        </div>
                        {/* name */}
                        <input type="text" placeholder="이름" className={`join-app__content-section2-part4 ${errors.name ? 'input-invalid' : ''}`}
                        {...register('name')} autoComplete="off"></input>
                        {errors.name && <span className="input-alert-text">{errors.name.message}</span>}
                    </div>                                              

                    <input type='submit' value='가입' className={`join-app__content-section2-btn 
                    ${isValid && duplicate && duplicate.duplicate_state ? 'button-enable' : 'button-disable'}`}
                    disabled={isValid && duplicate && duplicate.duplicate_state ? false : true}></input>                        
                </form>
            </div>
        </div>
    )

}

export default Join