import React, {useRef,useState, useEffect, useContext} from "react";
import './Acc_regist_lv6.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import { ImgContext } from "../../../context/img_context/config/img_context";
import ImgRegistModal from "../../../utilComponent/modal/img_regist_modal/img_regist_modal";
import useAccRegistLv6Business from "../hook_store/business_hooks/acc_regist_lv6_business";
import useAccRegistLv6Style from "../hook_store/style_hooks/acc_regist_lv6_style";
import { reference_store, state_store } from "../../../utilData/UtilFunction";
import default_data from "../../../utilData/defaultData";
import Loading from "../../../utilComponent/material/loading/loading";
import session_storage from "../../../sessionStorage/session_storage";
import _ from 'lodash'

function AccRegistLv6({login_user, this_step}){
    // =================================================
    // accomodation information //
    const accomodation = session_storage.load('house')

    // =================================================
    // this level's accomodation field name //
    const field_name = default_data.regist_field[this_step]

    // =================================================
    // states //
    const [prev_main_img, setPrev_main_img] = useState(accomodation && accomodation[field_name[0]] ? accomodation[field_name[0]] : null)
    const [prev_sub_img, setPrev_sub_img] = useState(accomodation && accomodation[field_name[1]] ? accomodation[field_name[1]] : null)
    const [loading, setLoading] = useState(null)

    // =================================================
    // context states //
    const {main_img_state, setMain_img_state, 
            sub_img1_state, setSub_img1_state,
            sub_img2_state, setSub_img2_state,
            sub_img3_state, setSub_img3_state,
            sub_img4_state, setSub_img4_state} = useContext(ImgContext)

    // =================================================
    // hooks //
    // business
    const {fetch_acc} = useAccRegistLv6Business(undefined,
        state_store([
            {
                'loading' : loading,
                'setLoading' : setLoading
            },
            {
                'prev_main_img' : prev_main_img,
                'setPrev_main_img' : setPrev_main_img
            },
            {
                'prev_sub_img' : prev_sub_img,
                'setPrev_sub_img' : setPrev_sub_img
            }
        ]), 
        undefined,
        {
            'login_user' : login_user
        }
    )

    // style
    const {img_modal_toggle, img_delete} = useAccRegistLv6Style({
        'main_img_state' : main_img_state,
        'setMain_img_state' : setMain_img_state
        }
    )

    return(
        loading === false ? <Loading></Loading> :
        <div className="Acc-regist-lv6__container">
            <Main_menu login_user={login_user}></Main_menu>

            <div className="Acc-regist-lv6__content">
                <div className="Acc-regist-lv6__content-title">
                    <span>숙소를 대표하는 이미지를 등록해주세요</span>                    
                    <div className="Acc-regist-lv6__content-title-section1">
                        <span>초기 등록 5장이 필요 합니다!</span>
                    </div>
                </div>

                <div className="Acc-regist-lv6__content-section2">
                    <div className="Acc-regist-lv6__content-section2-box1">
                        {main_img_state ? <img className="Acc-regist-lv6__content-section2-box1-part1" src={URL.createObjectURL(main_img_state)}>
                        </img> : null}
                        {/* add btn */}
                        {!main_img_state ? <button className="Acc-regist-lv6__content-section2-box1-btn"  onClick={()=>{img_modal_toggle('img-regist-modal')}}>
                            <img src={default_data.d_imgs.plus}></img>
                        </button> : null}
                        {/* delete btn */}
                        {main_img_state ? <button className="Acc-regist-lv6__content-section2-box1-delete-btn"  onClick={()=>{img_delete(setMain_img_state)}}>
                            <img src={default_data.d_imgs.transh_can}></img>
                        </button> : null}
                    </div>
                    {/* 서브이미지 디스플레이 */}
                    {main_img_state || sub_img1_state || sub_img2_state || sub_img3_state || sub_img4_state
                        ? 
                    <div className="Acc-regist-lv6__content-section2-box2" >
                        <div className="Acc-regist-lv6__content-section2-box2-part1">
                            {/* add btn */}
                            {!sub_img1_state ? <button className="Acc-regist-lv6__content-section2-box2-btn"   onClick={()=>{img_modal_toggle('sub-img-regist-modal1')}}>
                                <img src={default_data.d_imgs.plus}></img>
                            </button> : null}
                            {/* delete btn */}
                            {sub_img1_state ? <button className="Acc-regist-lv6__content-section2-box2-delete-btn"  onClick={()=>{img_delete(setSub_img1_state)}}>
                                <img src={default_data.d_imgs.transh_can}></img>
                            </button> : null}
                            {sub_img1_state ? <img className="Acc-regist-lv6__subimg" src={URL.createObjectURL(sub_img1_state)}>
                            </img> : null}
                        </div>
                        <div className="Acc-regist-lv6__content-section2-box2-part1">
                            {/* add btn */}
                            {!sub_img2_state ? <button className="Acc-regist-lv6__content-section2-box2-btn"   onClick={()=>{img_modal_toggle('sub-img-regist-modal2')}}>
                                <img src={default_data.d_imgs.plus}></img>
                            </button> : null}
                            {/* delete btn */}
                            {sub_img2_state ? <button className="Acc-regist-lv6__content-section2-box2-delete-btn"  onClick={()=>{img_delete(setSub_img2_state)}}>
                                <img src={default_data.d_imgs.transh_can}></img>
                            </button> : null}
                            {sub_img2_state ? <img className="Acc-regist-lv6__subimg" src={URL.createObjectURL(sub_img2_state)}>
                            </img> : null}
                        </div>
                        <div className="Acc-regist-lv6__content-section2-box2-part1">
                            {/* add btn */}
                            {!sub_img3_state ? <button className="Acc-regist-lv6__content-section2-box2-btn"   onClick={()=>{img_modal_toggle('sub-img-regist-modal3')}}>
                                <img src={default_data.d_imgs.plus}></img>
                            </button> : null}
                            {/* delete btn */}
                            {sub_img3_state ? <button className="Acc-regist-lv6__content-section2-box2-delete-btn"  onClick={()=>{img_delete(setSub_img3_state)}}>
                                <img src={default_data.d_imgs.transh_can}></img>
                            </button> : null}
                            {sub_img3_state ? <img className="Acc-regist-lv6__subimg" src={URL.createObjectURL(sub_img3_state)}>
                            </img> : null}
                        </div>
                        <div className="Acc-regist-lv6__content-section2-box2-part1">
                            {/* add btn */}
                            {!sub_img4_state ? <button className="Acc-regist-lv6__content-section2-box2-btn"   onClick={()=>{img_modal_toggle('sub-img-regist-modal4')}}>
                                <img src={default_data.d_imgs.plus}></img>
                            </button> : null}
                            {/* delete btn */}
                            {sub_img4_state ? <button className="Acc-regist-lv6__content-section2-box2-delete-btn"  onClick={()=>{img_delete(setSub_img4_state)}}>
                                <img src={default_data.d_imgs.transh_can}></img>
                            </button> : null}
                            {sub_img4_state ? <img className="Acc-regist-lv6__subimg" src={URL.createObjectURL(sub_img4_state)}>
                            </img> : null}
                        </div>
                    </div> : null}
                </div>
            </div>
            {/* main img modal */}
            <ImgRegistModal img_modal_toggle={img_modal_toggle} drop_img_state={main_img_state} 
                setDrop_img_state={setMain_img_state} target_id={'img-regist-modal'}></ImgRegistModal>
            {/* sub img modal */}
            <ImgRegistModal img_modal_toggle={img_modal_toggle} drop_img_state={sub_img1_state} 
                setDrop_img_state={setSub_img1_state} target_id={'sub-img-regist-modal1'}></ImgRegistModal>
            <ImgRegistModal img_modal_toggle={img_modal_toggle} drop_img_state={sub_img2_state} 
                setDrop_img_state={setSub_img2_state} target_id={'sub-img-regist-modal2'}></ImgRegistModal>
            <ImgRegistModal img_modal_toggle={img_modal_toggle} drop_img_state={sub_img3_state} 
                setDrop_img_state={setSub_img3_state} target_id={'sub-img-regist-modal3'}></ImgRegistModal>
            <ImgRegistModal img_modal_toggle={img_modal_toggle} drop_img_state={sub_img4_state} 
                setDrop_img_state={setSub_img4_state} target_id={'sub-img-regist-modal4'}></ImgRegistModal>
            {/* footer */}
            <div className="Acc-regist-lv6__footer">
                <Host_footer fetch_handler={fetch_acc}  drop_data = {{main_img : main_img_state, sub_img : [sub_img1_state, sub_img2_state, sub_img3_state, sub_img4_state]}}
                button_state={main_img_state && sub_img1_state && sub_img2_state && sub_img3_state && sub_img4_state} fetch_state={true}></Host_footer>
            </div>
        </div>
    )
}

export default AccRegistLv6