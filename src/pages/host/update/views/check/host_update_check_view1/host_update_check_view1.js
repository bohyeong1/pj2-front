import './host_update_check_view1.scss'
import useHostUpdateCheckView1Business from '../../../hook_store/business_hooks/host_update_check_view1_business'
import default_data from "@/util/default_data/default_data";
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";
import { state_store, reference_store, text_change } from '@/util/function/util_function'
import DropdownState from '@/utilComponent/material/dropdown_state/dropdown_state';
import '@/manage_scss_style/commonness/commonness.scss'
import useHostUpdateStyleView1Style from '../../../hook_store/style_hooks/host_update_check_view1_style';

function HostUpdateCheckView1(){
    // =================================================
    // context //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // refs //
    const sellect_active_box_input = useRef(null)
    const sellect_active_button_wrapper = useRef(null)
    const text_gurabox = useRef(null)
    const row_alram_ref = useRef(null)
    const text_alert = useRef(null)

    // =================================================
    // states //
    const [loading, setLoading] = useState(null)
    const [is_button, setIs_button] = useState(false)
    const [line_error, setLine_error] = useState(false)
    const [sellect_state, setSellect_state] = useState(
        host_acc.check_method && host_acc.check_method.check_in ? false : true
    )
    const [check_in, setCheck_in] = useState(
        host_acc.check_time && host_acc.check_time.check_in ? host_acc.check_time.check_in : default_data.d_check_time[7]
    )
    const [check_in_method, setCheck_in_method] = useState(
        host_acc.check_method && host_acc.check_method.check_in ? host_acc.check_method.check_in : null
    )
                                     
    // =================================================
    // hooks //
    // business
    const {
        register, 
        watch,
        fetch_acc,
        errors,
        setError,
        clearErrors,
        isValid
    } = useHostUpdateCheckView1Business(
        {
            host_acc, 
            setHost_acc
        },
        state_store([
            {check_in, setCheck_in},
            {check_in_method, setCheck_in_method},
            {is_button, setIs_button},
            {loading, setLoading},
            {line_error, setLine_error}
        ]),
        reference_store([
            {text_gurabox},
            {row_alram_ref},
            {text_alert}
        ])                        
    )
    // style
    const {
        click_sellect_box, 
        delete_sellect_box,
        save_text,
        click_modify_text
    } = useHostUpdateStyleView1Style({
            host_acc,
            setHost_acc,
            watch
        },
        state_store([
            {sellect_state, setSellect_state},
            {check_in_method, setCheck_in_method},,
            {line_error, setLine_error}
        ]),
        reference_store([
            {sellect_active_button_wrapper}
        ])
    )

    // =================================================
    // hook form api에서 ref 설정 필요한 필드 //
    const {ref, onChange, ...rest} = register('text')

    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-check-view1__container'>
            <div className='host-update-check-view1__wrapper common-scroll-bar'>
                <div className="host-update-check-view1__title">
                    <span>체크인</span>
                </div>
                <div className='host-update-check-view1__content'>
                    <div className='host-update-check-view1__content-section1'>
                        <div className='host-update-check-view1__content-section1-title'>
                            <span>체크인 시간</span>
                        </div>
                        <div className='host-update-check-view1__content-section1-dropdown-wrapper'>
                            <DropdownState 
                                menus={default_data.d_check_time.slice(0,default_data.d_check_time.length - 1)} 
                                sellect = {check_in} 
                                call_back = {setCheck_in}
                                default_message = {'체크인 시간을 설정해 주세요!'}
                            >                                
                            </DropdownState>
                        </div>
                    </div>
                    <div className='host-update-check-view1__content-section2'>
                        <div className='host-update-check-view1__content-section2-title'>
                            <span>체크인 방법</span>
                        </div>
                        <div className='host-update-check-view1__content-section2-sellect'>
                            {sellect_state && !check_in_method ? 
                            default_data.d_checkin_method.map((el,id)=>{
                                return <div className='host-update-check-view1__content-section2-sellect-box' 
                                            key={id}
                                            onClick={()=>{click_sellect_box(el)}}
                                        >
                                            <div>
                                                <div>
                                                    <div>
                                                        <img src={el.url}></img>
                                                    </div>
                                                </div>
                                                <span>{el.name}</span>
                                            </div>
                                            <div>
                                                <textarea placeholder='summary'
                                                          defaultValue={el.text}>
                                                </textarea>
                                            </div>
                                       </div>
                            }) : 
                            <div className='host-update-check-view1__content-section2-sellect-box-active'>
                                <div>
                                    <div>
                                        <div>
                                            <img src={check_in_method.url}></img>
                                        </div>
                                        <button onClick={delete_sellect_box}>
                                            <img src={default_data.d_imgs.transh_can}></img>
                                        </button>
                                    </div>
                                    <span>{check_in_method.name}</span>
                                </div>
                                <div>
                                    <div className='host-update-check-view1__content-section2-textarea-input-wrapper'>
                                        <textarea placeholder = '세부적인 사항을 작성해 주세요!'
                                                  ref = {(el)=>{
                                                    ref(el)
                                                    sellect_active_box_input.current = el
                                                  }}
                                                  spellCheck = {false}
                                                  onChange={(el)=>{
                                                    onChange(el)
                                                    text_change(el.target.value, 
                                                                text_gurabox.current, 
                                                                row_alram_ref.current, 
                                                                text_alert.current, 
                                                                10, 
                                                                17,
                                                                setLine_error,
                                                                line_error)}}
                                                  {...rest}
                                        >
                                        </textarea>
                                        <pre className="host-update-check-view1__content-section2-gurabox" 
                                             ref={text_gurabox}>                            
                                        </pre>
                                        <div className="host-update-check-view1__content-section2-box1">
                                            <div className="host-update-check-view1__content-section2-box1-text1">
                                                <span>라인 - </span>
                                                <span ref={row_alram_ref}>0/10</span>
                                            </div>
                                            {/* alram */}
                                            <div ref={text_alert} 
                                                 className="host-update-check-view1__content-section2-box1-text2" 
                                                 style={{display:'none'}}>
                                                    10줄 이내로 작성해 주세요!
                                            </div>
                                            {/* error */}
                                            {errors.text && <span className="input-alert-text">
                                                {errors.text.message}
                                            </span>}  
                                        </div> 
                                    </div>

                                    <div 
                                        className='host-update-check-view1__content-section2-button-wrapper'
                                        ref={sellect_active_button_wrapper}>
                                        {/* modify btn */}
                                        <button className='host-update-check-view1__content-section2-front-button' 
                                                onClick={()=>{click_modify_text(sellect_active_box_input)}}
                                        >
                                            <img src={default_data.d_imgs.pencil}></img>
                                        </button>
                                        {/* save btn */}
                                        <button className={`host-update-check-view1_content-section2-back-button ${isValid && !line_error ? '' : 'save-disalbe'}`}
                                                onClick={()=>{save_text(sellect_active_box_input)}}
                                                disabled={isValid && !line_error ? false : true}
                                        >
                                            <img src={default_data.d_imgs.save}></img>
                                        </button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            <div className="host-update-check-view1__footer">
                <button className={`host-update-check-view1__fetch-button ${is_button ? 'button-enable' : 'button-disable'}`}
                        disabled={is_button ? false : true}
                        onClick={()=>{fetch_acc(check_in, check_in_method)}}                            
                >
                    저장
                </button>
            </div>
        </div>
    )
}

export default HostUpdateCheckView1