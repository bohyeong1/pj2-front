import React,{useRef,useState, useContext} from "react";
import './host_regist_view4.scss'
import Host_footer from "@/utilComponent/menu/host-footer/Host-footer";
import '@/manage_scss_style/commonness/commonness.scss'
import useHostRegistView4Business from "../../hook_store/business_hooks/host_regist_view4_business";
import useHostRegistView4Style from "../../hook_store/style_hooks/host_regist_view4_style";
import default_data from "@/util/default_data/default_data";
import { state_store, reference_store } from "@/util/function/util_function";
import Loading from "@/utilComponent/material/loading/loading";
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";
import _ from 'lodash'

function HostRegistView4(){

    // =================================================
    // context state //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // refs //
    const categories = useRef([])

    // =================================================
    // states //
    const [current_data, setCurrent_data] = useState(
        host_acc.service_facility && host_acc.service_facility.length > 0 ? host_acc.service_facility : []
    )
    const [prev_data, setPrev_data] = useState(
        host_acc.service_facility && host_acc.service_facility.length > 0 ? host_acc.service_facility : null
    )
    const [loading, setLoading] = useState(null)

    // =================================================
    // hooks //
    // business
    const {fetch_acc} = useHostRegistView4Business(
        {
            host_acc,
            setHost_acc
        },
        state_store([
            {current_data, setCurrent_data },
            {prev_data, setPrev_data},
            {loading, setLoading}
        ]),
        reference_store([
            {categories}
        ])
    ) 
    // style
    const {click_box} = useHostRegistView4Style(undefined,
        state_store([
            {current_data, setCurrent_data},
            {prev_data, setPrev_data},
            {loading,setLoading}
        ]),
        reference_store([
            {categories}
        ])
    )

    return(
        loading === false ? <Loading></Loading> :
        <div className="host-regist-view4__container">
            <div className="host-regist-view4__content">
                <div className="host-regist-view4__content-title">
                    <span>숙소의 서비스시설을 선택해 주세요!</span>
                </div>
                <div className="host-regist-view4__content-section1">
                    {default_data.d_service_facility_icon.map((el,id)=>{
                        return(
                            <div 
                                className={`host-regist-view4__content-section1-box acc-regist-sellect-box not-user-sellect
                                    ${_.some(current_data, (ele)=>{
                                        return _.isMatch(ele, el)
                                    }) ? 'acc-regist-sellect-box-active' : undefined}`}
                                ref={(el)=>{categories.current[id]=el}} 
                                data-state={false} 
                                onClick={()=>{click_box(id)}} 
                                key={id}>
                                <img src={el.url}/>
                                <div className="host-regist-view4__content-section1-box-text1">{el.name}</div>
                            </div>
                        )
                    })}                    
                </div>
            </div>
            <div className="host-regist-view4__footer">
                <Host_footer 
                    fetch_handler={fetch_acc} 
                    drop_data={current_data} 
                    button_state={current_data.length > 0 ? true : false} 
                    fetch_state={true}/>
            </div>
        </div>
    )
}

export default HostRegistView4