import {useRef, useState} from "react";
import './host_regist_view7.scss'
import Host_footer from "@/utilComponent/menu/host-footer/Host-footer";
import '@/manage_scss_style/commonness/commonness.scss'
import useHostRegistView7Business from "../../hook_store/business_hooks/host_regist_view7_business";
import useHostRegistView7Style from "../../hook_store/style_hooks/host_regist_view7_style";
import session_storage from "@/sessionStorage/session_storage";
import default_data from "@/util/default_data/default_data";
import { state_store, reference_store } from "@/util/function/util_function";
import Loading from "@/utilComponent/material/loading/loading";

function HostRegistView7({login_user, this_step}){
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
    const {fetch_acc} = useHostRegistView7Business(undefined,
        state_store([
            {current_data, setCurrent_data },
            {prev_data, setPrev_data },
            {loading, setLoading}
        ]),
        reference_store([
            {categories}
        ])
    ) 
    // style
    const {click_box} = useHostRegistView7Style(undefined,
        state_store([
            {current_data, setCurrent_data},
            {prev_data, setPrev_data },
            {loading, setLoading}
        ]),
        reference_store([
            {categories}
        ])
    )
   
    return(
        loading === false ? <Loading></Loading> :
        <div className="Acc-regist-lv7__container">
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

export default HostRegistView7