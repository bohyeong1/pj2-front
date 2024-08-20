import './email_prove.scss'
import '../../../manage_scss_style/commonness/commonness.scss'
import Main_menu from '../../../utilComponent/menu/main-menu/main-menu'
import '../../../manage_scss_style/commonness/commonness.scss'
import useMembershipEmailBusiness from '../hook-store/business-hooks/membership_email_business'

function Email_prove(){

    const {register, handleSubmit, errors, isValid, submit, input_email} = useMembershipEmailBusiness()

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
                            이메일 인증을 진행해 주세요!
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
                    <div className="email-prove-app__container-section2-input-wrapper">
                        <input type="text" placeholder="이메일" className={`email-prove-app__container-section2-part1 ${errors.input_email ? 'input-invalid' : ''}`} 
                                {...register('input_email')} autoComplete="off">
                        </input>

                        <button className={`email-prove-app__container-section2-input-button button-enable
                        `}                    
                        type="button">
                            인증요청
                        </button>
                    </div>
                    {/* 인증코드 */}
                    <input type="text" placeholder="인증코드를 입력해 주세요" className={`email-prove-app__container-section2-part2`} autoComplete="off"></input>

                    {/* submit */}
                    <input type='submit' value='인증 확인' className={`email-prove-app__container-section2-btn 
                     button-enable`}
                    ></input>   
                </form>
            </div>
        </div>
    )
}

export default Email_prove