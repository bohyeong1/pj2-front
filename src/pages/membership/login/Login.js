import React, {useState} from "react";
import './Login.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Footer from "../../../menu/footer/Footer";
import { useNavigate,NavLink } from "react-router-dom";

const BASE_URL = 'http://127.0.0.1:3700'

function Login (){

    const navigate = useNavigate()

    //state
    const [logState, setLogState] = useState(false)

    // 로그인 데이터 연결
    async function connectData(data, url){
        // console.log(data)
        const userJson = await fetch(`${url}/api/users/login`,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify({
                userId:data.id,
                password:data.password
            })
        })   
        
        const user = await userJson.json()
        return user
    }

    // 데이터 서브밋
    async function submit(e){
        e.preventDefault()

        const id = await e.target.userId.value
        const password = await e.target.userPassword.value

        const data = await connectData({id, password}, BASE_URL)

        e.target.userId.value=''
        e.target.userPassword.value=''

        if(data.code === 401){
            // setDataState(!dataState)
            alert(data.message)
        }else{
            if(logState){
                localStorage.setItem('userData',JSON.stringify(data))
            }else{
                sessionStorage.setItem('userData',JSON.stringify(data))
            }

            navigate('/')
        }
    }


    return(
        <div className="Login-container">
            <Main_menu></Main_menu>
            <div className="Login-title">로그인</div>

            <div className="Login-content">
                <form className="log-con-main" onSubmit={submit}>
                    <div className="log-c-wrapper">
                        <div className="log-c-text">아이디</div>
                        <input type="text" placeholder="아이디" className="user-Id" id="userId"></input>
                    </div>

                    <div className="log-c-wrapper">
                        <div className="log-c-text">비밀번호</div>
                        <input type="password" placeholder="비밀번호" className="user-Password" id="userPassword"></input>
                    </div>


                    <div className="log-c-state">
                        <img className= {`log-c-state-img ${logState ? 'log-active' : ''}`} onClick={()=>{setLogState(!logState)}}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAERUlEQVR4nO2aXYhVVRTHf6ONM4aaNuo4CRn4kmkiJqLgixSW4RdG0KQ9WKQpaToYgoKj+KLpQ5LYk2D05IM+mJZipBhSlIipqY2DD+YH2hcY6ExWIwv/J5Zzz/Wer3vOEP7hMGfO3nvttfdee63/2vvCQ/x/MQiYA2wG9gPngd+BTuAvvbcBnwNbVLeBHoI6YB5wEPgb6Ir53AEOAPOBPkUMoC/QAlxxSnUAh4G1mu1RWqVaPfb+jMrWA0e0UkF7k9WS54CmA+1OgRPAQmBgAllmWu8AZ5y8duAlqoh6YLvr8KQGVZOBbJMxCzgn2f8CH6vPTNEIHFcnt4EVwCNZd8I9E1wtB2F9fQMMc+VJVv0/PAVckGD7O47q4zngkp4mfXsbuAZMTLoSwSC+A4aQH5qA0Xp/3jmGBXEF1TtzskH0pxg8rRhkemxMIiDY2BdyXgmPwc5D7gZ6ERPT3cbOY0+UC7ZHpYdZxqP6PjxOsAtmwQJUEagBPpEOPwNP6PtbwI9RPWaLixPVcLFRsEY6/NnNIk7ru3mwissZ0A4zryLwqgLiPwqSHs2OzljMKYt5jnZkEbHjYiJw6wFm3cvRme6DvA8HVcm4U96wTXxZ/e+IYPp7ylUYJCrekZYKJIDFqB+k4KEKZtMkPS1APhZWYY4EfUW+6A3sU9/nIk5i4JanhRVuUaHlE3niQ/X7CzAyYpsP1KY1rDCYldnkh8UuKZsS07N1KaUuQZsKLbPLAy8q1TVX+0bMtmNdrCvBbyp8PIZt7wLeJD5ssv5QfxsSerguRf0SBMlM1Jz5FZfNLY2hxFDgotruShiv+qq9xZzUAzG8qwgclWJbanAshAjGRZ3bW6lNK8B82bq13fYAqm0z/6nqXY7DYkMwRHJuhBX+lGKzz9XsWPudZchmq8pvAs+SDqNd3CnB/pTud6qUNBl7u52ABETQIvJM0mOu66cEmzMIiJNcWvol0A+YrATNvi0jG6yXvE1hhbNVaKeFaWBmc9Xl+tfd/skKRyVzRljhQEcajUCmwUjnYu35IsMkrUGE0Z4B5SodUMeLMuhwmBjt2YzZ9BLpaJSqLF7POLGy2XuS7FAjWmI6vlYp0ATJzcv0PMxy1KRi4F6uyqcKPHwIQ61LcyNRonp3TLqSnoNV0um8LCcyxQ64zHiKxwTpYkH1hbiNt7mLF2OsRaHRufKtSQTUKaCZgO8LOsQe4A7Sv01zLTdYNhnQ7jxXptENol3/k/aip80JHJ/TnrioPo2Vj8hK8FBnZrbp3q90ZJkQtfJOHc6cMr/SsD3zkeNPp0TasrwMPePS563Vvqqe5kwtOMlYnCCzDCjMEkc7urQnY7vYNKvznqhCoECn6HWrEp8xUrSPngZ9s7J1wNfdfjBgF59L4wS7rAfUrOzyTsKfcOwTASzkJxzlfP5MHWd+pnz6V61Up97PKj3dpP1V1AXrQ1Bt3AVSX1y/4Zx+TQAAAABJRU5ErkJggg=="></img>
                        <div>로그인 상태 유지</div>
                    </div>

                    <input className="submitBtn" type="submit" value="로그인"></input>
                </form>
                <div className="Login-con2">
                    <div className="Login-con2-b1">계정이 없으신가요?</div>
                    <NavLink to='/Membership_join' className="Login-con2-b2">회원가입</NavLink>
                </div>
            </div>

            <div className="Login-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Login