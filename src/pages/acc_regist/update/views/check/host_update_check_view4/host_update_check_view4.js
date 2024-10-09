import './host_update_check_view4.scss'
import default_data from "@/util/default_data/default_data";
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import { state_store, reference_store } from '@/util/function/util_function'
import '@/manage_scss_style/commonness/commonness.scss'

function HostUpdateCheckView4(){
    // =================================================
    // context //
    const {acc_data, setAcc_data} = useContext(AccDataContext)

    // =================================================
    // refs //

    // =================================================
    // states //
    const [loading, setLoading] = useState(null)
    const [is_button, setIs_button] = useState(false)
    
    // =================================================
    // hooks //
    // business

    // style


    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-check-view4__container'>
            <div className='host-update-check-view4__wrapper common-scroll-bar'>
                <div className="host-update-check-view4__title">
                    <span>숙소 메뉴얼</span>
                </div>
                <div className='host-update-check-view4__content'>
                    
                </div>
            </div>
            {/* footer */}
            <div className="host-update-check-view4__footer">
                <button className={`host-update-check-view4__fetch-button ${is_button ? 'button-enable' : 'button-disable'}`}
                        disabled={is_button ? false : true}
                        >저장</button>
            </div>
        </div>
    )
}

export default HostUpdateCheckView4