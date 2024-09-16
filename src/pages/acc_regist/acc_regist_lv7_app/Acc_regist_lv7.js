import React, {useRef, useState} from "react";
import './Acc_regist_lv7.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import '../../../manage_scss_style/commonness/commonness.scss'
import useAccRegistLv7Business from "../hook_store/business_hooks/acc_regist_lv7_business";
import useAccRegistLv7Style from "../hook_store/style_hooks/acc_regist_lv7_style";
import session_storage from "../../../sessionStorage/session_storage";
import { state_store, reference_store } from "../../../utilData/UtilFunction";
import Loading from "../../../utilComponent/material/loading/loading";

function AccRegistLv7({login_user, this_step}){
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
    const [current_data, setCurrent_data] = useState(accomodation[field_name] && accomodation[field_name] > 0 ? accomodation[field_name] : [])
    const [prev_data, setPrev_data] = useState(accomodation[field_name] && accomodation[field_name].length > 0 ? accomodation[field_name] : null)
    const [loading, setLoading] = useState(null)

    // =================================================
    // hooks //
    // business
    const {fetch_acc} = useAccRegistLv7Business(undefined,
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
    // style
    const {click_box} = useAccRegistLv7Style(undefined,
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
        <div className="Acc-regist-lv7__container">
            <Main_menu login_user={login_user}></Main_menu>
            <div className="Acc-regist-lv7__content">
                <div className="Acc-regist-lv7__content-title">
                    숙소를 대표하는 키워드를 선택해 주세요 
                    <div className="Acc-regist-lv7__content-sub-title">중복 선택 가능합니다!</div> 
                </div>
                <div className="Acc-regist-lv7__content-section1">
                    {default_data.d_keyword.map((ele,id)=>{
                        return(
                            <div className="Acc-regist-lv7__content-section1-box1 acc-regist-sellect-box not-user-sellect" key={id} 
                            ref={(el)=>{categories.current[id]=el}} state={false} onClick={()=>{click_box(id)}}>
                                <img src={ele.url}/>
                                <div className="Acc-regist-lv7__content-section1-box1-text1">{ele.name}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="Acc-regist-lv7__footer">
                <Host_footer fetch_handler={fetch_acc} drop_data={current_data} button_state={current_data.length > 0 ? true : false} fetch_state={true}></Host_footer>
            </div>
        </div>
    )
}

export default AccRegistLv7