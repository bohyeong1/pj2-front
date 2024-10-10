import './host_update_check_view5.scss'
import useHostUpdateCheckView5Business from '../../../hook_store/business_hooks/host_update_check_view5_business'
import default_data from "@/util/default_data/default_data";
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import { state_store, reference_store, text_change } from '@/util/function/util_function'
import DropdownState from '@/utilComponent/material/dropdown_state/dropdown_state';
import '@/manage_scss_style/commonness/commonness.scss'
import useHostUpdateStyleView5Style from '../../../hook_store/style_hooks/host_update_check_view5_style';
import _ from 'lodash'

function HostUpdateCheckView5(){
    // =================================================
    // context //
    const {acc_data, setAcc_data} = useContext(AccDataContext)

    // =================================================
    // refs //
    const sellect_active_box_input = useRef([])
    const sellect_active_button_wrapper = useRef([])
    const text_gurabox = useRef([])
    const row_alram_ref = useRef([])
    const text_alert = useRef([])
    const sellect_ref = useRef(null)
    const sellect_active_ref = useRef(null)
    const hanlde_ref = useRef(null)

    // =================================================
    // states //
    const [loading, setLoading] = useState(null)
    const [is_button, setIs_button] = useState(false)
    const [sellect_state, setSellect_state] = useState(false)
    const [check_out, setCheck_out] = useState(acc_data.check_time && acc_data.check_time.check_out ? 
                                               acc_data.check_time.check_out :
                                               default_data.d_check_time[7])
    const [check_out_method, setCheck_out_method] = useState(acc_data.check_method && acc_data.check_method.check_out && acc_data.check_method.check_out.length ? 
                                                    acc_data.check_method.check_out :
                                                    []
                                                    )

    // =================================================
    // hooks //
    // business
    const {register, 
           watch,
           fetch_acc,
           errors,
           setError,
           clearErrors,
           isValid} = useHostUpdateCheckView5Business({
                            'acc_data' : acc_data,
                            'setAcc_data' : setAcc_data
                        },
                        state_store([
                            {
                                'check_out' : check_out,
                                'setCheck_out' : setCheck_out
                            },
                            {
                                'check_out_method' : check_out_method,
                                'setCheck_out_method' : setCheck_out_method
                            },
                            {
                                'is_button' : is_button,
                                'setIs_button' : setIs_button
                            },
                            {
                                'loading' : loading,
                                'setLoading' : setLoading
                            }
                        ]),
                        reference_store([
                            {
                                'text_gurabox' : text_gurabox
                            },
                            {
                                'row_alram_ref' : row_alram_ref
                            },
                            {
                                'text_alert' : text_alert
                            }                            
                        ])                        
                      )
    // style
    const {click_sellect_box, 
           delete_sellect_box,
           save_text,
           move_box_right,
           move_box_left,
           click_modify_text} = useHostUpdateStyleView5Style({
                                        'acc_data' : acc_data,
                                        'setAcc_data' : setAcc_data,
                                        'watch' : watch
                                    },
                                    state_store([
                                        {
                                            'sellect_state' : sellect_state,
                                            'setSellect_state' : setSellect_state
                                        },
                                        {
                                            'check_out_method' : check_out_method,
                                            'setCheck_out_method' : setCheck_out_method
                                        }
                                    ]),
                                    reference_store([
                                        {
                                            'sellect_active_button_wrapper' : sellect_active_button_wrapper
                                        },
                                        {
                                            'hanlde_ref' : hanlde_ref
                                        },
                                        {
                                            'sellect_ref' : sellect_ref
                                        },
                                        {
                                            'sellect_active_ref' : sellect_active_ref
                                        }
                                    ])
                                )
       
    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-check-view5__container'>
            <div className='host-update-check-view5__wrapper common-scroll-bar'>
                <div className="host-update-check-view5__title">
                    <span>체크아웃</span>
                </div>
                <div className='host-update-check-view5__content'>
                    <div className='host-update-check-view5__content-section1'>
                        <div className='host-update-check-view5__content-section1-title'>
                            <span>체크아웃 시간</span>
                        </div>
                        <div className='host-update-check-view5__content-section1-dropdown-wrapper'>
                            <DropdownState 
                                menus={default_data.d_check_time.slice(0,default_data.d_check_time.length - 1)} 
                                sellect = {check_out} 
                                call_back = {setCheck_out}
                                default_message = {'체크아웃 시간을 설정해 주세요!'}
                            >                                
                            </DropdownState>
                        </div>
                    </div>
                    <div className='host-update-check-view5__content-section2'>
                        <div className='host-update-check-view5__content-section2-title'>
                            <span>체크아웃 방법</span>
                            {sellect_state ? 
                            <button className='host-update-check-view__content-section2-left-button small-button' 
                                    onClick={()=>{move_box_left(hanlde_ref)}}>
                                        뒤로 가기
                            </button>
                            :null}
                        </div>
                        <div className='host-update-check-view5__content-section2-sellect'
                             ref={hanlde_ref}                             
                        >                          
                            {/* data 화면 */}                            
                            <div className='host-update-check-view5__content-section2-sellect-box-active-wrapper'
                                 ref={sellect_active_ref}>
                                {/* 추가하기 버튼 */}
                                <div>
                                    <button className='host-update-check-view5__content-section2-sellect-box-active-button small-button'
                                            onClick={()=>move_box_right(hanlde_ref)}
                                    >
                                                추가하기
                                    </button>
                                </div>
                                {check_out_method.length ?
                                check_out_method.map((el,id)=>{
                                    // =================================================
                                    // hook form api 개별 설정 //
                                    const target_register = register(`text[${id}]`)
                                    return(
                                        <div className='host-update-check-view5__content-section2-sellect-box-active'
                                             key={id}>
                                            <div>
                                                <div>
                                                    <div>
                                                        <img src={el.url}></img>
                                                    </div>
                                                    <button onClick={()=>{delete_sellect_box(el)}}>
                                                        <img src={default_data.d_imgs.transh_can}></img>
                                                    </button>
                                                </div>
                                                <span>{el.name}</span>
                                            </div>
                                            <div>
                                                <div className='host-update-check-view5__content-section2-textarea-input-wrapper'>
                                                    <textarea placeholder = '세부적인 사항을 작성해 주세요!'
                                                              {...target_register}
                                                              ref = {(el)=>{
                                                                    target_register.ref(el)
                                                                    sellect_active_box_input.current[id] = el
                                                              }}
                                                              spellCheck = {false}
                                                              onChange={(el)=>{
                                                                        target_register.onChange(el)
                                                                        text_change(el.target.value, 
                                                                                    text_gurabox.current[id], 
                                                                                    row_alram_ref.current[id], 
                                                                                    text_alert.current[id], 
                                                                                    setError,
                                                                                    clearErrors,
                                                                                    `text[${id}]`,
                                                                                    10, 
                                                                                    17)}}
                                                    >
                                                    </textarea>
                                                    <pre className="host-update-check-view5__content-section2-gurabox" 
                                                         ref={(el)=>{text_gurabox.current[id] = el}}>                            
                                                    </pre>
                                                    <div className="host-update-check-view5__content-section2-box1">
                                                        <div className="host-update-check-view5__content-section2-box1-text1">
                                                            <span>라인 - </span>
                                                            <span ref={(el)=>{row_alram_ref.current[id] = el}}>0/10</span>
                                                        </div>
                                                        {/* alram */}
                                                        <div ref={(el)=>{text_alert.current[id] = el}} 
                                                             className="host-update-check-view5__content-section2-box1-text2" 
                                                             style={{display:'none'}}>
                                                                10줄 이내로 작성해 주세요!
                                                        </div>
                                                        {/* error */}
                                                        {errors?.text?.[id] && <span className="input-alert-text">
                                                            {errors.text[id].message}
                                                        </span>}  
                                                    </div> 
                                                </div>

                                                <div className='host-update-check-view5__content-section2-button-wrapper'
                                                     ref={(el)=>{sellect_active_button_wrapper.current[id] = el}}
                                                >
                                                    {/* modify btn */}
                                                    <button className='host-update-check-view5__content-section2-front-button' 
                                                            onClick={()=>{click_modify_text(sellect_active_box_input.current[id],
                                                                                            sellect_active_button_wrapper.current[id]                   
                                                                                            )}}
                                                    >
                                                        <img src={default_data.d_imgs.pencil}></img>
                                                    </button>
                                                    {/* save btn */}
                                                    <button className={`host-update-check-view5_content-section2-back-button 
                                                                        ${!errors?.text?.[id] && watch(`text[${id}]`)?.length ? '' : 'save-disalbe'}`}
                                                            onClick={()=>{save_text(sellect_active_box_input.current[id],
                                                                                    sellect_active_button_wrapper.current[id],
                                                                                    id)}}
                                                            disabled={!errors?.text?.[id] && watch(`text[${id}]`)?.length ? false : true}
                                                    >
                                                        <img src={default_data.d_imgs.save}></img>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                : null}
                            </div>

                            {/* 선택 화면 */}
                            <div className='host-update-check-view5__content-section2-sellect-box-wraper'
                                 ref={sellect_ref}
                            > 
                                {default_data.d_checkout_method.filter((el)=>{
                                    return !check_out_method.some((ele)=>{
                                        return _.isMatch(el, {name : ele.name, url : ele.url})
                                    })
                                }).map((el,id)=>{
                                    return  <div className='host-update-check-view5__content-section2-sellect-box' 
                                                key={id}
                                                onClick={()=>{click_sellect_box(el)}}
                                            >
                                                <div>
                                                    <img src={el.url}></img>
                                                </div>
                                                <span>{el.name}</span>

                                            </div>
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            <div className="host-update-check-view5__footer">
                <button className={`host-update-check-view5__fetch-button ${is_button ? 'button-enable' : 'button-disable'}`}
                        disabled={is_button ? false : true}
                        onClick={()=>{fetch_acc(check_out, check_out_method)}}                            
                >
                    저장
                </button>
            </div>
        </div>
    )
}

export default HostUpdateCheckView5