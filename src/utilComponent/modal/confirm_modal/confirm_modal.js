import { useSelector } from "react-redux"
import './confirm_modal.scss'
import close_icon from '@/assets/icon/close-icon.png'
import '@/manage_scss_style/commonness/commonness.scss'

function ConfirmModal({key_name, title = null, confirm_text = null, handle_function = null, modal_toggle, button_state = true, children}){
    // =================================================
    // redux state //
    const modal_state = useSelector(state => state.overay.open_target_id)

    return (
        modal_state === key_name &&
            <div className='confirm-modal__container'>
                {/* header */}
                <header className="confirm-modal__container-header">
                    <div className="confirm-modal__container-header-button">
                        <img 
                            src={close_icon} 
                            onClick={()=>{modal_toggle(key_name)}}
                            />
                    </div>
                    <div className="confirm-modal__container-header-title">{title}</div>
                    <div className="confirm-modal__container-header-gurabox"></div>
                </header>
                {/* main */}
                <main className='confirm-modal__main common-scroll-bar'>
                    {children}
                </main>
                {/* footer */}
                <footer className="confirm-modal__footer">
                    <button 
                        className="close-button"
                        onClick={()=>{modal_toggle(key_name)}}>
                            취소
                    </button>
                    <button 
                        className={`confirm-button ${button_state ? 'button-enable' : 'button-disable'}`}
                        disabled = {button_state ? false : true}
                        onClick={()=>{handle_function(key_name)}}>
                            {confirm_text}
                    </button>
                </footer>
            </div>
    )
}

export default ConfirmModal