import React,{useRef, useState} from "react";
import './Acc_regist_lv2.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import session_storage from "../../../sessionStorage/session_storage";
import '../../../manage_scss_style/commonness/commonness.scss'
import useAccRegistLv2Business from "../hook_store/business_hooks/acc_regist_lv2_business";
import { state_store, reference_store } from "../../../utilData/UtilFunction";
import Loading from "../../../utilComponent/material/loading/loading";

function AccRegistLv2({login_user, this_step}){
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
    const [prev_data, setPrev_data] = useState(accomodation[field_name] ? accomodation[field_name] : null)
    const [fetch_state, setFetch_state] = useState(null)
    const [loading, setLoading] = useState(null)

    // =================================================
    // hooks //
    // business
    const {fetch_acc, click_box} = useAccRegistLv2Business(undefined,
        state_store([
            {
                'current_data' : current_data,
                'setCurrent_data' : setCurrent_data
            },
            {
                'prev_data' : prev_data,
                'setPrev_data' : setPrev_data
            },
            {
                'fetch_state' : fetch_state,
                'setFetch_state' : setFetch_state
            },
            {
                'loading' : loading,
                'setLoading' : setLoading
            }
        ]),
        reference_store([
            {
                'categories' : categories
            }
        ])
    ) 

    return(
        loading === false ? <Loading></Loading> :
        <div className="Acc-regist-lv2__container">
            <Main_menu login_user={login_user}></Main_menu>
            <div className="Acc-regist-lv2__content">
                <div className="Acc-regist-lv2__content-title">
                    <span>숙소의 유형을 선택해 주세요!</span>
                </div>
                <div className="Acc-regist-lv2__content-section1">
                    {default_data.d_house_space.map((ele,id)=>{
                        return(
                            <div className="Acc-regist-lv2__content-section1-box not-user-sellect acc-regist-sellect-box" 
                            ref={(el)=>{categories.current[id]=el}} key={id} onClick={()=>{click_box(id)}}>
                                <img src={ele.url}/>
                                <div className="Acc-regist-lv2__content-section1-box-text1">{ele.name}</div>
                                <div className="Acc-regist-lv2__content-section1-box-text2">{ele.text}</div>
                            </div>
                        )
                    })}                    
                </div>
            </div>
            <div className="Acc-regist-lv2__footer">
                <Host_footer fetch_handler={fetch_acc} drop_data={current_data} button_state={current_data ? current_data : false} fetch_state={fetch_state}></Host_footer>
            </div>

        </div>
    )
}

export default AccRegistLv2