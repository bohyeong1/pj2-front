import React from "react";
import './Acc_regist_lv12.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import Congratulation from "../../../utilComponent/material/congratulation/congratulation";
import '../../../manage_scss_style/commonness/commonness.scss'
import useAccRegistLv12Business from "../hook_store/business_hooks/acc_regist_lv12_business";

function AccRegistLv12({login_user, this_step}){

    // =================================================
    // hooks //
    // business
    const {link_button1, link_button2} = useAccRegistLv12Business()

    return(
        <div className="Acc-regist-lv12__container">
            <Congratulation></Congratulation>
            <Main_menu login_user = {login_user}></Main_menu>

            <div className="Acc-regist-lv12__content">
                <div className="Acc-regist-lv12__content-title">
                    <span>등록이 완료 되었습니다!</span>                    
                </div>
                <div className="Acc-regist-lv12__content-section1">
                    <div className="Acc-regist-lv12__content-section1-part1">
                        <button className="Acc-regist-lv12__btn" onClick={link_button1}>리스트 페이지 바로가기</button>
                        <button className="Acc-regist-lv12__btn" onClick={link_button2}>메인 페이지 바로가기</button>
                    </div>
                    <div className="Acc-regist-lv12__content-section1-part2">
                        <div>
                            <span>숙박 플랫폼의 새로운 이름,</span>
                            <span>보형짱닷컴</span>
                        </div>
                        <div>
                            <span>여러분과 함께 성장하는 보형짱닷컴이 되겠습니다!</span>
                        </div>
                    </div>
                </div>
                <div className="Acc-regist-lv12__content-section2">
                    <img className="Acc-regist-lv12__img" src="/imgs/regist_complete.png"></img>
                </div>
            </div>

            <div className="Acc-regist-lv12__footer">
                <Host_footer></Host_footer>
            </div>
        </div>
    )
}

export default AccRegistLv12