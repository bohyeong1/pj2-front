import {useRef, useState, useContext} from "react";
import './host_regist_view8.scss'
import Host_footer from "@/utilComponent/menu/host-footer/Host-footer";
import '@/manage_scss_style/commonness/commonness.scss'
import Loading from "@/utilComponent/material/loading/loading";
import useHostRegistView8Business from "../../hook_store/business_hooks/host_regist_view8_business";
import useHostRegistView8Style from "../../hook_store/style_hooks/host_regist_view8_style";
import { state_store, reference_store } from "@/util/function/util_function";
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";

function HostRegistView8(){

    // =================================================
    // context states //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // refs //
    const regist_lv8_alarm = useRef(null)
    const regist_lv8_capacity_value = useRef(null)

    // =================================================
    // states //
    const [title, setTitle] = useState(host_acc.title ? host_acc.title : null)
    const [capacity, setCapacity] = useState(host_acc.capacity && host_acc.capacity > 0 ? host_acc.capacity : 1)
    const [prev_data, setPrev_data] = useState(host_acc.title && host_acc.capacity && host_acc.capacity > 0 ? 
        {
            title : host_acc.title,
            capacity : host_acc.capacity
        } : null)
    const [loading, setLoading] = useState(null)

    // =================================================
    // hooks //
    // business
    const {
        fetch_acc, 
        register, 
        errors, 
        watch, 
        isValid
    } = useHostRegistView8Business(
        {
            host_acc,
            setHost_acc
        }, 
        state_store([
            {title, setTitle},
            {prev_data, setPrev_data},
            {loading, setLoading},
        ]))     
    // style
    const {
        lv8_text_input_change, 
        plus_click, 
        minus_click
    } = useHostRegistView8Style(undefined,
        state_store([
            {capacity, setCapacity}
        ]),
        reference_store([
            {regist_lv8_alarm},
            {regist_lv8_capacity_value}
        ])
    )

    return(
        loading === false ? <Loading></Loading> :
        <div className="host-regist-view8__container">
            <div className="host-regist-view8__content">
                <div className="host-regist-view8__content-title">
                    <span>숙소를 대표하는 이름과 인원을 선택해 주세요!</span>
                </div>

                <div className="host-regist-view8__content-section1">                    
                    <div className="host-regist-view8__content-section1-box1-title">
                        <span>숙소 이름</span>
                        <div className="host-regist-view8__section-box">
                            <div></div>
                        </div>
                    </div>

                    <div className="host-regist-view8__content-section1-wrapper">
                        <form className="host-regist-view8__content-section1-box1">                        
                            <textarea  
                                className="host-regist-view8__content-section1-box1-text1 border-textarea" 
                                maxLength={19}
                                type='text' 
                                spellCheck={false} 
                                placeholder='숙소를 설명하는 이름을 지어주세요!'
                                {...register('title', {
                                    onChange : (e)=>{lv8_text_input_change(e.target.value)}
                                })}/>
                        </form>
                        {/* error */}
                        {errors.title && <span className="input-alert-text">{errors.title.message}</span>}                            
                        {/* text length */}
                        <div className="host-regist-view8__content-section1-box2">
                            <div 
                                ref={regist_lv8_alarm} 
                                className="host-regist-view8__content-section1-box2-text1">
                                    <span>0/20</span> 
                            </div>
                        </div> 
                    </div>                                       
                </div>

                <div className="host-regist-view8__content-section2">
                    <div className="host-regist-view8__content-section2-title">
                        <span>수용 인원</span>
                        <div className="host-regist-view8__section-box">
                            <div></div>
                        </div>
                    </div>
                    <div className="host-regist-view8__content-section2-box1">
                        {/* minus button */}
                        <button 
                            id="host-regist-view8__button" 
                            className={`host-regist-view8__content-section2-box1-part1-lb ${capacity === 1 ? 'small-button-disabled' : 'small-button'}`} 
                            onClick={minus_click}
                            disabled={capacity === 1 ? true : false}>
                            <i className="material-icons minus-button">remove</i>
                        </button>
                        {/* value */}
                        <div className="host-regist-view8__content-section2-box1-part1-text1">
                            <span 
                                ref={regist_lv8_capacity_value} 
                                className="host-regist-view8__content-section2-box1-part1_value">
                                {capacity}
                            </span>
                            <span>명</span>
                        </div>
                        {/* plus button */}
                        <button 
                            id="host-regist-view8__button" 
                            className={`host-regist-view8__content-section2-box1-part1-rb ${capacity >= 30 ? 'small-button-disabled' : 'small-button'}`} 
                            onClick={plus_click}
                            disabled={capacity >= 30 ? true : false}>
                            <i className="material-icons plus-button">add</i>
                        </button>
                    </div>                   
                </div>
            </div>

            <div className="host-regist-view8__footer">
                <Host_footer 
                    fetch_handler={fetch_acc} 
                    drop_data={{title : watch('title'), capacity : capacity}} 
                    button_state={isValid && watch('title') && capacity > 0 ? true : false} 
                    fetch_state={true}/>
            </div>
        </div>
    )
}

export default HostRegistView8