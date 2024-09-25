import React from "react";
import './Acc_regist_start.css'
import { useNavigate } from "react-router-dom";
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import connectData from "../../../utilData/UtilFunction";
import default_data from "../../../utilData/defaultData";



function Acc_regist_start(){
    ///로그데이터
    const logData = sessionStorage.getItem('userData') || localStorage.getItem('userData')
    const logDataParse = JSON.parse(logData) || null

    const navigate = useNavigate()

    // console.log(logDataParse)

    //숙소 post요청 ( 초기생성 )
    async function registStart(){
        const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register`, 'POST', {seller : logDataParse._id}, localStorage.getItem('log'))
        console.log(homeData)

        if(homeData.code === 200){
            // console.log(homeData)
            sessionStorage.setItem('registData', JSON.stringify(homeData.newAccomodation))
        }else{
            alert('숙소등록에 실패하셨습니다!')
        }
        navigate('/Acc_regist/Acc_regist_lv0')
    }

    return(
        <div className="Acc_regist_start-container">
            <Main_menu></Main_menu>
            <div className="Acc_regist_start-content">
                <div className="Acc_regist_start-title">{`${logDataParse.name}님, 환영합니다!`}</div>
                <div className="Acc_regist_start-subtitle">
                    <img src={default_data.d_imgs.home}></img>
                    <span>숙소 등록 시작하기</span>
                </div>
                <button className="Acc_regist_start-btn" onClick={registStart}>숙소 등록하기</button>
            </div>
        </div>
    )
}

export default Acc_regist_start