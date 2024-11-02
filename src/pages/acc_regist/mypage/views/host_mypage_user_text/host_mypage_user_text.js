import {useContext, useState, useRef} from "react";
import './host_mypage_user_text.scss'
import default_data from "@/util/default_data/default_data";
import { UserContext } from '@/context/user_context/config/user_context';
import OriginalImg from "@/picture/original_img/original_img"
import camera_icon from '@/assets/icon/camera-icon.png'
import pencil_icon from '@/assets/icon/pencil-icon.png'
import save_icon from '@/assets/icon/save-icon.png'
import Loading from '@/utilComponent/material/loading/loading'
import useHostMypageUserTextBusiness from "../../hook_store/business_hooks/host_mypage_user_text_business";
import useHostMypageUserTextStyle from "../../hook_store/style_hooks/host_mypage_user_text_style";
import { state_store, reference_store } from "@/util/function/util_function";
import AlertModal from "@/utilComponent/modal/alert_modal/alert_modal";

function HostMypageUserText(){

    // =================================================
    // refs //
    const row_alram_ref = useRef(null) 
    const summary_alert = useRef(null) 
    const summary_input = useRef(null)
    const summary_button_wrapper = useRef(null)

    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // states //
    const [host_data, setHost_data] = useState(user_data.host_text)
    const [loading, setLoading] = useState(null)
    const [is_button, setIs_button] = useState(false)
    const [host_summary, setHost_summary] = useState(host_data.host_text)

    // =================================================
    // hooks //
    // business
    const {
        watch, 
        register, 
        errors,
        isValid
    } = useHostMypageUserTextBusiness(
        {
            user_data,
            setUser_data
        },
        state_store([
            {host_data, setHost_data},
            {loading, setLoading},
            {is_button, setIs_button}
        ]),
        reference_store([
            {row_alram_ref},
            {summary_alert},
            {summary_button_wrapper}
        ])
    )
    // style
    const {
        save_text,
        click_modify_text
    } = useHostMypageUserTextStyle(
        undefined, 
        state_store([
            {host_summary, setHost_summary}
        ]),
        reference_store([
            {summary_button_wrapper},
            {summary_input}
        ]),
        {watch}
    )

    // =================================================
    // hook form api에서 ref 설정 필요한 필드 //
    const {ref, ...rest} = register('summary')

    console.log(host_summary)

    return(
        loading === false ? <Loading part = {true}></Loading> :
        <div className="host-mypage-user-text__container">
            <div className="host-mypage-user-text__wrapper common-scroll-bar">
                <div className="host-mypage-user-text__title">
                    <span>호스팅 정보</span>
                </div>
                <div className="host-mypage-user-text__content">
                    <div className="host-mypage-user-text__content-section1">
                        <span className="host-mypage-user-text__content-sub-title">프로필</span>
                        <span>다른 게스트들이나, 숙소를 소개하는 페이지에서 보여지는 호스트의 모습입니다!</span>
                        <div className="host-mypage-user-text__content-section1-profile">
                            <div className="host-mypage-user-text__content-section1-profile-img">
                                <div className="host-mypage-user-text__content-section1-profile-img-wrapper">
                                    <OriginalImg url={user_data.profileImg}/>
                                </div>
                                <button className="host-mypage-user-text__content-section1-profile-img-button box-shadow-lv2">
                                    <img src={camera_icon}/>
                                </button>
                            </div>
                            <div className="host-mypage-user-text__content-section1-profile-text">
                                <div className="host-mypage-user-text__content-section1-profile-text-input-wrapper">
                                    <textarea  
                                        className="host-update-accomodation-view8__content-box1-text1 border-textarea common-scroll-bar" 
                                        type='text' 
                                        spellCheck={false}
                                        ref = {(el)=>{
                                            ref(el)
                                            summary_input.current = el
                                        }}
                                        {...rest}
                                        placeholder='게스트에게 자신을 소개해 주세요!'/>
                                    {/* error */}
                                    {errors.summary && <span className="input-alert-text">
                                        {errors.summary.message}
                                    </span>}   
                                </div>
                                                                         
                                <div 
                                    className="host-mypage-user-text__content-section1-profile-text-button"
                                    ref={summary_button_wrapper}>
                                    {/* modify btn */}
                                    <button
                                        onClick={()=>{click_modify_text(summary_input)}}>
                                        <img src={pencil_icon}/>
                                    </button>
                                    {/* save btn */}
                                    <button 
                                        className={`host-mypage-user-text__content-section1-profile-text-back-button ${isValid ? '' : 'save-disalbe'}`}
                                        onClick={()=>{save_text(summary_input)}}
                                        disabled={isValid ? false : true}>
                                        <img src={save_icon}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="host-mypage-user-text__content-section2">
                        <span className="host-mypage-user-text__content-sub-title">환불 정책</span>
                        <p className="host-mypage-user-text__content-section2-alert">정책의 전체 내용은 <button>도움말센터</button>에서 확인할 수 있습니다.</p>
                        <div className="host-mypage-user-text__content-section2-refund">
                            {default_data.refund_terms.map((el, id)=>{
                                return (
                                    <div 
                                        className="host-mypage-user-text__refund-box"
                                        key={id}>
                                        <span>{el.title}</span>
                                        <span>{el.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="host-mypage-user-text__content-section3">
                        <span className="host-mypage-user-text__content-sub-title">예약 정책</span>
                        <div className="host-mypage-user-text__content-section3-reservation-rule-part1">
                            <span>즉시 예약 사용</span>
                            <span>자동으로 예약을 수락하려면 즉시 예약 기능을 켜세요. 예약 요청을 직접 수락하거나 거절하려면 즉시 예약 기능을 끄세요.</span>
                        </div>
                    </div>
                    <div className="host-mypage-user-text__content-section4">
                        <span className="host-mypage-user-text__content-sub-title">메세지</span>
                        <span>게스트가 예약 신청 후 자동적으로 보내지는 메세지를 작성해 주세요.</span>
                        <div className="host-mypage-user-text__content-section4-massage">
                            <div className="host-mypage-user-text__content-section1-profile-text-button">
                                <button>
                                    <img src={pencil_icon}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            <div className="host-mypage-user-text__footer">
                <button 
                    className={`host-mypage-user-text__fetch-button ${is_button ? 'button-enable' : 'button-disable'}`}
                    disabled={is_button ? false : true}
                    // onClick={()=>{fetch_acc(check_in, check_in_method)}}
                    >
                    저장
                </button>
            </div>
        </div>
    )
}

export default HostMypageUserText