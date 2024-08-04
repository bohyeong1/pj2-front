import React, {useState, useRef} from "react";
import './Private-management.css'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Pri_side_menu from "../../../utilComponent/menu/pri-side-menu/Pri-side-menu";
import Footer from "../../../utilComponent/menu/footer/Footer";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/UtilFunction";
import AuthModal from "../../../utilComponent/modal/authModal/AuthModal";

function Private_management(){

    // ref
    const pri_man_form = useRef()

    const [modifyState, setModifyState] = useState(false)
    const [modalState, setModalState] = useState(false)

    ///로그데이터
    const logData = sessionStorage.getItem('userData') || localStorage.getItem('userData')
    const logDataParse = JSON.parse(logData) || null


    //모달 스테이트 제어
    function AuthModalState(){
        setModalState(!modalState)
    }

    ///수정기능
    function modifyUser(){
        setModifyState(true)
    }

    // 유저정보 업데이트
    async function pri_man_submit(e){
        e.preventDefault()
        const name = pri_man_form.current.userName.value
        const email = pri_man_form.current.userEmail.value
        const nickname = pri_man_form.current.userNickname.value

        const updateData = await connectData(`${default_data.d_base_url}/api/users/update`, 'PUT',{
            email : email,
            name : name,
            nickname : nickname,
            userId : logDataParse.userId
        })
        if(updateData.code !== 200){
            alert('형식에 맞지 않는 데이터입니다.')
        }else{
            alert('개인정보 수정에 성공하셨습니다!')
            setModifyState(false)
        }
    }

    console.log(logDataParse)

    return(
        <div className="Private_management-container">
            <Main_menu></Main_menu>
            <div className="Private_management-content">
                <Pri_side_menu data={default_data.pri_sidemenu}></Pri_side_menu>
                <div className="pri-man-con-main">
                    <div className="pri-man-con-main-title">내 정보 관리</div>
                    <div className="pri-man-con-main-sec1">
                        <div className="pri-man-con-main-sec1-s1">회원 정보</div>
                        <div className="pri-man-con-main-sec1-s2">
                            <div className="pri-man-con-m-s1-s2-b1">수정할 정보를 입력해 주세요</div>
                            <div className="pri-man-con-m-s1-s2-b2" onClick={AuthModalState}>수정하기</div>
                        </div>
                    </div>
                    <form className="pri-man-con-main-sec2" ref={pri_man_form}>
                        <div className="inputbox">
                            <label>이름</label>
                            <input readOnly={modifyState ? false : true} type="text" id="userName" placeholder={logDataParse.name}></input>
                        </div>
                        <div className="inputbox">
                            <label>닉네임</label>
                            <input readOnly={modifyState ? false : true}  type="text" id="userNickname" placeholder={logDataParse.nickname}></input>
                        </div>
                        <div className="inputbox">
                            <label>이메일</label>
                            <input readOnly={modifyState ? false : true}  type="text" id="userEmail" placeholder={logDataParse.email}></input>
                        </div>
                        <button className="pri-man-submit-btn" style={{display:`${modifyState ? 'block' : 'none'}`}} onClick={pri_man_submit}>수정완료</button>

                    </form>
                    <div className="pri-man-con-main-sec3">
                        <div className="pri-man-con-main-sec3-s1">더 이상 보형짱닷컴을 이용하고 싶지 않으신가요?</div>
                        <div className="pri-man-con-main-sec3-s2">회원탈퇴</div>
                    </div>
                </div>
            </div>
            <AuthModal modalState={modalState} AuthModalState={AuthModalState} userData={logDataParse} modifyUser={modifyUser}></AuthModal>
            <div className="Private_management-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Private_management