import './host_update_check_view6.scss'
import default_data from "@/util/default_data/default_data";
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import { state_store, reference_store } from '@/util/function/util_function'
import '@/manage_scss_style/commonness/commonness.scss'
import useHostUpdateCheckView6Business from '../../../hook_store/business_hooks/host_update_check_view6_business';

function HostUpdateCheckView6(){
    // =================================================
    // context //
    const {acc_data, setAcc_data} = useContext(AccDataContext)

    // =================================================
    // refs //
    const comunication_categories = useRef([])

    // =================================================
    // states //
    const [loading, setLoading] = useState(null)
    const [is_button, setIs_button] = useState(false)
    const [comunication, setComunication] = useState(acc_data.comunication ? acc_data.comunication : null)
    
    // =================================================
    // hooks //
    // business
    const {fetch_acc, click_box} = useHostUpdateCheckView6Business({
                                            'acc_data' : acc_data,
                                            'setAcc_data' : setAcc_data
                                        },
                                        state_store([
                                            {
                                                'loading' : loading,
                                                'setLoading' : setLoading
                                            },
                                            {
                                                'comunication' : comunication,
                                                'setComunication' : setComunication
                                            },
                                            {
                                                'is_button' : is_button,
                                                'setIs_button' : setIs_button
                                            }
                                        ]),
                                        reference_store([
                                            {
                                                'comunication_categories' : comunication_categories
                                            }
                                        ])
                                    )

    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-check-view6__container'>
            <div className='host-update-check-view6__wrapper common-scroll-bar'>
                <div className="host-update-check-view6__title">
                    <span>커뮤니케이션</span>
                </div>
                <div className='host-update-check-view6__content'>
                    <div className='host-update-check-view6__sellect'>
                        {default_data.d_comunication.map((el,id)=>{
                            return(
                                <div className={`host-update-check-view6__box not-user-sellect
                                    ${acc_data.comunication && el.name === acc_data.comunication.name ? 'acc-regist-sellect-box-active' : ''}`}
                                    ref={(el)=>{comunication_categories.current[id]=el}} 
                                    key={id}
                                    onClick={()=>{click_box(id)}}>
                                    <div className="host-update-check-view6__box-text1">{el.name}</div>
                                </div>
                            )
                        })}  
                    </div>                     
                </div>
            </div>
            {/* footer */}
            <div className="host-update-check-view6__footer">
                <button className={`host-update-check-view6__fetch-button ${is_button ? 'button-enable' : 'button-disable'}`}
                        disabled={is_button ? false : true}
                        onClick={fetch_acc}
                        >저장</button>
            </div>
        </div>
    )
}

export default HostUpdateCheckView6