import { useState, useContext} from "react";
import './host_regist_view2.scss'
import default_data from "@/util/default_data/default_data";
import '@/manage_scss_style/commonness/commonness.scss'
import useHostRegistView2Business from "../../hook_store/business_hooks/host_regist_view2_business";
import { state_store } from "@/util/function/util_function";
import Loading from "@/utilComponent/material/loading/loading";
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";
import Host_footer from "@/utilComponent/menu/host-footer/Host-footer";
import _ from 'lodash'

function HostRegistView2(){

    // =================================================
    // context state //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // states //
    const [current_data, setCurrent_data] = useState(
        host_acc && host_acc.space_category ? host_acc.space_category : null
    )
    const [prev_data, setPrev_data] = useState(
        host_acc && host_acc.space_category ? host_acc.space_category : null
    )
    const [fetch_state, setFetch_state] = useState(null)
    const [loading, setLoading] = useState(null)

    // =================================================
    // hooks //
    // business
    const {
        fetch_acc, 
        click_box
    } = useHostRegistView2Business(
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

    return(
        loading === false ? <Loading></Loading> :
            <div className="host-regist-view2__container">
                <div className="host-regist-view2__content">
                    <div className="host-regist-view2__content-title">
                        <span>숙소의 유형을 선택해 주세요!</span>
                    </div>
                    <div className="host-regist-view2__content-section1">
                        {default_data.d_house_space.map((el,id)=>{
                            return(
                                <div 
                                    className={`host-regist-view2__content-section1-box not-user-sellect acc-regist-sellect-box 
                                        ${current_data && _.isMatch(el, current_data) ? 'acc-regist-sellect-box-active' : undefined}`} 
                                    key={id} 
                                    onClick={()=>{click_box(id)}}>
                                    <img src={el.url}/>
                                    <div className="host-regist-view2__content-section1-box-text1">{el.name}</div>
                                    <div className="host-regist-view2__content-section1-box-text2">{el.text}</div>
                                </div>
                            )
                        })}                    
                    </div>
                </div>
                <div className="host-regist-view2__footer">
                    <Host_footer 
                        fetch_handler={fetch_acc} 
                        drop_data={current_data} 
                        button_state={current_data ? current_data : false} 
                        fetch_state={fetch_state}/>
                </div>
            </div>
    )
}

export default HostRegistView2