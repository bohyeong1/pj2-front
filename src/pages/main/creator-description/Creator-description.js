import React from "react";
import './Creator-description.css'
import default_data from "../../../utilData/defaultData";
import { useNavigate } from "react-router-dom";

function Creator_description(){

    const navigator = useNavigate()

    return(
        <div className="Creator_description-container">
            <div className="Creator_description-box1">
                <div className="Creator_description-b1-c1">홈페이지 이용을 위해서 회원가입을 해주세요!</div>
                <div className="Creator_description-b1-c2">마일리지를 통해 숙소를 등록, 구매할 수 있습니다</div>
                <div className="Creator_description-b1-c3">
                    <button className="Creator_description-b1-c3-btn1" onClick={()=>{navigator('/Login')}}>회원가입</button>
                    <button className="Creator_description-b1-c3-btn2" onClick={()=>{navigator('/Terms_homepage')}}>약관 보러가기</button>
                </div>
            </div>
            <div className="Creator_description-box2">
                <img className="Creator_description-b2-d1" src={default_data.d_imgs.main_home1}></img>
                <div className="Creator_description-b2-d2">보형짱 닷컴</div>
                <img className="Creator_description-b2-d3" src={default_data.d_imgs.main_home2}></img>
                <img className="Creator_description-b2-d4" src={default_data.d_imgs.main_home3}></img>
            </div>

        </div>
    )

}

export default Creator_description