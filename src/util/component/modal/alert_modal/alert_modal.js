import './alert_modal.scss'
import { useSelector } from 'react-redux'
import close_icon from '@/assets/icon/close-icon.png'
import { createPortal } from 'react-dom'

function AlertModal({key_name, title = null, modal_toggle, children, width = null}){

    // =================================================
    // redux state //
    const modal_state = useSelector(state => state.overay.open_target_id)

    return createPortal (
        modal_state === key_name &&
        <div 
            className='alert-modal__container'
            style={{width : width ? width : '568px'}}>
            {/* header */}
            <header className="alert-modal__container-header">
                <div className="alert-modal__container-header-button">
                    <img 
                        src={close_icon} 
                        onClick={()=>{modal_toggle(key_name)}}
                        />
                </div>
                <div className="alert-modal__container-header-title">{title}</div>
                <div className="alert-modal__container-header-gurabox"></div>
            </header>
            {/* main */}
            <main className='alert-modal__main common-scroll-bar'>
                {children}
            </main>
        </div>,
        document.getElementById('modal-root')
    )
}

export default AlertModal