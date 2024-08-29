import React, {useRef, useState} from "react";
import './Acc_regist_lv1.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import default_data from '../../../utilData/defaultData'
import session_storage from "../../../sessionStorage/session_storage";
import useAccRegistLv1Business from "../hook_store/business_hooks/acc_regist_lv1_business";
import { state_store, reference_store } from "../../../utilData/UtilFunction";
import '../../../manage_scss_style/commonness/commonness.scss'

function AccRegistLv1({login_user, this_step}){
    // =================================================
    // refs //
    const categories = useRef([])

    // =================================================
    // accomodation information //
    const accomodation = session_storage.load('house')
   
    // =================================================
    // this level's accomodation field name //
    const field_name = default_data.regist_field[this_step]

    // =================================================
    // states //
    const [current_data, setCurrent_data] = useState(null)
    const [prev_data, setPrev_data] = useState()
    const [button_state, setButton_state] = useState(null)
    const [fetch_state, setFetch_state] = useState(null)

    // =================================================
    // hooks //
    const {fetch_acc, click_box} = useAccRegistLv1Business({
        'field_name' : field_name,
        'accomodation' : accomodation
        },
        state_store([
            {
                'current_data' : current_data,
                'setCurrent_data' : setCurrent_data
            },
            {
                'prev_data' : prev_data,
                'setPrev_data' : setPrev_data
            }
        ]),
        reference_store([
            {
                'categories' : categories
            }
        ]),
        {
            'login_user' : login_user
        }
    )

    return (
        <div className="Acc-regist-lv1__container">
            <Main_menu login_user={login_user}></Main_menu>
            <div className="Acc-regist-lv1__content">
                <div className="Acc-regist-lv1__content-title">
                    숙소 유형을 선택해 주세요!
                </div>
                <div className="Acc-regist-lv1__content-section1">
                    {default_data.d_category_icon.map((ele,id)=>{
                        return(
                            <div className="Acc-regist-lv1__content-section1-box not-user-sellect"  ref={(el)=>{categories.current[id]=el}} key={id} onClick={()=>{click_box(id)}}>
                                <img src={ele.url}/>
                                <div className="Acc-regist-lv1__content-section1-box-text">{ele.name}</div>
                            </div>
                        )
                    })}                    
                </div>
            </div>
            <div className="Acc-regist-lv1__footer">
                <Host_footer fetch_handler = {fetch_acc} dropData = {current_data} button_state={true} fetch_state={true}></Host_footer>
            </div>
        </div>
    )
}

export default AccRegistLv1