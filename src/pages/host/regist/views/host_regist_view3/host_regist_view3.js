import {useRef,useState, useContext} from "react";
import './host_regist_view3.scss'
import Host_footer from "@/utilComponent/menu/host-footer/Host-footer";
import '@/manage_scss_style/commonness/commonness.scss'
import useHostRegistView3Business from "../../hook_store/business_hooks/host_regist_view3_business";
import default_data from "@/util/default_data/default_data";
import { state_store, reference_store } from "@/util/function/util_function";
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";
import Loading from "@/utilComponent/material/loading/loading";
import useHostRegistView3Style from "../../hook_store/style_hooks/host_regist_view3_style";

function HostRegistView3(){

    // =================================================
    // context state //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // refs //
    const categories = useRef([])
    const lv3_value = useRef([])

    // =================================================
    // states //
    const [current_data, setCurrent_data] = useState(
        host_acc.base_facility && host_acc.base_facility.length ? host_acc.base_facility : default_data.d_base_facility
    )
    const [prev_data, setPrev_data] = useState(
        host_acc.base_facility && host_acc.base_facility.length ? host_acc.base_facility : default_data.d_base_facility
    )
    const [fetch_state, setFetch_state] = useState(true)
    const [loading, setLoading] = useState(null)
    const [button_state, setButton_state] = useState(
        prev_data.every((el)=>{
            return !el.counts
        }) ? false : true
    )

    // =================================================
    // hooks //
    // business
    const {fetch_acc} = useHostRegistView3Business(
        {
            host_acc,
            setHost_acc
        },
        state_store([
            {current_data, setCurrent_data},
            {prev_data, setPrev_data},
            {fetch_state, setFetch_state},
            {loading, setLoading}
        ]),
        reference_store([
            {categories},
            {lv3_value}
        ])
    ) 
    // style
    const {
        minus_click, 
        plus_click
    } = useHostRegistView3Style(undefined,
        state_store([
            {current_data, setCurrent_data},
            {prev_data, setPrev_data},
            {fetch_state, setFetch_state},
            {loading, setLoading},
            {button_state, setButton_state}
        ]),
        reference_store([
            {categories},
            {lv3_value}
        ])
    )
    
    return(
        loading === false ? <Loading></Loading> :
        <div className="host-regist-view3__container">
            <div className="host-regist-view3__content">
                <div className="host-regist-view3__content-title">
                    <span>숙소의 기본시설을 입력해 주세요!</span>
                </div>
                <div className="host-regist-view3__content-section1">
                    {default_data.d_base_facility.map((el,id)=>{
                        return(
                            <div 
                                className={`host-regist-view3__content-section1-box acc-regist-sellect-box not-user-sellect 
                                    ${current_data[id].counts ? 'acc-regist-sellect-box-active' : undefined}`}  
                                ref={(el)=>{categories.current[id]=el}} 
                                key={id}>
                                <div className="host-regist-view3__content-section1-box-part1">
                                    <img src={el.url}/>
                                    <div className="host-regist-view3__content-section1-box-tex1">{el.name}</div>
                                </div>
                                <div className="host-regist-view3__content-section1-box-part2">
                                    <button 
                                        id="Acc-regist-lv3-btn" 
                                        className={`host-regist-view3__content-section1-box-part2-lb${id} 
                                            ${current_data[id].counts ? 'small-button' : 'small-button-disabled'}`}
                                        disabled={!current_data[id].counts ? true : false}
                                        onClick={(e)=>{minus_click(e, id)}}>
                                        <i className="material-icons minus-button">remove</i>
                                    </button>
                                    <div className="host-regist-view3__content-section1-box-part2-t1">
                                        <input 
                                            ref={(el)=>{lv3_value.current[id] = el}} 
                                            type="text" 
                                            defaultValue= {current_data[id].counts} 
                                            readOnly
                                            className="host-regist-view3__content-section1-box-part2-value"/>
                                        <span>개</span>
                                    </div>
                                    <button 
                                        id="Acc-regist-lv3-btn" 
                                        className={`host-regist-view3__content-section1-box-part2-rb${id} 
                                            ${current_data[id].counts < 15 ? 'small-button' : 'small-button-disabled'}`} 
                                        disabled={current_data[id].counts >= 15 ? true : false}
                                        onClick={(e)=>{plus_click(e,id)}}>
                                        <i className="material-icons plus-button">add</i>
                                    </button>
                                </div>
                            </div>
                        )
                    })}                    
                </div>
            </div>

            <div className="host-regist-view3__footer">
                <Host_footer 
                    fetch_handler={fetch_acc} 
                    drop_data={current_data} 
                    button_state={button_state} 
                    fetch_state={fetch_state}/>
            </div>
        </div>
    )
}

export default HostRegistView3



