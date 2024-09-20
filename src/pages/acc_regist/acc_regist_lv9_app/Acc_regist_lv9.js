import React, {useRef, useState} from "react";
import './Acc_regist_lv9.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/UtilFunction";
import '../../../manage_scss_style/commonness/commonness.scss'
import Loading from "../../../utilComponent/material/loading/loading";
import session_storage from "../../../sessionStorage/session_storage";
import { state_store, reference_store } from "../../../utilData/UtilFunction";
import useAccRegistLv9Business from "../hook_store/business_hooks/acc_regist_lv9_business";
import useAccRegistLv9Style from "../hook_store/style_hooks/acc_regist_lv9_style";

function AccRegistLv9({login_user, this_step}){
    // =================================================
    // accomodation information //
    const accomodation = session_storage.load('house')

    // =================================================
    // this level's accomodation field name //
    const field_name = default_data.regist_field[this_step]

    // =================================================
    // refs //
    const ac_regi_lv9_stringstate = useRef()  //글자개수
    const ac_regi_lv9_alert = useRef()  //경고 text
    const ac_regi_lv9_input = useRef()
    const regist_lv9_gurabox = useRef(null)

    // =================================================
    // states //
    const [sellectData, setSellectData] = useState()

    // =================================================
    // hooks //
    // business
    const {fetch_acc} = useAccRegistLv9Business()
    // style
    const {} = useAccRegistLv9Style()

    function lv8TextInputChange(){
        const row = ac_regi_lv9_input.current.value.length
        regist_lv9_gurabox.current.textContent = ac_regi_lv9_input.current.value

        ac_regi_lv9_stringstate.current.innerText = `${row}/50`
        if(row>50){
            ac_regi_lv9_alert.current.style.display = 'block'
        }else{
            ac_regi_lv9_alert.current.style.display = 'none'
        }
    }

    return(
        <div className="Acc-regist-lv9__container">
            <Main_menu login_user={login_user}></Main_menu>
            <div className="Acc-regist-lv9__content">
                <div className="Acc-regist-lv9__content-title">
                숙소를 설명하는 글을 작성해 주세요! 
                    <div className="Acc-regist-lv9__content-sub-title">최대 400자 까지 작성 가능합니다</div> 
                </div>

                <div className="Acc-regist-lv9__content-section1">
                    <div className="Acc-regist-lv9__content-section1-box1">
                        <textarea  className="Acc-regist-lv9__content-section1-box1-text1 border-textarea" ref={ac_regi_lv9_input} type='text' spellCheck={false}
                        placeHolder='숙소를 설명하는 글을 작성해주세요!'  onChange={lv8TextInputChange}></textarea >
                    </div>

                    <div className="Acc-regist-lv9__gurabox" ref={regist_lv9_gurabox}></div>

                    <div className="Acc-regist-lv9__content-section1-box2">
                        <div ref={ac_regi_lv9_stringstate} className="Acc-regist-lv9__content-section1-box2-text1">0/400</div>
                        <div ref={ac_regi_lv9_alert} className="Acc-regist-lv9__content-section1-box2-text2" style={{color:'red', display:'none'}}>400자 까지 입력할 수 있습니다</div>
                    </div>                    
                </div>
            </div>
            <div className="Acc-regist-lv9__footer">
                <Host_footer fetchHandlerFun = {fetch_acc} dropData = {sellectData}></Host_footer>
            </div>
        </div>
    )
}

export default AccRegistLv9