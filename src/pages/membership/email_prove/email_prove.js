import './email_prove.scss'
import '../../../manage_scss_style/commonness/commonness.scss'
import Main_menu from '../../../utilComponent/menu/main-menu/main-menu'
import '../../../manage_scss_style/commonness/commonness.scss'
import useMembershipEmailBusiness from '../hook-store/business-hooks/membership_email_business'
import { useRef, useState } from 'react'
import { state_store, reference_store } from '../../../utilData/UtilFunction'

function Email_prove({login_user}){

    // refs
    const timer = useRef(null)

    // states
    const [verification_state, setVerification_state] = useState(null)

    const {register, handleSubmit, errors, isValid, submit, input_email, verification_click} = useMembershipEmailBusiness(undefined,
        state_store([
            {
                'verification_state' : verification_state,
                'setVerification_state' : setVerification_state
            }
        ]),
        reference_store([
            {
                'timer' : timer
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
                <form className='email-prove-app__container-section2'>
                    {/* e-mail */}
                    <div className='email-prove-app__container-section2-input-container'>
                        <div className="email-prove-app__container-section2-input-wrapper">
                            <input type="text" placeholder="이메일" className={`email-prove-app__container-section2-part1 ${errors.email ? 'input-invalid' : ''}`} 
                            {...register('email')} autoComplete="off">
                            </input>
                            <button className={`email-prove-app__container-section2-input-button 
                            ${input_email && input_email.length !== 0 && !errors.email ? 'button-enable' : 'button-disable'}`}                    
                            type="button" disabled={input_email && input_email.length !== 0 && !errors.email ? false : true}
                            onClick={(e)=>{verification_click(e,input_email)}}>
                                인증요청
                            </button>
                        </div>
                        {verification_state && !errors.email && <span className="login__userpassword-alram" 
                        style={{color : verification_state.code_state ? '#1273E4' : 'red'}}>
                            {verification_state.message}
                        </span>}
                        {errors.email && <span className="login__userpassword-alram">{errors.email.message}</span>}
                    </div>

                    {/* 인증코드 */}
                    <div className='email-prove-app__container-section2-code-wrapper'>
                        <input type="text" placeholder="인증코드를 입력해 주세요" className={`email-prove-app__container-section2-part2`} autoComplete="off"
                        {...register('code')}></input>
                        <div className='email-prove-app__timer-container'>
                           <span ref={timer} className="email-prove-app__timer"></span>
                        </div>

                        {errors.code && <span className="login__userpassword-alram">{errors.code.message}</span>}
                    </div>

                    {/* submit */}
                    <input type='submit' value='인증 확인' className={`email-prove-app__container-section2-btn 
                     ${isValid ? 'button-enable' : 'button-disable'}`}  disabled={isValid ? false : true}
                    ></input>   
                </form>
            </div>
        </div>
    )
}

export default Email_prove