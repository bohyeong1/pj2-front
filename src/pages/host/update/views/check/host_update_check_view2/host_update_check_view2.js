import './host_update_check_view2.scss'
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import { state_store, reference_store, text_change } from '@/util/function/util_function'
import '@/manage_scss_style/commonness/commonness.scss'
import useHostUpdateCheckView2Business from '../../../hook_store/business_hooks/host_update_check_view2_business';

function HostUpdateCheckView2(){
    // =================================================
    // context //
    const {acc_data, setAcc_data} = useContext(AccDataContext)

    // =================================================
    // refs //
    const row_alram_ref = useRef(null) 
    const summary_alert = useRef(null) 
    const summary_gurabox = useRef(null)

    // =================================================
    // states //
    const [loading, setLoading] = useState(null)
    const [is_button, setIs_button] = useState(false)
    const [summary, setSummary] = useState(acc_data.custom_navigation ? acc_data.custom_navigation : null)
    const [line_error, setLine_error] = useState(false)
    
    // =================================================
    // hooks //
    // business
    const {fetch_acc, 
           watch, 
           register, 
           errors} = useHostUpdateCheckView2Business({
                            'acc_data' : acc_data,
                            'setAcc_data' : setAcc_data
                        },
                        state_store([
                            {
                                'loading' : loading,
                                'setLoading' : setLoading
                            },
                            {
                                'is_button' : is_button,
                                'setIs_button' : setIs_button
                            },
                            {
                                'summary' : summary,
                                'setSummary' : setSummary
                            }
                        ]),
                        reference_store([
                            {
                                'row_alram_ref' : row_alram_ref
                            },
                            {
                                'summary_alert' : summary_alert
                            },
                            {
                                'summary_gurabox' : summary_gurabox
                            }
                        ])
                     ) 

    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-check-view2__container'>
            <div className='host-update-check-view2__wrapper common-scroll-bar'>
                <div className="host-update-check-view2__title">
                    <span>찾아오는 방법</span>
                </div>
                <div className='host-update-check-view2__content'>
                    <div className="host-update-check-view2__content-box1">
                        <textarea  className="host-update-check-view2__content-box1-text1 border-textarea" 
                                   type='text' 
                                   spellCheck={false}
                                   {...register('summary', {
                                   onChange : (e)=>{text_change(e.target.value, 
                                                                summary_gurabox.current, 
                                                                row_alram_ref.current, 
                                                                summary_alert.current, 
                                                                20, 
                                                                20.52,
                                                                setLine_error,
                                                                line_error)}
                                   })}
                                   placeholder='게스트에게 숙소에 찾아오는 방법을 알려주세요. 주차나 대중교통에 대한 팁을 제공하세요.'>                            
                        </textarea >
                    </div>

                    <pre className="host-update-check-view2__gurabox" 
                         ref={summary_gurabox}>                            
                    </pre>

                    <div className="host-update-check-view2__content-box2">
                        <div className="host-update-check-view2__content-box2-text1">
                            <span>라인 - </span>
                            <span ref={row_alram_ref}>0/20</span>
                        </div>
                        {/* alram */}
                        <div ref={summary_alert} 
                             className="host-update-check-view2__content-box2-text2" 
                             style={{display:'none'}}>
                                20줄 이내로 작성해 주세요!
                        </div>
                        {/* error */}
                        {errors.summary && <span className="input-alert-text">
                            {errors.summary.message}
                        </span>}  
                    </div> 
                </div>
            </div>
            {/* footer */}
            <div className="host-update-check-view2__footer">
                <button className={`host-update-check-view2__fetch-button ${is_button && !line_error ? 'button-enable' : 'button-disable'}`}
                        disabled={is_button && !line_error ? false : true}
                        onClick={()=>{fetch_acc(watch('summary'))}}>
                            저장
                </button>
            </div>
        </div>
    )
}

export default HostUpdateCheckView2