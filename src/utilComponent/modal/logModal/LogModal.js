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
        <div className={`logModal-container ${log_m_state ? 'lm_active' : null}`}>
            <div className="logmodal-con-box1">
                <div className="logmodal-con-b1-t1" id="log_btn" onClick={()=>{navigate('/user/profile/manage')}}>계정 관리</div>      
                <div>프로필</div>          
            </div>
            <div className="logmodal-con-box2">
                <div className="logmodal-con-b2-t1" id="log_btn" onClick={()=>{navigate('/user/reservation/pending-list')}}>예약 내역</div>
                <div className="logmodal-con-b2-t2" id="log_btn">위시리스트</div>
                <div className="logmodal-con-b2-t3" id="log_btn" onClick={()=>{navigate('/host/manage/main')}}>호스팅</div>
            </div>
            <div className="logmodal-con-box3">
                <div className="logmodal-con-b3-t2" id="log_btn" onClick={logout}>로그아웃</div>
            </div>
        </div>
    )
}

export default LogModal