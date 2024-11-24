import { useNavigate ,useLocation} from "react-router-dom";
import './log_modal.scss'

function LogModal({log_m_state}){
    const navigate = useNavigate()
    const location = useLocation()

    function logout(){
        localStorage.removeItem('userData')
        sessionStorage.removeItem('userData')

        if(location.pathname ==='/'){
            window.location.reload()
        }else{
            navigate('/')
        }
    }

    return(
        <div className={`log-modal__container ${log_m_state ? 'lm_active' : null}`}>
            <div className="log-modal__container-box1">
                <div 
                    className="log-modal__container-box1-button1" 
                    id="log_btn" 
                    onClick={()=>{navigate('/user/profile/manage')}}>계정 관리</div>      
                <div 
                    id="log_btn"
                    onClick={()=>{navigate('/user/profile/main')}}>프로필</div>          
            </div>
            <div className="log-modal__container-box2">
                <div 
                    className="log-modal__container-box2-button1" 
                    id="log_btn" 
                    onClick={()=>{navigate('/user/reservation/pending-list')}}>예약 내역</div>
                <div 
                    className="log-modal__container-box2-button2" 
                    id="log_btn"
                    onClick={()=>{navigate('/user/reservation/wish-list')}}>위시리스트</div>
                <div 
                    className="log-modal__container-box2-button3" 
                    id="log_btn" 
                    onClick={()=>{navigate('/host/manage/main')}}>호스팅</div>
            </div>
            <div className="log-modal__container-box3">
                <div 
                    className="log-modal__container-box3-button2" 
                    id="log_btn" 
                    onClick={logout}>로그아웃</div>
            </div>
        </div>
    )
}

export default LogModal