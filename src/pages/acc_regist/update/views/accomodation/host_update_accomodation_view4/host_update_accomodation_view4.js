import './host_update_accomodation_view4.scss'
import default_data from "@/util/default_data/default_data";
// import useHostUpdateAccomodationView4Business from '../../../hook_store/business_hooks/host_update_accomodation_view4_business'
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import { state_store, reference_store } from '@/util/function/util_function'
import DropdownState from '@/utilComponent/material/dropdown_state/dropdown_state';
import '@/manage_scss_style/commonness/commonness.scss'
import OriginalImg from '../../../../../../picture/original_img/original_img';

function HostUpdateAccomodationView4(){
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
        <div className='host-update-accomodation-view4__container'>
            <div className='host-update-accomodation-view4__wrapper common-scroll-bar'>
                <div className="host-update-accomodation-view4__title">
                    <span>포토</span>
                </div>
                <div className='host-update-accomodation-view4__content'>
                    <div className='host-update-accomodation-view4__section1'>
                        <span className='host-update-accomodation-view4__section1-title'>대표 이미지</span>
                        <div className='host-update-accomodation-view4__section1-img-box'>
                            <div className='host-update-accomodation-view4__section1-img'>
                                {acc_data ? <OriginalImg url={acc_data.main_img}></OriginalImg> : null}
                            </div>
                        </div>
                    </div>
                    <div className="host-update-accomodation-view4__section2">
                        <span className='host-update-accomodation-view4__section2-title'>서브 이미지</span>
                        <div className='host-update-accomodation-view4__section2-img-box'>
                            {acc_data ? acc_data.sub_img.map((el, id)=>{
                                return (
                                    <div key={id} className='host-update-accomodation-view4__section2-img'>
                                        <OriginalImg url={el}></OriginalImg>
                                    </div>
                                )
                            }) : null}    
                        </div>               
                    </div>
                </div>
            </div>
            {/* footer */}
            <div className="host-update-accomodation-view4__footer">
                <button className={`host-update-accomodation-view4__fetch-button ${is_button ? 'button-enable' : 'button-disable'}`}
                disabled={is_button ? false : true}>저장</button>
            </div>

        </div>
    )
}

export default HostUpdateAccomodationView4