import React, {useState} from "react";
import './login.scss'
import '../../../manage_scss_style/commonness/commonness.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import UseMembershipLoginBusiness from "../hook-store/business-hooks/membership_login_business";
import { state_store } from "../../../utilData/UtilFunction";
import { NavLink } from "react-router-dom";


function Login (){

    // =================================================
    // state //
    const [log_method, setLog_method] = useState(false)

    // =================================================
    // hooks //
    // business
    const {register, handleSubmit, errors, isValid, click_login_method, submit} = UseMembershipLoginBusiness(undefined, state_store([
        {
            'log_method':log_method,
            'setLog_method':setLog_method
        }
    ]))


    return(
        <div className="login__container">
            <Main_menu></Main_menu>
            <div className="login__title">회원 로그인</div>

            <div className="login__content">
                <form className="login__form" onSubmit={handleSubmit(submit)}>
                    <div className="login__section">
                        <div className="login__section-text">
                            <span>아이디</span>
                            <div className="login__section-box">
                                <div></div>
                            </div>
                        </div>
                        <input type="text" placeholder="bohyeongzzang123" className={`login__userid ${errors.id ? 'input-invalid' : ''}`}
                        {...register('id')} autoComplete="off"></input>
                        {errors.id && <span className="input-alert-text">{errors.id.message}</span>}
                    </div>

                    <div className="login__section">
                        <div className="login__section-text">
                            <span>비밀번호</span>
                            <div className="login__section-box">
                                <div></div>
                            </div>
                        </div>
                        <input type="password" placeholder="비밀번호를 입력하세요." className={`login__userpassword ${errors.password ? 'input-invalid' : ''}`}
                        {...register('password')} autoComplete="off"></input>
                        {errors.password && <span className="input-alert-text">{errors.password.message}</span>}
                    </div>

                    <div className="login__state">
                        <img className= {`login__state-img ${log_method ? 'login__active' : ''}`} onClick={click_login_method}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAERUlEQVR4nO2aXYhVVRTHf6ONM4aaNuo4CRn4kmkiJqLgixSW4RdG0KQ9WKQpaToYgoKj+KLpQ5LYk2D05IM+mJZipBhSlIipqY2DD+YH2hcY6ExWIwv/J5Zzz/Wer3vOEP7hMGfO3nvttfdee63/2vvCQ/x/MQiYA2wG9gPngd+BTuAvvbcBnwNbVLeBHoI6YB5wEPgb6Ir53AEOAPOBPkUMoC/QAlxxSnUAh4G1mu1RWqVaPfb+jMrWA0e0UkF7k9WS54CmA+1OgRPAQmBgAllmWu8AZ5y8duAlqoh6YLvr8KQGVZOBbJMxCzgn2f8CH6vPTNEIHFcnt4EVwCNZd8I9E1wtB2F9fQMMc+VJVv0/PAVckGD7O47q4zngkp4mfXsbuAZMTLoSwSC+A4aQH5qA0Xp/3jmGBXEF1TtzskH0pxg8rRhkemxMIiDY2BdyXgmPwc5D7gZ6ERPT3cbOY0+UC7ZHpYdZxqP6PjxOsAtmwQJUEagBPpEOPwNP6PtbwI9RPWaLixPVcLFRsEY6/NnNIk7ru3mwissZ0A4zryLwqgLiPwqSHs2OzljMKYt5jnZkEbHjYiJw6wFm3cvRme6DvA8HVcm4U96wTXxZ/e+IYPp7ylUYJCrekZYKJIDFqB+k4KEKZtMkPS1APhZWYY4EfUW+6A3sU9/nIk5i4JanhRVuUaHlE3niQ/X7CzAyYpsP1KY1rDCYldnkh8UuKZsS07N1KaUuQZsKLbPLAy8q1TVX+0bMtmNdrCvBbyp8PIZt7wLeJD5ssv5QfxsSerguRf0SBMlM1Jz5FZfNLY2hxFDgotruShiv+qq9xZzUAzG8qwgclWJbanAshAjGRZ3bW6lNK8B82bq13fYAqm0z/6nqXY7DYkMwRHJuhBX+lGKzz9XsWPudZchmq8pvAs+SDqNd3CnB/pTud6qUNBl7u52ABETQIvJM0mOu66cEmzMIiJNcWvol0A+YrATNvi0jG6yXvE1hhbNVaKeFaWBmc9Xl+tfd/skKRyVzRljhQEcajUCmwUjnYu35IsMkrUGE0Z4B5SodUMeLMuhwmBjt2YzZ9BLpaJSqLF7POLGy2XuS7FAjWmI6vlYp0ATJzcv0PMxy1KRi4F6uyqcKPHwIQ61LcyNRonp3TLqSnoNV0um8LCcyxQ64zHiKxwTpYkH1hbiNt7mLF2OsRaHRufKtSQTUKaCZgO8LOsQe4A7Sv01zLTdYNhnQ7jxXptENol3/k/aip80JHJ/TnrioPo2Vj8hK8FBnZrbp3q90ZJkQtfJOHc6cMr/SsD3zkeNPp0TasrwMPePS563Vvqqe5kwtOMlYnCCzDCjMEkc7urQnY7vYNKvznqhCoECn6HWrEp8xUrSPngZ9s7J1wNfdfjBgF59L4wS7rAfUrOzyTsKfcOwTASzkJxzlfP5MHWd+pnz6V61Up97PKj3dpP1V1AXrQ1Bt3AVSX1y/4Zx+TQAAAABJRU5ErkJggg=="></img>
                        <div>로그인 상태 유지</div>
                    </div>
                    <input className={`login__button ${isValid ? 'button-enable' : 'button-disable'}`} disabled={!isValid} type="submit" value="로그인"></input>
                </form>
                <div className="login__go-join">
                    <div className="login__go-join-text">계정이 없으신가요?</div>
                    <NavLink to='/Agree' className="login__go-join-link">회원가입</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Login