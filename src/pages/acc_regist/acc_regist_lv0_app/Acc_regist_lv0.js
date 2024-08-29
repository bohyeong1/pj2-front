import React, {useState} from "react";
import './Acc_regist_lv0.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import useAccRegistLv0Business from "../hook_store/business_hooks/acc_regist_lv0_business";
import Loading from "../../../utilComponent/material/loading/loading";
import { state_store } from "../../../utilData/UtilFunction";

function Acc_regist_lv0({login_user}){
    // =================================================
    // state //
    const [loading, setLoading] = useState(null)
    const [button_state, setButton_state] = useState(true)
    const [fetch_state, setFetch_state] = useState(null)

    // =================================================
    // hooks //
    const {fetch_acc} = useAccRegistLv0Business(undefined,
        state_store([
            {
                'loading' : loading,
                'setLoading' : setLoading
            },
            {
                'fetch_state' : fetch_state,
                'setFetch_state' : setFetch_state
            }
        ])
    )

    return(
        loading === false ? <Loading></Loading> :
        <div className='Acc-regist-lv0__container'>
            <Main_menu login_user={login_user}></Main_menu>
            <div className="Acc-regist-lv0__content">
                <div className="Acc-regist-lv0__content-section1">
                    <span>간단한 절차를 진행해 주세요!</span>
                </div>
                <div className="Acc-regist-lv0__content-section2">
                    <div className="Acc-regist-lv0__content-section2-part1">
                        <div className="Acc-regist-lv0__content-section2-part1-text1">
                            <span>1.</span>
                            <span className="Acc-regist-lv0__content-section2-logo">숙소 정보를 입력하세요</span>
                        </div>
                        <div className="Acc-regist-lv0__content-section2-part1-text2">
                            <div>숙소의 위치와 숙박 가능인원 등 기본 정보를 입력하세요</div>
                            <img className="Acc-regist-lv0__img" src={default_data.d_imgs.bedroom}></img>
                        </div>
                    </div>
                    <div className="Acc-regist-lv0__content-section2-part2">
                        <div className="Acc-regist-lv0__content-section2-part2-text1">
                            <span>2.</span>
                            <span className="Acc-regist-lv0__content-section2-logo">숙소 이미지를 등록하세요</span>
                        </div>
                        <div className="Acc-regist-lv0__content-section2-part2-text2">
                            <div>숙소를 돋보이게 하는 이미지를 5장 제출하세요</div>
                            <img className="Acc-regist-lv0__img" src={default_data.d_imgs.decoroom}></img>
                        </div>
                    </div>
                    <div className="Acc-regist-lv0__content-section2-part3">
                        <div className="Acc-regist-lv0__content-section2-part3-text1">
                            <span>3.</span>
                            <span className="Acc-regist-lv0__content-section2-logo">등록을 완료하세요</span>
                        </div>
                        <div className="Acc-regist-lv0__content-section2-part3-text2">
                            <div>숙소 요금을 설정하고 등록을 완료하세요</div>
                            <img className="Acc-regist-lv0__img" src={default_data.d_imgs.door}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Acc-resist-lv0__footer">
                <Host_footer button_state = {button_state} fetch_handler = {fetch_acc} drop_data = {null} fetch_state = {fetch_state}></Host_footer>
            </div>
        </div>
    )

}

export default Acc_regist_lv0