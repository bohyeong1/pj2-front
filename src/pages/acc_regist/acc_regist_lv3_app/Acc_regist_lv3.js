import React, {useRef,useState} from "react";
import './Acc_regist_lv3.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import session_storage from "../../../sessionStorage/session_storage";
import '../../../manage_scss_style/commonness/commonness.scss'
import useAccRegistLv3Business from "../hook_store/business_hooks/acc_regist_lv3_business";
import { state_store, reference_store } from "../../../utilData/UtilFunction";
import Loading from "../../../utilComponent/material/loading/loading";
import useAccRegistLv3Style from "../hook_store/style_hooks/acc_regist_lv3_style";

function AccRegistLv3({login_user, this_step}){
    // =================================================
    // refs //
    const categories = useRef([])
    const lv3_value = useRef([])

    // =================================================
    // accomodation information //
    const accomodation = session_storage.load('house')

    // =================================================
    // this level's accomodation field name //
    const field_name = default_data.regist_field[this_step]

    // =================================================
    // states //
    const [current_data, setCurrent_data] = useState(accomodation[field_name] ? accomodation[field_name] : default_data.d_base_facility)
    const [prev_data, setPrev_data] = useState(accomodation[field_name] ? accomodation[field_name] : null)
    const [fetch_state, setFetch_state] = useState(null)
    const [loading, setLoading] = useState(null)
    const [button_state, setButton_state] = useState(false)

    // =================================================
    // hooks //
    // business
    const {fetch_acc} = useAccRegistLv3Business(undefined,
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
            },
            {
                'lv3_value' : lv3_value
            }
        ])
    ) 
    // style
    const {minus_click, plus_click} = useAccRegistLv3Style(undefined,
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
            },
            {
                'button_state' : button_state,
                'setButton_state' : setButton_state
            }
        ]),
        reference_store([
            {
                'categories' : categories
            },
            {
                'lv3_value' : lv3_value
            }
        ])
    )
    
    return(
        loading === false ? <Loading></Loading> :
        <div className="Acc-regist-lv3__container">
            <Main_menu></Main_menu>
            <div className="Acc-regist-lv3__content">
                <div className="Acc-regist-lv3__content-title">
                    <span>숙소의 기본시설을 입력해 주세요!</span>
                </div>
                <div className="Acc-regist-lv3__content-section1">
                    {default_data.d_base_facility.map((ele,id)=>{
                        return(
                            <div className='Acc-regist-lv3__content-section1-box acc-regist-sellect-box not-user-sellect'  
                            ref={(el)=>{categories.current[id]=el}} key={id}>
                                <div className="Acc-regist-lv3__content-section1-box-part1">
                                    <img src={ele.url}/>
                                    <div className="Acc-regist-lv3__content-section1-box-tex1">{ele.name}</div>
                                </div>
                                <div className="Acc-regist-lv3__content-section1-box-part2">
                                    <button id="Acc-regist-lv3-btn" className={`Acc-regist-lv3__content-section1-box-part2-lb${id} small-button-disabled`}
                                    disabled={current_data[id]?.counts === 0 ? true : false}
                                    onClick={(e)=>{minus_click(e, id)}}>
                                        <i className="material-icons minus-button">remove</i>
                                    </button>
                                    <div className="Acc-regist-lv3__content-section1-box-part2-t1">
                                        <input ref={(el)=>{lv3_value.current[id] = el}} type="text" defaultValue= '0' readOnly
                                        className="Acc-regist-lv3__content-section1-box-part2-value"></input>
                                        <span>개</span>
                                    </div>
                                    <button id="Acc-regist-lv3-btn" className={`Acc-regist-lv3__content-section1-box-part2-rb${id} small-button`} 
                                    disabled={current_data[id]?.counts >= 15 ? true : false}
                                    onClick={(e)=>{plus_click(e,id)}}>
                                        <i className="material-icons plus-button">add</i>
                                    </button>
                                </div>
                            </div>
                        )
                    })}                    
                </div>
            </div>

            <div className="Acc-regist-lv3__footer">
                <Host_footer fetch_handler={fetch_acc} drop_data={current_data} button_state={button_state} fetch_state={true}></Host_footer>
            </div>
        </div>
    )
}

export default AccRegistLv3



