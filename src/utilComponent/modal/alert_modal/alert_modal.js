import './alert_modal.scss'

function AlertModal({children}){
    return (
        <div className='alert-modal__container'>
            {children}
        </div>
    )
}

export default AlertModal