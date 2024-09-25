import React from "react";
import { useNavigate } from "react-router-dom";
import './Acc_regist_lv12.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import Congratulation from "../../../utilComponent/material/congratulation/congratulation";

function AccRegistLv12({login_user, this_step}){

    const navigator = useNavigate()

    return(
        <div className="Acc-regist-lv12__container">
            <Congratulation></Congratulation>
            <Main_menu login_user = {login_user}></Main_menu>

            <div className="Acc-regist-lv12__content">
                <div className="Acc-regist-lv12__content-title">
                    <span>등록이 완료 되었습니다!</span>                    
                </div>
                <div className="Acc-regist-lv12__content-section1">
                </div>
                <button className="Acc-regist-lv12__btn" onClick={()=>{navigator('/Acc_regist/Acc_manage')}}>등록한 숙소 보러가기</button>
            </div>

            <div className="Acc-regist-lv12__footer">
                <Host_footer></Host_footer>
            </div>


        </div>
    )
}

export default AccRegistLv12