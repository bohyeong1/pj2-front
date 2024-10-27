import {useState, useContext} from "react";
import './host_regist_view1.scss'
import Host_footer from "@/utilComponent/menu/host-footer/Host-footer";
import default_data from "@/util/default_data/default_data";
import useHostRegistView1Business from "../../hook_store/business_hooks/host_regist_view1_business";
import { state_store } from "@/util/function/util_function";
import '@/manage_scss_style/commonness/commonness.scss'
import Loading from "@/utilComponent/material/loading/loading";
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";
import _ from 'lodash'

function HostRegistView1(){

    // =================================================
    // context state //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // states //
    const [current_data, setCurrent_data] = useState(
        host_acc && host_acc.category ? host_acc.category : null
    )
    const [prev_data, setPrev_data] = useState(
        host_acc && host_acc.category ? host_acc.category : null
    )
    const [fetch_state, setFetch_state] = useState(null)
    const [loading, setLoading] = useState(null)

    // =================================================
    // hooks //
    const {
        fetch_acc, 
        click_box
    } = useHostRegistView1Business(
        {
            host_acc,
            setHost_acc
        },
        state_store([
            {current_data, setCurrent_data},
            {prev_data, setPrev_data},
            {fetch_state, setFetch_state},
            {loading, setLoading}
        ])
    )

    return (
        loading === false ? <Loading></Loading> :
        <div className="host-regist-view1__container">
            <div className="host-regist-view1__content">
                <div className="host-regist-view1__content-title">
                    숙소 유형을 선택해 주세요!
                </div>
                <div className="host-regist-view1__content-section1">
                    {default_data.d_category_icon.map((el,id)=>{
                        return(
                            <div 
                                className={`host-regist-view1__content-section1-box not-user-sellect ${_.isEqual(el, current_data) ? 'host-regist-view1__active' : undefined}`}  
                                key={id} 
                                onClick={()=>{click_box(id)}}>
                                <img src={el.url}/>
                                <div className="host-regist-view1__content-section1-box-text">{el.name}</div>
                            </div>
                        )
                    })}                    
                </div>
            </div>
            <div className="host-regist-view1__footer">
                <Host_footer 
                    fetch_handler = {fetch_acc} 
                    drop_data = {current_data} 
                    button_state={current_data ? current_data : false} 
                    fetch_state={fetch_state}/>
            </div>
        </div>
    )
}

export default HostRegistView1