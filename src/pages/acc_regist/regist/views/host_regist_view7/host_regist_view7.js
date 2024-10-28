import {useRef, useState, useContext} from "react";
import './host_regist_view7.scss'
import Host_footer from "@/utilComponent/menu/host-footer/Host-footer";
import '@/manage_scss_style/commonness/commonness.scss'
import useHostRegistView7Business from "../../hook_store/business_hooks/host_regist_view7_business";
import useHostRegistView7Style from "../../hook_store/style_hooks/host_regist_view7_style";
import default_data from "@/util/default_data/default_data";
import { state_store, reference_store } from "@/util/function/util_function";
import Loading from "@/utilComponent/material/loading/loading";
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";
import _ from 'lodash'

function HostRegistView7(){
    // =================================================
    // refs //
    const categories = useRef([])

    // =================================================
    // context states //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // states //
    const [current_data, setCurrent_data] = useState(host_acc.keywords && host_acc.keywords.length > 0 ? host_acc.keywords : [])
    const [prev_data, setPrev_data] = useState(host_acc.keywords && host_acc.keywords.length > 0 ? host_acc.keywords : null)
    const [loading, setLoading] = useState(null)

    // =================================================
    // hooks //
    // business
    const {fetch_acc} = useHostRegistView7Business(
        {
            host_acc,
            setHost_acc
        },
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
    console.log(current_data)
    return(
        loading === false ? <Loading></Loading> :
        <div className="host-regist-view7__container">
            <div className="host-regist-view7__content">
                <div className="host-regist-view7__content-title">
                    숙소를 대표하는 키워드를 선택해 주세요 
                    <div className="host-regist-view7__content-sub-title">중복 선택 가능합니다!</div> 
                </div>
                <div className="host-regist-view7__content-section1">
                    {default_data.d_keyword.map((el,id)=>{
                        return(
                            <div 
                                className={`host-regist-view7__content-section1-box1 acc-regist-sellect-box not-user-sellect 
                                    ${current_data.length && _.some(current_data, (ele)=>{return _.isMatch(ele, el)}) ? 'acc-regist-sellect-box-active' : undefined}`} 
                                key={id} 
                                ref={(el)=>{categories.current[id]=el}} 
                                state={false} 
                                onClick={()=>{click_box(id)}}>
                                <img src={el.url}/>
                                <div className="host-regist-view7__content-section1-box1-text1">{el.name}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="host-regist-view7__footer">
                <Host_footer 
                    fetch_handler={fetch_acc} 
                    drop_data={current_data} 
                    button_state={current_data.length > 0 ? true : false} 
                    fetch_state={true}/>
            </div>
        </div>
    )
}

export default HostRegistView7