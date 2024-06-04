import React, {useEffect, useState} from "react";
import './main-menu.css'
import { Link ,useNavigate, useLocation} from "react-router-dom";
import LogModal from "../../modal/logModal/LogModal";

const Logo = 
    {name:'보형짱 닷컴',
    url:'/',
    img:''}

const Main_menus = [    
    {name:'회원가입/로그인',
    url:'/Login'}
]

const host_menus = [
    {name:'투데이',
        url:'/Acc_regist'
    },
    {name:'달력'},
    {name:'숙소',
        url:'/Acc_regist/Acc_manage'
    },
    {name:'호스팅 수입'}
]

function Main_menu(){    

    const navigate = useNavigate()
    const location = useLocation()

    const [hostlocation, setHostLocation] = useState(false)
    const [logState, setLogState] = useState(false)
    const [userName, setUserName] = useState()
    const [logModalState, setLogModalState] = useState(false)

    ///로그데이터
    const logData = sessionStorage.getItem('userData') || localStorage.getItem('userData')
    const logDataParse = JSON.parse(logData) || null

    // console.log(logDataParse)
    /////////////////로그인 상태 유지
    useEffect(()=>{
      if(logData){
        setLogState(true)
        setUserName(logDataParse.name)
      }

      setHostLocation(location.pathname.includes('/Acc_regist'))
  
    },[logState, userName, hostlocation])


    function clickLogbtn(url,id){
        if(logState && id === 0){
            setLogModalState(!logModalState)
        }else{
            navigate(url)
        }

    }


    return(
        <div className="main-menu-wrapper">
            <div className="main-menu-container">
                    <Link to={Logo.url} className="main-menu-logo">{Logo.name}</Link>

                    <div className={`main-menu-host ${hostlocation ? 'hostmenu-active' : ''}`}>
                        {host_menus.map((ele,id)=>{
                            return(
                                <div key={id} onClick={()=>{navigate(ele.url)}}>{ele.name}</div>
                            )
                        })}
                    </div>

                        <div className="main-menu-right">
                            {Main_menus.map((ele,id)=>{
                            return(
                                <div onClick={()=>{clickLogbtn(ele.url, id)}} key={id} className='main-menu-list'>
                                    <img className="main-menu-log-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAANUlEQVR4nO3VsQkAMAwDwd9/rGiwZIIUAYs0f6DaIBAGSQUBdjn5dXg1GpOunJM0Jn4nSTw4Ff6YkoE1i0QAAAAASUVORK5CYII="></img>
                                    {ele.name === '회원가입/로그인' ? (logState ? `${userName}님`:ele.name) : ele.name}</div>
                            )
                            })}
                            <LogModal log_m_state = {logModalState}></LogModal>
                        </div>            
            </div>
       </div>
    )
}

export default Main_menu
