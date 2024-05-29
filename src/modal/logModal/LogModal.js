import React ,{useState}from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import './LogModal.css'

function LogModal({log_m_state}){
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location.pathname)

    function logout(){
        localStorage.removeItem('log')
        localStorage.removeItem('userName')

        if(location.pathname ==='/'){
            window.location.reload()
        }else{
            navigate('/')
        }
    }

    return(
        <div className={`logModal-container ${log_m_state ? 'lm_active' : null}`}>
            <div className="logmodal-con-box1">
                <div className="logmodal-con-b1-t1" id="log_btn" onClick={()=>{navigate('/Private_management')}}>계정관리</div>                
            </div>
            <div className="logmodal-con-box2">
                <div className="logmodal-con-b2-t1" id="log_btn" onClick={()=>{navigate('/Private_history')}}>예약 내역</div>
                <div className="logmodal-con-b2-t2" id="log_btn">위시리스트</div>
                <div className="logmodal-con-b2-t3" id="log_btn" onClick={()=>{navigate('/Acc_regist')}}>호스팅</div>
            </div>
            <div className="logmodal-con-box3">
                <div className="logmodal-con-b3-t1" id="log_btn">고객센터</div>
                <div className="logmodal-con-b3-t2" id="log_btn" onClick={logout}>로그아웃</div>
            </div>

        </div>
    )
}

export default LogModal