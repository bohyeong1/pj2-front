import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './join.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";

const BASE_URL = 'http://127.0.0.1:3700'

function Join(){

    const [dataState, setDataState] = useState(true)
    const navigate = useNavigate()

    if(dataState === false){
        alert('유효하지 않은 정보를 입력하셨습니다.')
    }

    // 데이터 서버와 연결
    async function connectData(data, url){
        const userJson = await fetch(`${url}/api/users/register`,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify({
                name:data.name,
                email:data.email,
                userId:data.id,
                password:data.password,
                nickname:data.userNickname,
                confirmPassword:data.userPasswordConfirm
            })
        })   
        
        const user = await userJson.json()
        return user
    }

    // 데이터 서브밋
    async function submit(e){
        e.preventDefault()

        const name = (e.target.userName.value.length === 0 || !e.target.userName.value) ? null : e.target.userName.value
        const email = await e.target.userEmail.value
        const id = await e.target.userId.value
        const password = await e.target.userPassword.value
        const userPasswordConfirm = await e.target.userPasswordConfirm.value
        const userNickname = await e.target.userNickname.value

        const data = await connectData({name, email, id, password, userPasswordConfirm, userNickname}, BASE_URL)

        e.target.userName.value=''
        e.target.userEmail.value=''
        e.target.userId.value=''
        e.target.userPassword.value=''
        e.target.userPasswordConfirm.value=''
        e.target.userNickname.value=''

        // console.log(data)
        if(data.code === 401){
            setDataState(!dataState)
        }else{
            console.log(data)
            sessionStorage.setItem('userData',JSON.stringify(data.newUser))
            navigate('/Mem_join_complete')
        }
    }


    return(
        <div className="Membership_join-container">
            <Main_menu></Main_menu>
            <div className="Membership_join-content">
                <div className="Membership_join-content-sec1">
                    <div className="Membership_join-content-sec1-s1">보형짱 닷컴</div>
                    <div className="Membership_join-content-sec1-s2">
                        <div className="level-bar-lv2"></div>
                    </div>
                    <div className="Membership_join-content-sec1-s3">
                        보형짱 닷컴 계정으로 사용할 <br/> 아이디를 만들어 주세요
                    </div>
                </div>
                <form className="Membership_join-content-sec2" onSubmit={submit}>                                                       
                    <input type="text" placeholder="아이디" id="userId" className="Membership_join-content-sec2-s1"></input>
                    <input type="password" placeholder="비밀번호" id="userPassword" className="Membership_join-content-sec2-s2"></input>
                    <input type="password" placeholder="비밀번호 확인" id="userPasswordConfirm" className="Membership_join-content-sec2-s3"></input>
                    <input type="text" placeholder="이름" id="userName" className="Membership_join-content-sec2-s4"></input>
                    <input type="text" placeholder="이메일" id="userEmail" className="Membership_join-content-sec2-s5"></input>
                    <input type="text" placeholder="닉네임" id="userNickname" className="Membership_join-content-sec2-s6"></input>
                    <input type='submit' value='가입' className="Membership_join-content-sec2-btn"></input>                        
                </form>

            </div>
        </div>
    )

}

export default Join