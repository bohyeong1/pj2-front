import './host_update_accomodation_view8.scss'
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import { state_store, reference_store, text_change } from '@/util/function/util_function'
import '@/manage_scss_style/commonness/commonness.scss'
import useHostUpdateAccomodationView8Business from '../../../hook_store/business_hooks/host_update_accomodation_view8_business';

function HostUpdateAccomodationView8(){
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
    const [summary, setSummary] = useState(acc_data.summary ? acc_data.summary : null)
    const [line_error, setLine_error] = useState(false)
    
    // =================================================
    // hooks //
    // business
    const {
        fetch_acc, 
        watch, 
        register, 
        errors
    } = useHostUpdateAccomodationView8Business(
        {acc_data, setAcc_data},
        state_store([
            {loading, setLoading},
            {is_button, setIs_button},
            {summary, setSummary }
        ]),
        reference_store([
            {row_alram_ref},
            {summary_alert},
            {summary_gurabox}
        ])
    ) 

    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-accomodation-view8__container'>
            <div className='host-update-accomodation-view8__wrapper common-scroll-bar'>
                <div className="host-update-accomodation-view8__title">
                    <span>설명</span>
                </div>
                {/* content */}
                <div className='host-update-accomodation-view8__content'>
                    <div className="host-update-accomodation-view8__content-box1">
                        <textarea  
                        className="host-update-accomodation-view8__content-box1-text1 border-textarea" 
                        type='text' 
                        spellCheck={false}
                        {...register('summary', {
                        onChange : (e)=>{text_change(
                            e.target.value, 
                            summary_gurabox.current, 
                            row_alram_ref.current, 
                            summary_alert.current, 
                            50, 
                            20.52,
                            setLine_error,
                            line_error
                        )}})}
                        placeholder='숙소를 설명하는 글을 작성해주세요!'/>                            
                    </div>

                    <pre className="host-update-accomodation-view8__gurabox" 
                         ref={summary_gurabox}>                            
                    </pre>

                    <div className="host-update-accomodation-view8__content-box2">
                        <div className="host-update-accomodation-view8__content-box2-text1">
                            <span>라인 - </span>
                            <span ref={row_alram_ref}>0/50</span>
                        </div>
                        {/* alram */}
                        <div ref={summary_alert} 
                             className="host-update-accomodation-view8__content-box2-text2" 
                             style={{display:'none'}}>
                                50줄 이내로 작성해 주세요!
                        </div>
                        {/* error */}
                        {errors.summary && <span className="input-alert-text">
                            {errors.summary.message}
                        </span>}  
                    </div> 
                </div>
            </div>
            {/* footer */}
            <div className="host-update-accomodation-view8__footer">
                <button className={`host-update-accomodation-view8__fetch-button ${is_button && !line_error ? 'button-enable' : 'button-disable'}`}
                        disabled={is_button && !line_error ? false : true}
                        onClick={()=>{fetch_acc(watch('summary'))}}>
                            저장
                </button>
            </div>
        </div>
    )
}

export default HostUpdateAccomodationView8