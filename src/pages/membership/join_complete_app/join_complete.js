import React from "react";
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Congratulation from "../../../utilComponent/material/congratulation/congratulation";
import './join_complete.scss'
import '../../../manage_scss_style/commonness/commonness.scss'
import { useRef } from "react";
import useMembershipCompleteStyle from "../hook-store/style-hooks/membership_complete_style";
import { reference_store } from "../../../utilData/UtilFunction";

function Join_complete({login_user}){

    // =================================================
    // refs //    
    const cuty_bbozzak = useRef(null)

    // =================================================
    // hooks //  
    const {button_click} = useMembershipCompleteStyle(undefined,undefined,
        reference_store([
            {
                'cuty_bbozzak' : cuty_bbozzak
            }
        ])
    )

    return(
        <div className="join-complete__app">
            <Main_menu login_user={login_user}></Main_menu>
            <Congratulation></Congratulation>
            <div className="join-complete__wrapper" ref={cuty_bbozzak}>
                <div className="join-complete__container box-shadow-lv1">
                    <span>{`${login_user.userId}님`}</span>
                    <span>가입을 환영합니다!</span>
                    <div className="join-complete__box-wrapper">
                        <button className="join-complete__button" onClick={button_click}>숙소 둘러보기</button>
                    </div>
                </div>
                <img className="join-complete__img" src="/imgs/귀여운 꼬마.png"></img>
            </div>

        </div>
    )
}

export default Join_complete