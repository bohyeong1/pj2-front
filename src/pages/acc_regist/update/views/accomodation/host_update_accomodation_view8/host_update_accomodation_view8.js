import './host_update_accomodation_view8.scss'
import default_data from "@/util/default_data/default_data";
// import useHostUpdateAccomodationView8Business from '../../../hook_store/business_hooks/host_update_accomodation_view2_business'
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import { state_store, reference_store } from '@/util/function/util_function'
import DropdownState from '@/utilComponent/material/dropdown_state/dropdown_state';
import '@/manage_scss_style/commonness/commonness.scss'

function HostUpdateAccomodationView8(){
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

    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-accomodation-view8__container'>
            <div className="host-update-accomodation-view8__title">
                <span>설명</span>
            </div>
            <div className='host-update-accomodation-view8__content'>

            </div>
            {/* footer */}
            <div className="host-update-accomodation-view8__footer">
                <button className={`host-update-accomodation-view8__fetch-button ${is_button ? 'button-enable' : 'button-disable'}`}
                disabled={is_button ? false : true}>저장</button>
            </div>

        </div>
    )
}

export default HostUpdateAccomodationView8