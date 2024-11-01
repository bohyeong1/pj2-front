import React, {useRef, useState} from "react";
import './AuthModal.css'
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/UtilFunction";

function AuthModal({AuthModalState, modalState, userData, modifyUser}){

    const alertRef = useRef()
    const authForm = useRef()

    const [authState, setAuthState] = useState(false)

    async function submitAuth(e){
        e.preventDefault()
        const password = e.target.password.value
        const password_confirm = e.target.password_confirm.value

        if(password === password_confirm){
            const authData = await connectData(`${default_data.d_base_url}/api/users/login`, 'POST', {
                userId : userData.userId,
                password : password
            })
            if(authData.code === 401){
                setAuthState(true)   
            }else{
                setAuthState(false)
                AuthModalState()
                authForm.current.password_confirm.value=null
                authForm.current.password.value=null
                modifyUser()
            }
        }else{
            setAuthState(true)
            
        }
    }

    return (
        <div className="AuthModal" style={{display : `${modalState ? 'block' : 'none'}`}}>
            <div className="AuthModal-wrapper"></div>
            <div className="AuthModal-container">
                <div className="AuthModal-c-header">
                    <div className="AuthModal-con-s1-b1">
                        <div className="AuthModal-c-s1-b1-close">
                            <img src={default_data.d_imgs.close} style={{cursor:'pointer'}} onClick={()=>{AuthModalState()
                                                                                                    authForm.current.password_confirm.value=null
                                                                                                    authForm.current.password.value=null
                                                                                                    setAuthState(false)
                            }}></img>
                        </div>

                    </div>

                    <div className="AuthModal-con-s1-b2">비밀번호 확인</div>
                    <div style={{width:'40px'}}></div>
                </div>
                <form className="AuthModal-c-content" onSubmit={submitAuth} ref={authForm}>
                    <div className="AuthModal-c-c-b">
                        <label>비밀번호</label>
                        <input placeholder="비밀번호" type="password" id="password"></input>
                    </div>
                    <div className="AuthModal-c-c-b">
                        <label>비밀번호 확인</label>
                        <input placeholder="비밀번호 확인" type="password" id="password_confirm"></input>
                    </div>
                    <span ref={alertRef} style={{color:'red', display:`${authState ? 'block' : 'none'}`}}>비밀번호가 일치하지 않습니다.</span>
                    <input type="submit" className="AuthModal-submit" value={'확인'}></input>
                </form>
            </div>
        </div>
    )


}

export default AuthModal