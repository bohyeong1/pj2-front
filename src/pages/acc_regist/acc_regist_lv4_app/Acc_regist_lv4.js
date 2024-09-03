import React,{useRef,useState} from "react";
import './Acc_regist_lv4.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import session_storage from "../../../sessionStorage/session_storage";
import '../../../manage_scss_style/commonness/commonness.scss'
import useAccRegistLv4Business from "../hook_store/business_hooks/acc_regist_lv4_business";
import useAccRegistLv4Style from "../hook_store/style_hooks/acc_regist_lv4_style";
import { state_store, reference_store } from "../../../utilData/UtilFunction";
import Loading from "../../../utilComponent/material/loading/loading";

function AccRegistLv4({login_user, this_step}){
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
    const [current_data, setCurrent_data] = useState(accomodation[field_name] > 0 ? accomodation[field_name] : [])
    const [prev_data, setPrev_data] = useState(accomodation[field_name].length > 0 ? accomodation[field_name] : null)
    const [fetch_state, setFetch_state] = useState(null)
    const [loading, setLoading] = useState(null)

    // =================================================
    // hooks //
    // business
    const {fetch_acc} = useAccRegistLv4Business(undefined,
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
    // style
    const {click_box} = useAccRegistLv4Style(undefined,
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
        <div className="Acc-regist-lv4__container">
            <Main_menu login_user={login_user}></Main_menu>
            <div className="Acc-regist-lv4__content">
                <div className="Acc-regist-lv4__content-title">
                    <span>숙소의 서비스시설을 선택해 주세요!</span>
                </div>
                <div className="Acc-regist-lv4__content-section1">
                    {default_data.d_service_facility_icon.map((ele,id)=>{
                        return(
                            <div className="Acc-regist-lv4__content-section1-box acc-regist-sellect-box not-user-sellect" 
                            ref={(el)=>{categories.current[id]=el}} 
                            data-state={false} onClick={()=>{click_box(id)}} key={id}>
                                <img src={ele.url}/>
                                <div className="Acc-regist-lv4__content-section1-box-text1">{ele.name}</div>
                            </div>
                        )
                    })}                    
                </div>
            </div>
            <div className="Acc-regist-lv4__footer">
                <Host_footer fetch_handler={fetch_acc} drop_data={current_data} button_state={current_data.length > 0 ? true : false} fetch_state={true}></Host_footer>
            </div>
        </div>
    )
}

export default AccRegistLv4