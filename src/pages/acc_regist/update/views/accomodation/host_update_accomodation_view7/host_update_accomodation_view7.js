import './host_update_accomodation_view7.scss'
import default_data from "@/util/default_data/default_data";
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import { state_store, reference_store } from '@/util/function/util_function'
import '@/manage_scss_style/commonness/commonness.scss'
import useHostUpdateAccomodationView7Style from '../../../hook_store/style_hooks/host_update_accomodation_view7_style';
import useHostUpdateAccomodationView7Business from '../../../hook_store/business_hooks/host_update_accomodation_view7_business';

function HostUpdateAccomodationView7(){
    // =================================================
    // context //
    const {acc_data, setAcc_data} = useContext(AccDataContext)

    // =================================================
    // refs //
    const capacity_ref = useRef(null)

    // =================================================
    // states //
    const [loading, setLoading] = useState(null)
    const [is_button, setIs_button] = useState(false)
    const [capacity, setCapacity] = useState(acc_data.capacity ? acc_data.capacity : 1)
    
    // =================================================
    // hooks //
    // business
    const {fetch_acc} = useHostUpdateAccomodationView7Business({
            'acc_data' : acc_data,
            'setAcc_data' : setAcc_data
        },
        state_store([
            {
                'capacity' : capacity,
                'setCapacity' : setCapacity
            },
            {
                'loading' : loading,
                'setLoading' : setLoading
            },
            {
                'is_button' : is_button,
                'setIs_button' : setIs_button
            },
        ])   
    )
    // style
    const {plus_click, minus_click} = useHostUpdateAccomodationView7Style(undefined,
        state_store([
            {
                'capacity' : capacity,
                'setCapacity' : setCapacity
            }
        ]),
        reference_store([
            {
                'capacity_ref' : capacity_ref
            }
        ])
    )

    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-accomodation-view7__container'>
            <div className='host-update-accomodation-view7__wrapper common-scroll-bar'>
                <div className="host-update-accomodation-view7__title">
                    <span>게스트 수</span>
                    <span>최대 30명까지 허용 가능합니다!</span>
                </div>
                <div className='host-update-accomodation-view7__content'>
                    <div className="host-update-accomodation-view7__content-box1">
                        {/* minus button */}
                        <button id="host-update-accomodation-view7__button" 
                                className={`host-update-accomodation-view7__content-box1-part1-lb ${capacity === 1 ? 'small-button-disabled' : 'small-button'}`} 
                                onClick={minus_click}
                                disabled={capacity === 1 ? true : false}>
                            <i className="material-icons minus-button">remove</i>
                        </button>
                        {/* value */}
                        <div className="host-update-accomodation-view7__content-box1-part1-text1">
                            <span ref={capacity_ref} 
                                  className="host-update-accomodation-view7__content-box1-part1_value">
                                {capacity}
                            </span>
                            <span>명</span>
                        </div>
                        {/* plus button */}
                        <button id="host-update-accomodation-view7__button" 
                                className={`host-update-accomodation-view7__content-box1-part1-rb ${capacity >= 30 ? 'small-button-disabled' : 'small-button'}`} 
                                onClick={plus_click}
                                disabled={capacity >= 30 ? true : false}>
                            <i className="material-icons plus-button">add</i>
                        </button>
                    </div>
                </div>
            </div>
            {/* footer */}
            <div className="host-update-accomodation-view7__footer">
                <button className={`host-update-accomodation-view7__fetch-button ${is_button ? 'button-enable' : 'button-disable'}`}
                        disabled={is_button ? false : true}
                        onClick={()=>{fetch_acc(capacity)}}>저장</button>
            </div>
        </div>
    )
}

export default HostUpdateAccomodationView7