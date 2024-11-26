import './host_update_accomodation_view4.scss'
import default_data from "@/util/default_data/default_data";
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import { state_store, reference_store } from '@/util/function/util_function'
import '@/manage_scss_style/commonness/commonness.scss'
import OriginalImg from '@/picture/original_img/original_img';
import ImgRegistModal from '@/utilComponent/modal/img_regist_modal/img_regist_modal';
import useHostUpdateAccomodationView4Style from '../../../hook_store/style_hooks/host_update_accomodation_view4_style';
import useHostUpdateAccomodationView4Business from '../../../hook_store/business_hooks/host_update_accomodation_view4_business';

function HostUpdateAccomodationView4(){
    // =================================================
    // context //
    const {acc_data, setAcc_data} = useContext(AccDataContext)

    // =================================================
    // states //
    const [loading, setLoading] = useState(null)
    const [is_button, setIs_button] = useState(false)
    const [current_data, setCurrent_data] = useState(
        acc_data.main_img && acc_data.sub_img.length > 3 ? 
        {
            main_img : acc_data.main_img,
            delete_prev_main : null,
            main_file : null,
            main_display_url : acc_data.main_img,

            sub_img : acc_data.sub_img,
            delete_prev_sub : [],
            sub_file : [],
            sub_display_url : acc_data.sub_img.map((el)=>{
                return {
                    url : el,
                    buffer : null
                }
            })
        } : null)
    const [sellect_target, setSellect_target] = useState(null)

    // =================================================
    // hooks //
    // business
    const {fetch_acc} = useHostUpdateAccomodationView4Business(
        {
            acc_data,
            setAcc_data
        },
        state_store([
            {current_data, setCurrent_data},
            {loading, setLoading},
            {is_button, setIs_button}
        ])
    )
    // style
    const {
        img_modal_toggle, 
        img_delete, 
        set_img
    } = useHostUpdateAccomodationView4Style(
        undefined,
        state_store([
            {current_data, setCurrent_data},
            {sellect_target, setSellect_target}
        ])
    )

    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-accomodation-view4__container'>
            <div className='host-update-accomodation-view4__wrapper common-scroll-bar'>
                <div className="host-update-accomodation-view4__title">
                    <span>포토</span>
                    <span>대표 이미지를 포함해 최소 5장을 등록해 주세요!</span>
                </div>
                <div className='host-update-accomodation-view4__content'>
                    <div className='host-update-accomodation-view4__section1'>
                        <div className='host-update-accomodation-view4__section1-title'>
                            <span>대표 이미지</span>
                            <span>{`${current_data && current_data.main_display_url ? 1 : 0}/1개`}</span>
                        </div>
                        <div className='host-update-accomodation-view4__section1-img-box'>
                            {current_data && current_data.main_display_url ? 
                            <div className='host-update-accomodation-view4__section1-img'>                                
                                <OriginalImg url={current_data.main_display_url}/>
                                {/* delete btn */}
                                <button 
                                    className="host-update-accomodation-view4__img-delete-btn"  
                                    onClick={()=>{img_delete(current_data.main_display_url, 'main')}}>
                                    <img src={default_data.d_imgs.transh_can}></img>
                                </button>
                            </div> : 
                            // add box
                            <div className='host-update-accomodation-view4__img-add-box'>
                                {/* add btn */}
                                <button 
                                    className="host-update-accomodation-view4__img-add-btn"   
                                    onClick={()=>{img_modal_toggle('host-update-accomodation-view4-img-modal', 'main')}}>
                                    <img src={default_data.d_imgs.plus}></img>
                                </button>
                            </div>}                           
                        </div>
                    </div>
                    <div className="host-update-accomodation-view4__section2">
                        <div className='host-update-accomodation-view4__section2-title'>
                            <span>서브 이미지</span>
                            <span>{`${current_data ? current_data.sub_display_url.length : 0}/9개`}</span>
                        </div>
                        
                        <div className='host-update-accomodation-view4__section2-img-box'>
                            {current_data && current_data.sub_display_url.length > 0 ? current_data.sub_display_url.map((el, id)=>{
                                return (
                                    <div key={id} 
                                         className='host-update-accomodation-view4__section2-img'>
                                        <OriginalImg 
                                            url={el.url}>                                                
                                        </OriginalImg>
                                        {/* delete btn */}
                                        <button 
                                            className="host-update-accomodation-view4__img-delete-btn"  
                                            onClick={()=>{img_delete(el, 'sub')}}>
                                            <img src={default_data.d_imgs.transh_can}></img>
                                        </button>
                                    </div>
                                )
                            }) : null}    
                            {/* add box */}
                            {current_data && current_data.sub_display_url.length < 9 ? 
                            <div className='host-update-accomodation-view4__img-add-box'>
                                {/* add btn */}
                                <button 
                                    className="host-update-accomodation-view4__img-add-btn"   
                                    onClick={()=>{img_modal_toggle('host-update-accomodation-view4-img-modal', 'sub')}}>
                                    <img src={default_data.d_imgs.plus}></img>
                                </button>
                            </div> : null}
                        </div>               
                    </div>
                </div>
            </div>
            {/* footer */}
            <div className="host-update-accomodation-view4__footer">
                <button 
                    className={`host-update-accomodation-view4__fetch-button ${is_button ? 'button-enable' : 'button-disable'}`}
                    disabled={is_button ? false : true}
                    onClick={fetch_acc}>
                        저장
                </button>
            </div>

            {/* modal */}
            <ImgRegistModal
                img_modal_toggle={img_modal_toggle} 
                drop_img_state={current_data} 
                setDrop_img_state={set_img} 
                target_id={'host-update-accomodation-view4-img-modal'}>
            </ImgRegistModal>

        </div>
    )
}

export default HostUpdateAccomodationView4