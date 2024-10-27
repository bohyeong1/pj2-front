import './host_update_accomodation_view1.scss'
import useHostRegistView0Business from '../../../hook_store/business_hooks/host_update_accomodation_view1_business'
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import useHostRegistView0Style from '../../../hook_store/style_hooks/host_update_accomodation_view1_style'
import { state_store, reference_store } from '@/util/function/util_function'
import '@/manage_scss_style/commonness/commonness.scss'

function HostRegistView0(){
    // =================================================
    // context //
    const {acc_data, setAcc_data} = useContext(AccDataContext)
 
    // =================================================
    // refs //
    const accomodation_title_alram = useRef(null)

    // =================================================
    // states //
    const [title, setTitle] = useState(acc_data.title ? acc_data.title : null)
    const [loading, setLoading] = useState(null)
    const [is_button, setIs_button] = useState(false)

    // =================================================
    // hooks //
    // business
    const {fetch_acc, register, errors, getValues, isValid} = useHostRegistView0Business(
        {
            'acc_data' : acc_data,
            'setAcc_data' : setAcc_data
        }, 
        state_store([
            {
                'title' : title,
                'setTitle' : setTitle
            },
            {
                'loading' : loading,
                'setLoading' : setLoading
            },
            {
                'is_button' : is_button,
                'setIs_button' : setIs_button
            },
        ]))
    // style
    const {text_input_change} = useHostRegistView0Style({
            'getValues' : getValues
        }, 
        state_store([
            {
                'title' : title,
                'setTitle' : setTitle
            },
            {
                'is_button' : is_button,
                'setIs_button' : setIs_button
            },
        ]),
        reference_store([
            {
                'accomodation_title_alram' : accomodation_title_alram
            }
        ])
    )

    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-accomodation-view1__container'>
            <div className='host-update-accomodation-view__content-section1'>
                <div className="host-update-accomodation-view1__content-section1-box1-title">
                    <span>숙소 이름</span>
                </div>
                <div className="host-update-accomodation-view1__content-section1-wrapper">
                    <form className="host-update-accomodation-view1__content-section1-box1">                        
                        <textarea  className="host-update-accomodation-view1__content-section1-box1-text1 border-textarea" maxLength={19}
                        type='text' spellCheck={false}
                        {...register('title', {
                            onChange : (e)=>{text_input_change(e.target.value)}
                        })}>                        
                        </textarea>
                    </form>
                    {/* error */}
                    {errors.title && <span className="input-alert-text">{errors.title.message}</span>}                            
                    {/* text length */}
                    <div className="host-update-accomodation-view1__content-section1-box2">
                        <div ref={accomodation_title_alram} className="host-update-accomodation-view1__content-section1-box2-text1">0/20</div>
                    </div> 
                </div> 
            </div>
            <div className="host-update-accomodation-view1__footer">
                <button className={`host-update-accomodation-view1__fetch-button ${is_button && isValid ? 'button-enable' : 'button-disable'}`}
                disabled={is_button && isValid ? false : true}
                onClick={() => {fetch_acc(getValues('title'))}}>저장</button>
            </div>
         </div>
    )
}

export default HostRegistView0