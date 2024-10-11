import './host_update_accomodation_view2.scss'
import default_data from "@/util/default_data/default_data";
import useHostUpdateAccomodationView2Business from '../../../hook_store/business_hooks/host_update_accomodation_view2_business'
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import { state_store, reference_store } from '@/util/function/util_function'
import DropdownState from '@/utilComponent/material/dropdown_state/dropdown_state';
import '@/manage_scss_style/commonness/commonness.scss'

function HostUpdateAccomodationView2(){
    // =================================================
    // context //
    const {acc_data, setAcc_data} = useContext(AccDataContext)

    // =================================================
    // refs //
    const space_categories = useRef([])

    // =================================================
    // states //
    const [loading, setLoading] = useState(null)
    const [category, setCategory] = useState(acc_data.category ? acc_data.category : null)
    const [space_category, setSpace_category] = useState(acc_data.space_category ? acc_data.space_category : null)
    const [is_button, setIs_button] = useState(false)
    
    // =================================================
    // hooks //
    // business
    const {fetch_acc, click_box} = useHostUpdateAccomodationView2Business({
            'acc_data' : acc_data,
            'setAcc_data' : setAcc_data
        },
        state_store([
            {
                'loading' : loading,
                'setLoading' : setLoading
            },
            {
                'category' : category,
                'setCategory' : setCategory
            },
            {
                'space_category' : space_category,
                'setSpace_category' : setSpace_category
            },
            {
                'is_button' : is_button,
                'setIs_button' : setIs_button
            }
        ]),
        reference_store([
            {
                'space_categories' : space_categories
            }
        ])
    )

    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-accomodation-view2__container'>
            <div className='host-update-accomodation-view2__wrapper common-scroll-bar'>
                <div className="host-update-accomodation-view2__title">
                    <span>숙소 유형</span>
                </div>
                <div className='host-update-accomodation-view2__content'>
                    <div className='host-update-accomodation-view2__section1'>
                        <span className='host-update-accomodation-view2__section1-title'>숙소</span>
                        <DropdownState menus={default_data.d_category_icon} sellect = {category} call_back = {setCategory}></DropdownState>
                    </div>
                    <div className="host-update-accomodation-view2__section2">
                        <span className='host-update-accomodation-view2__section2-title'>공간</span>
                        <div className='host-update-accomodation-view2__section2-sellect'>
                            {default_data.d_house_space.map((ele,id)=>{
                                return(
                                    <div className={`host-update-accomodation-view2__section2-box not-user-sellect acc-regist-sellect-box 
                                        ${ele.name === acc_data.space_category.name ? 'acc-regist-sellect-box-active' : ''}`}
                                        ref={(el)=>{space_categories.current[id]=el}} 
                                        key={id}
                                        onClick={()=>{click_box(id)}}>
                                        <img src={ele.url}/>
                                        <div className="host-update-accomodation-view2__section2-box-text1">{ele.name}</div>
                                        <div className="host-update-accomodation-view2__section2-box-text2">{ele.text}</div>
                                    </div>
                                )
                            })}  
                        </div>                  
                    </div>
                </div>
            </div>

            {/* footer */}
            <div className="host-update-accomodation-view2__footer">
                <button className={`host-update-accomodation-view2__fetch-button ${is_button ? 'button-enable' : 'button-disable'}`}
                disabled={is_button ? false : true}
                onClick={() => {fetch_acc(category, space_category)}}>저장</button>
            </div>

        </div>
    )
}

export default HostUpdateAccomodationView2