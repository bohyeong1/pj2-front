import './host_update_accomodation_view6.scss'
import default_data from "@/util/default_data/default_data";
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import { state_store, reference_store } from '@/util/function/util_function'
import '@/manage_scss_style/commonness/commonness.scss'
import useHostUpdateAccomodationView6Business from '../../../hook_store/business_hooks/host_update_accomodation_view6_business';
import useHostUpdateAccomodationView6Style from '../../../hook_store/style_hooks/host_update_accomodation_view6_style';
import DropdownState from '@/utilComponent/material/dropdown_state/dropdown_state';
import RangeButton from '../../../../../../utilComponent/Button/range_button/range_button';

function HostUpdateAccomodationView6(){
    // =================================================
    // context //
    const {acc_data, setAcc_data} = useContext(AccDataContext)

    // =================================================
    // refs //

    // =================================================
    // states //
    const [loading, setLoading] = useState(null)
    const [is_button, setIs_button] = useState(false)
    const [price, setPrice] = useState(
        acc_data.price ? acc_data.price : null
    )
    const [add_price, setAdd_price] = useState(
        acc_data.addPrice ? acc_data.addPrice : null
    )
    const [discount_date, setDiscount_date] = useState(
        acc_data.discount && acc_data.discount.date ? acc_data.discount.date : null
    )
    const [discount_rate, setDiscount_rate] = useState(
        acc_data.discount && acc_data.discount.rate ? acc_data.discount.rate : 0
    )
    
    // =================================================
    // hooks //
    // business
    const {register, watch, fetch_acc, errors} = useHostUpdateAccomodationView6Business(
        {
            acc_data,
            setAcc_data 
        },
        state_store([
            {loading, setLoading},
            {is_button, setIs_button},
            {price, setPrice},
            {add_price, setAdd_price},
            {discount_date, setDiscount_date},
            {discount_rate, setDiscount_rate}
        ])
    )
    // style
    const {input_control} = useHostUpdateAccomodationView6Style()

    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-accomodation-view6__container'>
            <div className='host-update-accomodation-view6__wrapper common-scroll-bar'>
                <div className="host-update-accomodation-view6__title">
                    <span>요금 책정</span>
                </div>
                <div className='host-update-accomodation-view6__content'>

                    {/* base price */}
                    <div className='host-update-accomodation-view6__section1'>
                        <div className='host-update-accomodation-view6__section1-title'>
                            <span>기본 요금</span>
                        </div>
                        <div className="host-update-accomodation-view6__section1-input-wrapper">
                            <div className="host-update-accomodation-view6__section1-input">
                                <input type="text"
                                    {...register('price', {
                                        onChange : (e)=>{input_control(e)}
                                    })}>
                                </input>
                                <label>원</label>
                            </div>   
                            {/* error */}
                            {errors.price && <span className="input-alert-text">{errors.price.message}</span>} 
                        </div>
                    </div>

                    {/* add price */}
                    <div className="host-update-accomodation-view6__section2">
                        <div className='host-update-accomodation-view6__section2-title'>
                            <span>추가 인원 요금</span>
                        </div>  
                        <div className="host-update-accomodation-view6__section2-input-wrapper">
                            <div className="host-update-accomodation-view6__section2-input">
                                <input type="text"
                                    {...register('add_price', {
                                        onChange : (e)=>{input_control(e)}
                                    })}>                                    
                                </input>
                                <label>원</label>
                            </div>
                            {/* error */}
                            {errors.add_price && <span className="input-alert-text">{errors.add_price.message}</span>} 
                        </div>                     
                    </div>
 
                   {/* discount price */}
                    <div className="host-update-accomodation-view6__section3">
                        <div className='host-update-accomodation-view6__section3-title'>
                            <span>할인 설정</span>
                        </div>                    
                        <div className='host-update-accomodation-view6__section3-input-wrapper'>
                            <div className='host-update-accomodation-view6__section3-dropdown-wrapper'>
                                <DropdownState 
                                    menus={default_data.discount_date} 
                                    sellect = {discount_date} 
                                    call_back = {setDiscount_date}
                                    default_message = {'할인 가능 날짜를 설정해 주세요!'}></DropdownState>
                            </div>
                            <div className='host-update-accomodation-view6__section3-range-wrapper'>
                                {discount_date ? <RangeButton
                                    price={parseInt(watch('price')?.split(',').join(''))}
                                    discount_date={discount_date}
                                    rate={discount_rate}
                                    set_rate={setDiscount_rate}>                                    
                                </RangeButton> : null}
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
            {/* footer */}
            <div className="host-update-accomodation-view6__footer">
                <button className={`host-update-accomodation-view6__fetch-button ${is_button ? 'button-enable' : 'button-disable'}`}
                        disabled={is_button ? false : true}
                        onClick={()=>{fetch_acc(watch('price'), watch('add_price'))}}>저장</button>
            </div>

        </div>
    )
}

export default HostUpdateAccomodationView6