import React from "react";
import './Login.css'
import Main_menu from "../../menu/main-menu/main-menu";
import Footer from "../../menu/footer/Footer";

const BASE_URL = 'http://127.0.0.1:3700'

function Login (){
    // 로그인 데이터 연결
    async function connectData(data, url){
        const dataJson = await fetch(`${BASE_URL}/api/users/login`)
    }


    return(
        <div className="Login-container">
            <Main_menu></Main_menu>
            <div className="Login-title">로그인</div>

            <div className="Login-content">
                <form className="log-con-main">

                    <input type="text" placeholder="아이디" className="user-Id" id="userId"></input>

                    <input type="password" placeholder="비밀번호" className="user-Password" id="userPassword"></input>

                    <input className="submitBtn" type="submit" value="로그인"></input>
                </form>
                <div className="Login-con2">
                    회원가입/ 계정찾기 / 비밀번호 찾기
                </div>
            </div>

            <div className="Login-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Login