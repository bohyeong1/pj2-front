import './email_prove.scss'
import '../../../manage_scss_style/commonness/commonness.scss'
import Main_menu from '../../../utilComponent/menu/main-menu/main-menu'
import '../../../manage_scss_style/commonness/commonness.scss'
import useMembershipEmailBusiness from '../hook-store/business-hooks/membership_email_business'
import { useRef, useState } from 'react'
import { state_store, reference_store } from '../../../utilData/UtilFunction'

function Email_prove({login_user}){

    // =================================================
    // refs //
    const timer = useRef(null)
    const web_worker = useRef(null)

    // =================================================
    // state //
    const [verification_state, setVerification_state] = useState(null)
    const [auth_state, setAuth_state] = useState(null)
    const [interval_var, setInterval_var] = useState(null)

    // =================================================
    // hooks //
    const {register, handleSubmit, errors, isValid, submit, input_email, verification_click, clear_verification, clear_auth} = useMembershipEmailBusiness(undefined,
        state_store([
            {
                'verification_state' : verification_state,
                'setVerification_state' : setVerification_state
            },
            {
                'auth_state' : auth_state,
                'setAuth_state' : setAuth_state
            },
            {
                'interval_var' : interval_var,
                'setInterval_var' : setInterval_var
            }
        ]),
        reference_store([
            {
                'timer' : timer
            },
            {
                'web_worker' : web_worker
            }
        ]),
        {
            'login_user' : login_user
        }
    )

    return(
        <div className='email-prove-app'>
            <Main_menu></Main_menu>
            <div className='email-prove-app__container'>
                <div className="email-prove-app__container-section1">
                    <div className="email-prove-app__container-section1-part1">
                        <span>이메일 인증</span>
                        <span> (선택)</span>
                    </div>
                    <div className="email-prove-app__container-section1-part2">
                        <div className="level-bar-lv3"></div>
                    </div>
                    <div className="email-prove-app__container-section1-part3">
                        <span>
                            호스팅, 예약 서비스를 이용 하시려면 <br></br>
                            <span style={{color:'#1273E4'}}>이메일 인증</span>을 진행해 주세요!
                        </span>
                    </div>
                    <div className="email-prove-app__container-section1-part4">
                        <div className="email-prove-app__section-box-container">
                            <span>1일 이메일 인증 요청 회수 3회 제한</span>
                            <div className="email-prove__section-box">
                                <div></div>
                            </div>
                        </div>                       
                    </div>
                </div>
                <form className='email-prove-app__container-section2' onSubmit={handleSubmit(submit)}>
                    {/* e-mail */}
                    <div className='email-prove-app__container-section2-input-container'>
                        <div className="email-prove-app__container-section2-input-wrapper">
                            <input type="text" placeholder="이메일" className={`email-prove-app__container-section2-part1 ${errors.email ? 'input-invalid' : ''}`} 
                            {...register('email', {
                                onChange : clear_verification
                            })} autoComplete="off">
                            </input>
                            <button className={`email-prove-app__container-section2-input-button 
                            ${input_email && input_email.length !== 0 && !errors.email ? 'button-enable' : 'button-disable'}`}                    
                            type="button" disabled={input_email && input_email.length !== 0 && !errors.email ? false : true}
                            onClick={(e)=>{verification_click(e,input_email)}}>
                                인증요청
                            </button>
                        </div>
                        {verification_state && !errors.email && <span className="input-alert-text" 
                        style={{color : verification_state.code_state ? '#1273E4' : 'red'}}>
                            {verification_state.message}
                        </span>}
                        {errors.email && <span className="input-alert-text">{errors.email.message}</span>}
                    </div>

                    {/* 인증코드 */}
                    <div className='email-prove-app__container-section2-code-wrapper'>
                        <input type="text" placeholder="인증코드를 입력해 주세요" className={`email-prove-app__container-section2-part2`} autoComplete="off"
                        {...register('code',{
                            onChange : clear_auth
                        })}></input>
                        <div className='email-prove-app__timer-container'>
                           <span ref={timer} className="email-prove-app__timer"></span>
                        </div>
                        {/* auth_state */}
                        {errors.code && <span className="input-alert-text">{errors.code.message}</span>}
                        {!errors.code && auth_state && <span className="input-alert-text"
                         style={{color : auth_state.code_state ? '#1273E4' : 'red'}}>{auth_state.message}</span>}
                    </div>

                    {/* submit */}
                    <input type='submit' value='인증 확인' className={`email-prove-app__container-section2-btn 
                    ${isValid && verification_state.code_state ? 'button-enable' : 'button-disable'}`}  disabled={isValid ? false : true}
                    ></input>   
                </form>
            </div>
        </div>
    )
}

export default Email_prove