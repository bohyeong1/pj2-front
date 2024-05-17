import React, {useState, useEffect} from "react";
import './Membership-join.css'
import Main_menu from "../../menu/main-menu/main-menu";
import Footer from "../../menu/footer/Footer";



const BASE_URL = 'http://127.0.0.1:3700'

function Membership_join(){

    const [dataState, setDataState] = useState(true)

    if(dataState === false){
        alert('비밀번호가 틀리셨습니다.')
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
                confirmPassword:data.userPasswordConfirm
            })
        })   
        
        const user = await userJson.json()
        return user
    }

    // 데이터 서브밋
    async function submit(e){
        e.preventDefault()

        const name = e.target.userName.value
        const email = await e.target.userEmail.value
        const id = await e.target.userId.value
        const password = await e.target.userPassword.value
        const userPasswordConfirm = await e.target.userPasswordConfirm.value
        const sex = await e.target.userSex.value

        const data = await connectData({name, email, id, password, userPasswordConfirm, sex}, BASE_URL)

        e.target.userName.value=''
        e.target.userEmail.value=''
        e.target.userId.value=''
        e.target.userPassword.value=''
        e.target.userPasswordConfirm.value=''
        e.target.userSex.value=''

        if(data.code === 401){
            setDataState(!dataState)
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
                    <input type="text" placeholder="성별" id="userSex" className="Membership_join-content-sec2-s6"></input>
                    <input type='submit' value='가입' className="Membership_join-content-sec2-btn"></input>                        
                </form>
                <div className="Membership_join-content-sec3">
                    링크 이동
                </div>
            </div>

            <div className="Membership_join-footer">
                <Footer></Footer>
            </div>
        </div>
    )

}

export default Membership_join