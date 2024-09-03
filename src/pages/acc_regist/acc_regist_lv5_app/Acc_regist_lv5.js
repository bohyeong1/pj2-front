import React,{useEffect, useState, useRef} from "react";
import './Acc_regist_lv5.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import DaumPostcodeEmbed from "react-daum-postcode";
import Kakaomap from "../../../utilComponent/material/kakaomap/Kakaomap";
import default_data from "../../../utilData/defaultData";
import '../../../manage_scss_style/commonness/commonness.scss'
import session_storage from "../../../sessionStorage/session_storage";
import Loading from "../../../utilComponent/material/loading/loading";
import useAccRegistLv5Business from "../hook_store/business_hooks/acc_regist_lv5_business";
import { state_store, reference_store } from "../../../utilData/UtilFunction";

function AccRegistLv5({login_user, this_step}){

    // =================================================
    // refs //
    const adress_ref = useRef()
    const sub_adress_ref = useRef()

    // =================================================
    // accomodation information //
    const accomodation = session_storage.load('house')

    // =================================================
    // this level's accomodation field name //
    const field_name = default_data.regist_field[this_step]

    // =================================================
    // states //
    const [current_data, setCurrent_data] = useState(accomodation[field_name] ? accomodation[field_name] : null)
    const [prev_data, setPrev_data] = useState(accomodation[field_name] ? accomodation[field_name] : null)
    const [fetch_state, setFetch_state] = useState(null)
    const [loading, setLoading] = useState(null)

    const [popup_state, set_popup_state] = useState(false)
    const [initial_adress, setInitial_adress] = useState(null)
    const [sub_coorinate, setSub_coorinate] = useState([]) //상세주소 위도 경도
    const [sub_adress, SetSub_adress] = useState() //상세 주소
    const [main_adress, setMain_adress] = useState(default_data.d_main_adress) //기본주소
    const [filter_adress, setFilter_adress] = useState() //검색창에 주소 검색어 넣는곳 

    // =================================================
    // hooks //
    // business
    const {register, errors, isValid, fetch_acc, debounce, set_sub_adress, 
           set_main_adress, set_sub_coordinate, click_main_adress, inputData} =  useAccRegistLv5Business(undefined,
        state_store([
            {'current_data' : current_data, 'setCurrent_data' : setCurrent_data}, {'prev_data' : prev_data, 'setPrev_data' : setPrev_data},
            {'fetch_state' : fetch_state, 'setFetch_state' : setFetch_state}, {'loading' : loading, 'setLoading' : setLoading},
            {'popup_state' : popup_state, 'set_popup_state' : set_popup_state}, {'initial_adress' : initial_adress, 'setInitial_adress' : setInitial_adress},
            {'sub_coorinate' : sub_coorinate, 'setSub_coorinate' : setSub_coorinate}, {'sub_adress' : sub_adress, 'SetSub_adress' : SetSub_adress},
            {'main_adress' : main_adress, 'setMain_adress' : setMain_adress}, {'filter_adress' : filter_adress, 'setFilter_adress' : setFilter_adress}
        ]),
        reference_store([
            {'adress_ref' : adress_ref},{'sub_adress_ref' : sub_adress_ref}
        ])
    ) 

    return(
        loading === false ? <Loading></Loading> :
        <div className="Acc-regist-lv5__container" onClick={(e)=>{
            if(!e.target.classList.contains('popup')){
                set_popup_state(false)
            }
        }}>
            <Main_menu login_user={login_user}></Main_menu>
            <div className="Acc-regist-lv5__content">
                <div className="Acc-regist-lv5__content-title">
                    <span>숙소 위치를 입력해 주세요!</span>
                </div>
                <div className="Acc-regist-lv5__content-section1">
                    {/* input */}
                    <form className="Acc-regist-lv5__content-section1-box2">
                        <div>
                            <div className="Acc-regist-lv5__content-section1-box2-input-wrapper">
                                <div className="Acc-regist-lv5__section-wrapper">
                                    <span>지번 주소</span>
                                    <div className="Acc-regist-lv5__section-box">
                                        <div></div>
                                    </div>
                                </div>
                                <input className="ac_reg_lv5-content-section1-box2-input input-default" ref={adress_ref} readOnly={true} type="text" placeholder="도로명 / 지번" 
                                onClick={click_main_adress}
                                autoComplete="off">                                
                                </input>
                            </div>                        
                            <div className="Acc-regist-lv5__content-section1-box2-input-wrapper">
                                <div className="Acc-regist-lv5__section-wrapper">
                                    <span>상세 주소</span>
                                    <div className="Acc-regist-lv5__section-box">
                                        <div></div>
                                    </div>
                                </div>
                                <input className="ac_reg_lv5-content-section1-box2-input input-default" type="text" placeholder="상세주소" ref={sub_adress_ref} 
                                onChange={debounce(set_sub_adress,1000)}
                                {...register('detail_adress')}
                                autoComplete="off">                                
                                </input>
                            </div>
                        </div>
                        {initial_adress ? <div className="Acc-regist-lv5__content-section1-box1">
                            <span>상세 주소와 상세 지도 위치는 예약이 확정된 이후에 공개 됩니다.</span>
                        </div> : null}
                    </form>

                    {/* 지도 */}
                    <div className="Acc-regist-lv5__content-section1-box3">
                        <div className="Acc-regist-lv5__content-section1-box3-wrapper">
                            <div className="Acc-regist-lv5__content-section1-box3-text2">
                                <span>구체적인 위치를 클릭해주세요</span>
                            </div>
                        </div>
                        <div className="Acc-regist-lv5__content-section1-box3-map">
                            <Kakaomap adress_data={initial_adress} set_main_adress={set_main_adress}
                            set_sub_coordinate={set_sub_coordinate} sub_ad_date={sub_adress} event={true} scroll={false}></Kakaomap>
                        </div>
                    </div>
                </div>

                {/* adress modal */}
                {popup_state ? <div className="Acc-regist-lv5__popup-wrapper">
                    <div className="Acc-regist-lv5__popup-header modal-header">
                        <button className="Acc-regist-lv5__closebtn close-button">
                            <img className="Acc-regist-lv5__closebtn-img" src={default_data.d_imgs.close}></img>
                        </button>
                        <div>
                            <span>주소</span>
                        </div>
                        <div className="Acc-regist-lv5__gurabox1 gura-box"></div>
                    </div>
                    <DaumPostcodeEmbed submitMode={false} onComplete={inputData} set_sub_coorFn={set_sub_coordinate} 
                    className="Acc-regist-lv5__popup" autoClose={true}></DaumPostcodeEmbed>
                </div> : null}                
            </div>

            <div className="Acc-regist-lv5__footer">
                <Host_footer fetch_handler={fetch_acc} drop_data={current_data} 
                button_state={isValid && main_adress.name.length !== 0 && main_adress.coor.length === 2} fetch_state={true}></Host_footer>
            </div>
        </div>
    )
}

export default AccRegistLv5