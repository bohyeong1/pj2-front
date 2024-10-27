import {useRef, useState} from "react";
import './host_regist_view9.scss'
import Host_footer from "@/utilComponent/menu/host-footer/Host-footer";
import '@/manage_scss_style/commonness/commonness.scss'
import Loading from "@/utilComponent/material/loading/loading";
import session_storage from "@/sessionStorage/session_storage";
import default_data from "@/util/default_data/default_data";
import { state_store, reference_store } from "@/util/function/util_function";
import useHostRegistView9Business from "../../hook_store/business_hooks/host_regist_view9_business";
import useHostRegistView9Style from "../../hook_store/style_hooks/host_regist_view9_style";

function HostRegistView9({login_user, this_step}){
    // =================================================
    // accomodation information //
    const accomodation = session_storage.load('house')

    // =================================================
    // this level's accomodation field name //
    const field_name = default_data.regist_field[this_step]

    // =================================================
    // refs //
    const regist_lv9_row_alram = useRef(null) 
    const regist_lv9_alert = useRef(null) 
    const regist_lv9_gurabox = useRef(null)

    // =================================================
    // states //
    const [prev_data, setPrev_data] = useState(accomodation[field_name] ? accomodation[field_name] : null)
    const [loading, setLoading] = useState(null)

    // =================================================
    // hooks //
    // business
    const {
        fetch_acc, 
        watch, 
        register, 
        errors, 
        isValid
    } = useHostRegistView9Business(undefined, 
        state_store([
            {loading, setLoading},
            {prev_data, setPrev_data}
        ])
    )
    // style
    const {text_change} = useHostRegistView9Style(
            {
                isValid
            },
        undefined,
        reference_store([
            {regist_lv9_row_alram},
            {regist_lv9_alert},
            {regist_lv9_gurabox}
        ])
    )

    return(
        loading === false ? <Loading></Loading> :
        <div className="Acc-regist-lv9__container">
            <div className="Acc-regist-lv9__content">
                <div className="Acc-regist-lv9__content-title">
                숙소를 설명하는 글을 작성해 주세요! 
                    <div className="Acc-regist-lv9__content-sub-title">최대 400자 까지 작성 가능합니다</div> 
                </div>

                <div className="Acc-regist-lv9__content-section1">
                    <div className="Acc-regist-lv9__content-section1-box1">
                        <textarea  className="Acc-regist-lv9__content-section1-box1-text1 border-textarea" 
                                   type='text' 
                                   spellCheck={false}
                                   {...register('summary', {
                                   onChange : (e)=>{text_change(e.target.value)}})}
                                   placeholder='숙소를 설명하는 글을 작성해주세요!'>                            
                        </textarea>
                    </div>

                    <pre className="Acc-regist-lv9__gurabox" 
                         ref={regist_lv9_gurabox}></pre>

                    <div className="Acc-regist-lv9__content-section1-box2">
                        <div className="Acc-regist-lv9__content-section1-box2-text1">
                            <span>라인 - </span>
                            <span> ref={regist_lv9_row_alram}0/50</span>
                        </div>
                        {/* alram */}
                        <div ref={regist_lv9_alert} 
                             className="Acc-regist-lv9__content-section1-box2-text2" 
                             style={{display:'none'}}>50줄 이내로 작성해 주세요!</div>
                        {/* error */}
                        {errors.summary && <span className="input-alert-text">
                            {errors.summary.message}
                        </span>}  
                    </div>                    
                </div>
            </div>
            <div className="Acc-regist-lv9__footer">
                <Host_footer fetch_handler={fetch_acc} 
                             drop_data={{summary : watch('summary')}} 
                             button_state={isValid ? true : false} 
                             fetch_state={true}></Host_footer>
            </div>
        </div>
    ) 
}

export default HostRegistView9