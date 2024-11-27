import { useSelector } from "react-redux"
import './form_modal.scss'
import close_icon from '@/assets/icon/close-icon.png'
import '@/manage_scss_style/commonness/commonness.scss'
import useModalFormModalBusiness from "../hook-store/business-hooks/modal_form_modal_business"
import { useState } from "react"
import { state_store } from "@/util/function/util_function";
import PartLoading from "../../material/part_loading/part_loding"

function FormModal({key_name, title = null, form_text = null, handle_function = null, modal_toggle}){
    // =================================================
    // redux state //
    const modal_state = useSelector(state => state.overay.open_target_id)

    // =================================================
    // states //
    const [fetch_state, setFetch_state] = useState(false)

    // =================================================
    // hooks //
    // business
    const {
        register,
        errors,
        isValid,
        error,
        isLoading, 
        isError,
        auth_fetch
    } = useModalFormModalBusiness(
        {
            modal_state
        },
        state_store([
            {fetch_state, setFetch_state}
        ]),
        undefined,
        {
            handle_function
        }
    )

    if(isError && error.ui_action !== 'retry'){
        // redirection 
        console.log('redirection error page')
    }

    return (
        modal_state === key_name &&
        <div className='form-modal__container'>
            {isLoading && <PartLoading/>}
            <div className="form-modal__contents">
                {/* header */}
                <header className="form-modal__container-header">
                    <div className="form-modal__container-header-button">
                        <img 
                            src={close_icon} 
                            onClick={()=>{modal_toggle(key_name)}}/>
                    </div>
                    <div className="form-modal__container-header-title">{title}</div>
                    <div className="form-modal__container-header-gurabox"></div>
                </header>
                {/* main */}
                <main className='form-modal__main common-scroll-bar'>
                    <div className='form-modal__auth-modal-container'>
                        <div className="form-modal__input">
                            <div className="form-modal__text">
                                <span>비밀번호</span>
                                <div className="form-modal__box">
                                    <div></div>
                                </div>
                            </div>
                            <input 
                                type="password"
                                placeholder={'인증을 진행해 주세요'}
                                {...register('password')}/>
                            {errors.password && <span className='input-alert-text'>{errors.password.message}</span>}
                        </div>
                        <div className="form-modal__input">
                            <div className="form-modal__text">
                                <span>비밀번호 확인</span>
                                <div className="form-modal__box">
                                    <div></div>
                                </div>
                            </div>
                            <input 
                                type="password"
                                placeholder={'인증을 진행해 주세요'}
                                {...register('password_confirm')}/>
                            {errors.password_confirm && <span className='input-alert-text'>{errors.password_confirm.message}</span>}
                        </div>
                    </div>
                    {error && error.ui_action === 'retry' && <span className='input-alert-text'>{error.message}</span>}
                </main>
                {/* footer */}
                <footer className="form-modal__footer">
                    <button 
                        className="close-button"
                        onClick={()=>{modal_toggle(key_name)}}>
                            취소
                    </button>
                    <button 
                        className={`form-button ${isValid ? 'button-enable' : 'button-disable'}`}
                        disabled = {isValid ? false : true}
                        onClick={auth_fetch}>
                            {form_text}
                    </button>
                </footer>
            </div>  
        </div>
    )
}

export default FormModal