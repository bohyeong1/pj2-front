import {useState, useContext} from "react";
import './host_regist_view6.scss'
import Host_footer from "@/utilComponent/menu/host-footer/Host-footer";
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";
import ImgRegistModal from "@/utilComponent/modal/img_regist_modal/img_regist_modal";
import useHostRegistView6Business from "../../hook_store/business_hooks/host_regist_view6_business";
import useHostRegistView6Style from "../../hook_store/style_hooks/host_regist_view6_style";
import { state_store } from "@/util/function/util_function";
import Loading from "@/utilComponent/material/loading/loading";
import trash_can from '@/assets/icon/trashcan-icon.png'
import plus from '@/assets/icon/plus-icon.png'
import _ from 'lodash'
import OriginalImg from '@/picture/original_img/original_img';

function HostRegistView6(){

    // =================================================
    // context states //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // states //
    const [current_data, setCurrent_data] = useState(         
        {
            main_img : host_acc.main_img && host_acc.sub_img.length > 3 ? host_acc.main_img : null,
            delete_prev_main : null,
            main_file : null,
            main_display_url : host_acc.main_img && host_acc.sub_img.length > 3 ? host_acc.main_img : null,

            sub_img : host_acc.main_img && host_acc.sub_img.length > 3 ? host_acc.sub_img : null,
            delete_prev_sub : [],
            sub_file : [],
            sub_display_url : host_acc.main_img && host_acc.sub_img.length > 3 ? host_acc.sub_img.map((el)=>{
                return {
                    url : el,
                    buffer : null
                }
            }) : Array.from({length : 4}).map((el)=>{return {url : null, buffer : null}})
        } 
    )
    const [loading, setLoading] = useState(null)
    const [sellect_target, setSellect_target] = useState(null)

    // =================================================
    // hooks //
    // business
    const {fetch_acc} = useHostRegistView6Business(
        {
            host_acc, 
            setHost_acc
        },
        state_store([
            {loading, setLoading},
            {current_data, setCurrent_data}            
        ]), 
        undefined
    )

    // style
    const {
        img_modal_toggle, 
        img_delete,
        set_img
    } = useHostRegistView6Style(
        undefined,
        state_store([
            {sellect_target, setSellect_target},
            {current_data, setCurrent_data}
        ])
    )

    return(
        loading === false ? <Loading></Loading> :
        <div className="host-regist-view6__container">
            <div className="host-regist-view6__content">
                <div className="host-regist-view6__content-title">
                    <span>숙소를 대표하는 이미지를 등록해주세요</span>                    
                    <div className="host-regist-view6__content-title-section1">
                        <span>초기 등록 5장이 필요 합니다!</span>
                    </div>
                </div>

                {/* 메인이미지 디스플레이 */}
                <div className="host-regist-view6__content-section2">
                    {current_data.main_display_url ? 
                    <div className='host-regist-view6__content-section2-box1'>                                
                        <OriginalImg url={current_data.main_display_url}/>
                        {/* delete btn */}
                        <button 
                            className="host-regist-view6__content-section2-box1-delete-btn"  
                            onClick={()=>{img_delete(current_data.main_display_url, 'main')}}>
                            <img src={trash_can}/>
                        </button>
                    </div> : 
                    // add box
                    <div className='host-regist-view6__content-section2-box1'>
                        {/* add btn */}
                        <button 
                            className="host-regist-view6__content-section2-box1-btn"   
                            onClick={()=>{img_modal_toggle('host-regist-view6-img-modal', 'main')}}>
                            <img src={plus}/>
                        </button>
                    </div>} 

                    {/* 서브이미지 디스플레이 */}
                    {current_data.main_display_url || current_data.sub_display_url.some((el)=>{return el.url}) ? 
                    <div className="host-regist-view6__content-section2-box2" >
                        {current_data.sub_display_url.map((el,id)=>{
                            return (
                                el.url ?
                                <div 
                                    key={id} 
                                    className='host-regist-view6__content-section2-box2-part1'>
                                    <OriginalImg url={el.url}/>                                               
                                    {/* delete btn */}
                                    <button 
                                        className="host-regist-view6__content-section2-box2-delete-btn"  
                                        onClick={()=>{img_delete(el, 'sub', id)}}>
                                        <img src={trash_can}/>
                                    </button>
                                </div> :
                                <div 
                                    className='host-regist-view6__content-section2-box2-part1'
                                    key={id}>
                                    {/* add btn */}
                                    <button 
                                        className="host-regist-view6__content-section2-box2-btn"   
                                        onClick={()=>{img_modal_toggle(`host-regist-view6-img-modal`, `sub-${id}`)}}>
                                        <img src={plus}/>
                                    </button>
                                </div>
                            )
                        })}
                    </div> : null}
                </div>
            </div>

            {/* img modal */}
            <ImgRegistModal 
                img_modal_toggle={img_modal_toggle} 
                drop_img_state={current_data} 
                setDrop_img_state={set_img} 
                target_id={'host-regist-view6-img-modal'}/>

            {/* footer */}
            <div className="host-regist-view6__footer">
                <Host_footer 
                    fetch_handler={fetch_acc}  
                    drop_data = {current_data}
                    button_state={current_data.main_display_url && current_data.sub_display_url.every((el)=>{return el.url})} 
                    fetch_state={true}/>
            </div>
        </div>
    )
}

export default HostRegistView6