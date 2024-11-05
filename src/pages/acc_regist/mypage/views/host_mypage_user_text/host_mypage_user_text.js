import {useContext, useState, useRef} from "react";
import './host_mypage_user_text.scss'
import default_data from "@/util/default_data/default_data";
import { UserContext } from '@/context/user_context/config/user_context';
import UserProfileImg from "@/utilComponent/material/user_profile_img/user_profile_img";
import Loading from '@/utilComponent/material/loading/loading'
import useHostMypageUserTextBusiness from "../../hook_store/business_hooks/host_mypage_user_text_business";
import useHostMypageUserTextStyle from "../../hook_store/style_hooks/host_mypage_user_text_style";
import { state_store, reference_store } from "@/util/function/util_function";
import _ from 'lodash'
import AlertModal from "@/utilComponent/modal/alert_modal/alert_modal";
import ConfirmModal from "@/utilComponent/modal/confirm_modal/confirm_modal";
import ImgRegistModal from "@/utilComponent/modal/img_regist_modal/img_regist_modal";
import camera_icon from '@/assets/icon/camera-icon.png'
import pencil_icon from '@/assets/icon/pencil-icon.png'
import save_icon from '@/assets/icon/save-icon.png'
import dot_icon from '@/assets/icon/dot-icon.png'
import check_icon from '@/assets/icon/check-icon.png'
import exclamation_icon from '@/assets/icon/exclamation-icon.png'
import speech_icon from '@/assets/icon/speech-icon.png'

