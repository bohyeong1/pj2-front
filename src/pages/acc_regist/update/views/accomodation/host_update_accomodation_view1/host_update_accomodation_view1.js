import './host_update_accomodation_view1.scss'
import useHostUpdateAccomodationView1Business from '../../../hook_store/business_hooks/host_update_accomodation_view1_business'
import Loading from '../../../../../../utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import useHostUpdateAccomodationView1Style from '../../../hook_store/style_hooks/host_update_accomodation_view1_style'
import { state_store, reference_store, button_state } from '@/util/function/util_function'
import '@/manage_scss_style/commonness/commonness.scss'

function HostUpdateAccomodationView1(){
    // =================================================
    // accomodation information //
    const accomodation = useContext(AccDataContext).acc_data

    // =================================================
    // refs //
    const accomodation_title_alram = useRef(null)

    // =================================================
    // states //
    const [title, setTitle] = useState(accomodation.title ? accomodation.title : null)
    const [prev_data, setPrev_data] = useState(accomodation.title ? accomodation.title : null)
    const [loading, setLoading] = useState(null)

    // =================================================
    // hooks //
    // business
    const {fetch_acc, register, errors, isValid, get_valid} = useHostUpdateAccomodationView1Business(undefined, 
        state_store([
            {
                'title' : title,
                'setTitle' : setTitle
            },
            {
                'prev_data' : prev_data,
                'setPrev_data' : setPrev_data
            },
            {
                'loading' : loading,
                'setLoading' : setLoading
            },
        ]))
    // style
    const {text_input_change} = useHostUpdateAccomodationView1Style(undefined, undefined,
        reference_store([
            {
                'accomodation_title_alram' : accomodation_title_alram
            }
        ])
    )

    return (
        loading === false ? <Loading></Loading> :
        <div className='host-update-accomodation-view1__container'>
            <div className='host-update-accomodation-view__content-section1'>
                <div className="host-update-accomodation-view1__content-section1-box1-title">
                    <span>숙소 이름</span>
                    <div className="host-update-accomodation-view1__section-box">
                        <div></div>
                    </div>
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
                <button className={`host-update-accomodation-view1__fetch-button ${button_state(true, get_valid , isValid)}`}
                disabled={button_state(false, get_valid , isValid)}>저장</button>
            </div>
         </div>
    )
}

export default HostUpdateAccomodationView1