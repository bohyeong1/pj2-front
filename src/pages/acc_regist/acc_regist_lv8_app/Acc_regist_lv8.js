import React, {useRef, useState} from "react";
import './Acc_regist_lv8.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import '../../../manage_scss_style/commonness/commonness.scss'
import Loading from "../../../utilComponent/material/loading/loading";
import session_storage from "../../../sessionStorage/session_storage";
import useAccRegistLv8Business from "../hook_store/business_hooks/acc_regist_lv8_business";
import useAccRegistLv8Style from "../hook_store/style_hooks/acc_regist_lv8_style";
import { state_store, reference_store } from "../../../utilData/UtilFunction";

function AccRegistLv8({login_user, this_step}){
    // =================================================
    // accomodation information //
    const accomodation = session_storage.load('house')

    // =================================================
    // this level's accomodation field name //
    const field_name = default_data.regist_field[this_step]

    // =================================================
    // refs //
    const regist_lv8_alarm = useRef()
    const regist_lv8_capacity_value = useRef()

    // =================================================
    // states //
    const [sellectData, setSellectData] = useState()
    const [title, setTitle] = useState()
    const [capacity, setCapacity] = useState()

    const [current_data, setCurrent_data] = useState()
    const [prev_data, setPrev_data] = useState()
    const [loading, setLoading] = useState(null)

    // =================================================
    // hooks //
    // business
    const {fetch_acc, register, errors, isValid, watch} = useAccRegistLv8Business()     
    // style
    const {lv8_text_input_change} = useAccRegistLv8Style(undefined, undefined,
        reference_store([
            {
                'regist_lv8_alarm' : regist_lv8_alarm
            }
        ])
    )

    return(
        loading === false ? <Loading></Loading> :
        <div className="Acc-regist-lv8__container">
            <Main_menu login_user = {login_user}></Main_menu>
            <div className="Acc-regist-lv8__content">
                <div className="Acc-regist-lv8__content-title">
                    <span>숙소를 대표하는 이름과 인원을 선택해 주세요!</span>
                </div>

                <div className="Acc-regist-lv8__content-section1">                    
                    <div className="Acc-regist-lv8__content-section1-box1-title">
                        <span>숙소 이름</span>
                        <div className="Acc-regist-lv8__section-box">
                            <div></div>
                        </div>
                    </div>

                    <div className="Acc-regist-lv8__content-section1-wrapper">
                        <form className="Acc-regist-lv8__content-section1-box1">                        
                            <textarea  className="Acc-regist-lv8__content-section1-box1-text1 border-textarea" maxLength={19}
                            type='text' spellCheck={false} placeholder='숙소를 설명하는 이름을 지어주세요!'  onChange={lv8_text_input_change}></textarea>
                        </form>

                        <div className="Acc-regist-lv8__content-section1-box2">
                            <div ref={regist_lv8_alarm} className="Acc-regist-lv8__content-section1-box2-text1">0/20</div>
                        </div> 
                    </div>                                       
                </div>

                <div className="Acc-regist-lv8__content-section2">
                    <div className="Acc-regist-lv8__content-section2-title">
                        <span>수용 인원</span>
                        <div className="Acc-regist-lv8__section-box">
                            <div></div>
                        </div>
                    </div>
                    <div className="Acc-regist-lv8__content-section2-box1">
                        <button id="Ac_re_lv8_btn" className={`Acc-regist-lv8__content-section2-box1-part1-lb`} onClick={(e)=>{
                            e.stopPropagation()

                            regist_lv8_capacity_value.current.innerText = Number(regist_lv8_capacity_value.current.innerText)-1

                            if(regist_lv8_capacity_value.current.innerText==='0'){
                                e.target.disabled = true
                            }else{
                                const rb_btn = document.querySelector(`.Acc-regist-lv8__content-section2-box1-part1-rb`)
                                rb_btn.disabled=false
                                }
                                setCapacity(Number(regist_lv8_capacity_value.current.innerText))        /////capacity값 스테이트에 담기
                                } 
                        }>-</button>

                        <div className="Acc-regist-lv8__content-section2-box1-part1-text1">
                            <span ref={regist_lv8_capacity_value} className="Acc-regist-lv8__content-section2-box1-part1_val">1</span>
                            <span>명</span>
                        </div>

                        <button id="Ac_re_lv8_btn" className={`Acc-regist-lv8__content-section2-box1-part1-rb`} onClick={(e)=>{
                            e.stopPropagation()
                            console.log('확인')
                            regist_lv8_capacity_value.current.innerText = Number(regist_lv8_capacity_value.current.innerText)+1

                                if(regist_lv8_capacity_value.current.innerText==='20'){
                                    e.target.disabled = true
                                }else{
                                    const lb_btn = document.querySelector(`.Acc-regist-lv8__content-section2-box1-part1-lb`)
                                    lb_btn.disabled=false     
                                }
                                setCapacity(Number(regist_lv8_capacity_value.current.innerText))        /////capacity값 스테이트에 담기
                            }        
                        }>+</button>
                    </div>                   
                </div>
            </div>

            <div className="Acc-regist-lv8__footer">
                <Host_footer fetchHandlerFun = {fetch_acc} dropData = {sellectData}></Host_footer>
            </div>
        </div>
    )
}
// fetch_handler={fetch_acc} drop_data={current_data} button_state={current_data.length > 0 ? true : false} fetch_state={true}
export default AccRegistLv8