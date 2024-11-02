import './host_update_check_view3.scss'
import default_data from "@/util/default_data/default_data";
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import { state_store, reference_store } from '@/util/function/util_function'
import '@/manage_scss_style/commonness/commonness.scss'
import useHostUpdateCheckView3Business from '../../../hook_store/business_hooks/host_update_check_view3_business';

function HostUpdateCheckView3(){
    // =================================================
    // context //
    const {acc_data, setAcc_data} = useContext(AccDataContext)

    // =================================================
    // states //
    const [loading, setLoading] = useState(null)
    const [is_button, setIs_button] = useState(false)
    const [wifi_id, setWifi_id] = useState(
        acc_data && acc_data.wifi_information && acc_data.wifi_information.id ? acc_data.wifi_information.id : null
    )
    const [wifi_password, setWifi_password] = useState(
        acc_data && acc_data.wifi_information && acc_data.wifi_information.password ? acc_data.wifi_information.password : null
    )
    
    // =================================================
    // hooks //
    // business
    const {
        register, 
        errors, 
        watch,
        fetch_acc
    } = useHostUpdateCheckView3Business(
        {
            acc_data,
            setAcc_data
        },
        state_store([
            {wifi_id, setWifi_id},
            {wifi_password, setWifi_password},
            {is_button, setIs_button},
            {loading,setLoading}
        ])
    )

    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-check-view3__container'>
            <div className='host-update-check-view3__wrapper common-scroll-bar'>
                <div className="host-update-check-view3__title">
                    <span>와이파이 세부 정보</span>
                </div>
                <div className='host-update-check-view3__content'>
                    <div className='host-udpate-check-view3__id-wrapper'>
                        {/* sub title */}
                        <div className='host-update-check-view3__sub-title'>
                            <span>와이파이 이름</span>
                            <div className="host-update-check-view3__sub-title-box">
                                <div></div>
                            </div>
                        </div>
                        <div className='host-update-check-view3__input-wrapper'>
                            <input type="text" 
                                   placeholder="숙소의 와이파이 아이디를 입력해 주세요" 
                                   className={`host-update-check-view3__input ${errors.id ? 'input-invalid' : ''}`} 
                                   {...register('id')} 
                                   autoComplete="off">
                            </input>
                            {errors.id && <span className="input-alert-text">{errors.id.message}</span>}
                        </div>
                    </div>
                    <div className='host-udpate-check-view3__password-wrapper'>
                        {/* sub title */}
                        <div className='host-update-check-view3__sub-title'>
                            <span>와이파이 비밀번호</span>
                                <div className="host-update-check-view3__sub-title-box">
                                    <div></div>
                            </div>
                        </div>
                        <div className='host-update-check-view3__input-wrapper'>
                            <input type="text" 
                                   placeholder="숙소의 와이파이 비밀번호를 입력해 주세요" 
                                   className={`host-update-check-view3__input ${errors.password ? 'input-invalid' : ''}`} 
                                   {...register('password')} 
                                   autoComplete="off">
                            </input>
                            {errors.password && <span className="input-alert-text">{errors.password.message}</span>}
                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            <div className="host-update-check-view3__footer">
                <button className={`host-update-check-view3__fetch-button ${is_button ? 'button-enable' : 'button-disable'}`}
                        disabled={is_button ? false : true}
                        onClick={()=>{fetch_acc(watch('id'), watch('password'))}}
                        >저장</button>
            </div>
        </div>
    )
}

export default HostUpdateCheckView3