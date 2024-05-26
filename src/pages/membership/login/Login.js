import React from "react";
import './Login.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Footer from "../../../menu/footer/Footer";
import { useNavigate,NavLink } from "react-router-dom";

const BASE_URL = 'http://127.0.0.1:3700'

function Login (){

    const navigate = useNavigate()

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
            console.log(data.name)
            localStorage.setItem('log',data.token)
            localStorage.setItem('userName',data.name)
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