function HostMypageUserText(){

    // =================================================
    // refs //
    const summary_input = useRef(null)
    const summary_button_wrapper = useRef(null)
    const message_input = useRef(null)
    const message_button_wrapper = useRef(null)

    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // states //
    const [host_data, setHost_data] = useState(user_data.host_text)
    const [loading, setLoading] = useState(null)
    const [is_button, setIs_button] = useState(false)
    const [host_summary, setHost_summary] = useState(host_data.host_text)
    const [reservation_rule, setReservation_rule] = useState(host_data.reservation_rule)
    const [initial_message, setInitial_message] = useState(host_data.initial_message)
    const [refund_rule, setRefund_rule] = useState(host_data.refund_rule)
    const [profile_img, setProfile_img] = useState({
        img : user_data.profileImg ? user_data.profileImg : null,
        delete_prev_img : null,
        img_file : null,
        img_display_url : user_data.profileImg ? user_data.profileImg : null
    })

    // =================================================
    // hooks //
    // business
    const {
        watch, 
        register, 
        errors,
        isValid,
        fetch_data
    } = useHostMypageUserTextBusiness(
        {
            user_data,
            setUser_data
        },
        state_store([
            {host_data, setHost_data},
            {loading, setLoading},
            {is_button, setIs_button},
            {initial_message, setInitial_message},
            {host_summary, setHost_summary},
            {reservation_rule, setReservation_rule},
            {refund_rule, setRefund_rule},
            {profile_img, setProfile_img}
        ])
    )
    // style
    const {
        save_text,
        click_modify_text,
        modal_toggle,
        click_reservation_rule,
        set_reservation_rule_false,
        click_refund_rule,
        set_img
    } = useHostMypageUserTextStyle(
        undefined, 
        state_store([
            {host_summary, setHost_summary},
            {reservation_rule, setReservation_rule},
            {refund_rule, setRefund_rule},
            {profile_img, setProfile_img}
        ]),
        reference_store([
            {summary_button_wrapper}
        ]),
        {watch}
    )

    // =================================================
    // hook form api에서 ref 설정 필요한 필드 //
    const {ref: ref1, ...rest1} = register('summary')
    const {ref: ref2, ...rest2} = register('message')

    return(
        loading === false ? <Loading part = {true}></Loading> :
        <div className="host-mypage-user-text__container">
            <div className="host-mypage-user-text__wrapper common-scroll-bar">
                <div className="host-mypage-user-text__title">
                    <span>호스팅 정보</span>
                </div>
                <div className="host-mypage-user-text__content">
                    {/* 프로필 수정 */}
                    <div className="host-mypage-user-text__content-section1">
                        <span className="host-mypage-user-text__content-sub-title">프로필</span>
                        <span>다른 게스트들이나, 숙소를 소개하는 페이지에서 보여지는 호스트의 모습입니다!</span>
                        <div className="host-mypage-user-text__content-section1-profile">
                            <div className="host-mypage-user-text__content-section1-profile-img">
                                <div className="host-mypage-user-text__content-section1-profile-img-wrapper">
                                    <UserProfileImg 
                                        url = {profile_img.img_display_url}
                                        user_data = {user_data}/>
                                </div>
                                <button 
                                    className="host-mypage-user-text__content-section1-profile-img-button box-shadow-lv2"
                                    onClick={()=>{modal_toggle('modify-profile-img')}}>
                                    <img src={camera_icon}/>
                                </button>
                            </div>
                            <div className="host-mypage-user-text__content-section1-profile-text">
                                <div className="host-mypage-user-text__content-section1-profile-text-input-wrapper">
                                    <textarea  
                                        className="common-scroll-bar" 
                                        type='text' 
                                        spellCheck={false}
                                        ref = {(el)=>{
                                            ref1(el)
                                            summary_input.current = el
                                        }}
                                        {...rest1}
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
                                        onClick={()=>{click_modify_text(summary_input, summary_button_wrapper)}}>
                                        <img src={pencil_icon}/>
                                    </button>
                                    {/* save btn */}
                                    <button 
                                        className={`host-mypage-user-text__content-section1-profile-text-back-button ${!errors.summary ? '' : 'save-disalbe'}`}
                                        onClick={()=>{save_text(summary_input, summary_button_wrapper, setHost_summary, 'summary')}}
                                        disabled={!errors.summary ? false : true}>
                                        <img src={save_icon}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 환불 정책 */}
                    <div className="host-mypage-user-text__content-section2">
                        <span className="host-mypage-user-text__content-sub-title">환불 정책</span>
                        <p className="host-mypage-user-text__content-section2-alert">정책의 전체 내용은 <button onClick={()=>{modal_toggle('refund-alert')}}>도움말센터</button>에서 확인할 수 있습니다.</p>
                        <div className="host-mypage-user-text__content-section2-refund">
                            {default_data.refund_terms.map((el, id)=>{
                                return (
                                    <div 
                                        className={`host-mypage-user-text__refund-box ${_.isEqual(refund_rule, el) ? 'host-mypage-user-text__refund-box-active' : ''}`}
                                        key={id}
                                        onClick={()=>{click_refund_rule(el)}}>
                                        <span>{el.title}</span>
                                        <span>{el.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 예약 정책 */}
                    <div className="host-mypage-user-text__content-section3">
                        <span className="host-mypage-user-text__content-sub-title">예약 정책</span>
                        <div className="host-mypage-user-text__content-section3-reservation-rule-part1">
                            <span>즉시 예약 사용</span>
                            <span>자동으로 예약을 수락하려면 즉시 예약 기능을 켜세요. 예약 요청을 직접 수락하거나 거절하려면 즉시 예약 기능을 끄세요.</span>
                            {/* button */}
                            <button 
                                className={`host-mypage-user-text__content-section3-reservation-rule-button ${reservation_rule ? 'reservation-rule-active' : ''}`}
                                onClick={()=>{click_reservation_rule('auto-reservation')}}>
                                <div className={`${reservation_rule ? 'right' : 'left'}`}>
                                    <img 
                                        className={`${reservation_rule ? 'right' : 'left'}`}
                                        src={check_icon}/>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* 메세지 */}
                    <div className="host-mypage-user-text__content-section4">
                        <span className="host-mypage-user-text__content-sub-title">메세지</span>
                        <span>게스트가 예약 신청 후 자동적으로 보내지는 메세지를 작성해 주세요.</span>
                        <div className="host-mypage-user-text__content-section4-message">
                            <div className="host-mypage-user-text__content-section4-message-input-wrapper">
                                <textarea  
                                    className="common-scroll-bar" 
                                    type='text' 
                                    spellCheck={false}
                                    ref = {(el)=>{
                                        ref2(el)
                                        message_input.current = el
                                    }}
                                    {...rest2}
                                    placeholder='예약 신청 시 게스트에게 처음 보내지는 메세지를 작성해 주세요!'/>
                                {/* error */}
                                {errors.message && <span className="input-alert-text">
                                    {errors.message.message}
                                </span>}   
                            </div>
                            <div 
                                className="host-mypage-user-text__content-section4-message-button"
                                ref={message_button_wrapper}>
                                {/* modify btn */}
                                <button
                                    onClick={()=>{click_modify_text(message_input, message_button_wrapper)}}>
                                    <img src={pencil_icon}/>
                                </button>
                                {/* save btn */}
                                <button 
                                    className={`host-mypage-user-text__content-section4-message-back-button ${!errors.message ? '' : 'save-disalbe'}`}
                                    onClick={()=>{save_text(message_input, message_button_wrapper, setInitial_message, 'message')}}
                                    disabled={!errors.message ? false : true}>
                                    <img src={save_icon}/>
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
                    onClick={fetch_data}
                    >
                    저장
                </button>
            </div>

            {/* modal */}
            {/* 환불정책 도움말 */}
            <AlertModal
                key_name = {'refund-alert'}
                title = {'도움말 센터'}
                modal_toggle = {modal_toggle}>
                <div className="host-mypage-user-text__refund-modal-container">
                    <span className="host-mypage-user-text__refund-modal-title">숙소 환불 정책</span>
                    <p>
                        때로 불가피한 상황으로 인해 게스트가 예약을 취소해야 하는 경우가 생깁니다. 원활한 호스팅을 위해, 환불 정책을 선택하실 수 있습니다. 
                        숙박 기간에 따라 별도의 환불 정책을 설정하고 싶다면, 숙소 환불 정책을 설정하는 방법을 확인해 보세요.
                        <br/><br/>환불 정책을 선택할 때는 해당 정책이 법규에 부합하는지 확인하셔야 합니다.
                    </p>
                    <div className="host-mypage-user-text__refund-modal-content">
                        {default_data.refund_terms.map((el, id)=>{
                            return (
                                <div
                                    className="host-mypage-user-text__modal-option-wrapper"
                                    key={id}>
                                    <div className="host-mypage-user-text__modal-option-title">
                                        <img src={dot_icon}/>
                                        <span>{el.title}</span>
                                    </div>
                                    {el.content.map((ele, id)=>{
                                        return (
                                            <p 
                                                key={id}
                                                className="host-mypage-user-text__modal-option-content">
                                                <span>{id + 1}.</span>
                                                <span> {ele}</span>
                                            </p>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </AlertModal>

            {/* 자동 예약 확인 모달 */}
            <ConfirmModal
                key_name = {'auto-reservation'}
                confirm_text = {'즉시 예약 사용 중지'}
                handle_function = {set_reservation_rule_false}
                modal_toggle = {modal_toggle}>
                <div className="host-mypage-user-text__auto-reservation-modal-container">
                    <span className="host-mypage-user-text__auto-reservation-modal-title">즉시 예약 기능을 끄시겠어요?</span>
                    <span>이 경우, 다음 사항을 유의해 주시기 바랍니다.</span>
                    <div className="host-mypage-user-text__auto-reservation-modal-content">
                        <div className="host-mypage-user-text__auto-reservation-modal-option">
                            <img src={exclamation_icon}/>
                            <div>
                                <span>예약률이 감소할 수 있습니다</span>
                                <span>즉시 예약이 가능한 숙소는 검색 결과 상위에 표시되며, 더 많은 게스트의 관심을 끌 수 있습니다.</span>
                            </div>                            
                        </div>
                        <div className="host-mypage-user-text__auto-reservation-modal-option">
                            <img src={speech_icon}/>
                            <div>
                                <span>모든 예약 요청을 검토하셔야 합니다</span>
                                <span>즉시 예약 기능을 끄면 예약이 자동으로 수락되지 않습니다.</span>
                            </div>                            
                        </div>
                    </div>
                </div>
            </ConfirmModal>
            
            {/* 프로필 이미지 등록 모달 */}
            <ImgRegistModal
                img_modal_toggle={modal_toggle} 
                drop_img_state={profile_img} 
                setDrop_img_state={set_img} 
                target_id={'modify-profile-img'}/>
        </div>
    )
}

export default HostMypageUserText