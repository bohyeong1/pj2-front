import './host_update_accomodation_view3.scss'
import default_data from "@/util/default_data/default_data";
import useHostUpdateAccomodationView3Business from '../../../hook_store/business_hooks/host_update_accomodation_view3_business'
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import { state_store, reference_store } from '@/util/function/util_function'
import '@/manage_scss_style/commonness/commonness.scss'

function HostUpdateAccomodationView3(){
    // =================================================
    // context //
    const {acc_data, setAcc_data} = useContext(AccDataContext)

    // =================================================
    // refs //
    const service_facility = useRef([])

    // =================================================
    // states //
    const [current_data, setCurrent_data] = useState(acc_data.service_facility.length > 0 ? acc_data.service_facility : [])
    const [loading, setLoading] = useState(null)
    const [is_button, setIs_button] = useState(false)
    
    // =================================================
    // hooks //
    // business
    const {match_sellect, click_box, fetch_acc} = useHostUpdateAccomodationView3Business({
            'acc_data' : acc_data,
            'setAcc_data' : setAcc_data
        },
        state_store([
            {
                'current_data' : current_data,
                'setCurrent_data' : setCurrent_data
            },
            {
                'loading' : loading,
                'setLoading' : setLoading
            },
            {
                'is_button' : is_button,
                'setIs_button' : setIs_button
            }
        ]),
        reference_store([
            {
                'service_facility' : service_facility
            }
        ])
    )

    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-accomodation-view3__container'>
            <div className='host-update-accomodation-view3__wrapper common-scroll-bar'>
                <div className="host-update-accomodation-view3__title">
                    <span>편의 시설</span>
                </div>
                <div className='host-update-accomodation-view3__content'>
                    <div className='host-update-accomodation-view3__section1-sellect'>
                        {default_data.d_service_facility_icon.map((ele, id)=>{
                            return(
                                <div className={`host-update-accomodation-view3__section1-box not-user-sellect acc-regist-sellect-box 
                                    ${match_sellect(acc_data.service_facility, ele) ? 'acc-regist-sellect-box-active' : ''}`}
                                ref={(el)=>{service_facility.current[id]=el}} key={id}
                                onClick={()=>{click_box(id)}}>
                                    <img src={ele.url}/>
                                    <div className="host-update-accomodation-view3__section1-box-text1">{ele.name}</div>
                                </div>
                            )
                        })}  
                    </div>                  
                </div>
            </div>
            {/* footer */}
            <div className="host-update-accomodation-view3__footer">
                <button className={`host-update-accomodation-view3__fetch-button ${is_button ? 'button-enable' : 'button-disable'}`}
                disabled={is_button ? false : true}
                onClick={fetch_acc}>저장</button>
            </div>
        </div>
    )
}

export default HostUpdateAccomodationView3