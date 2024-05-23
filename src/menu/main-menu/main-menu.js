import React, {useEffect, useState} from "react";
import './main-menu.css'
import { Link } from "react-router-dom";

const Logo = 
    {name:'보형짱 닷컴',
    url:'/',
    img:''}

const Main_menus = [    
    {name:'이벤트'},
    {name:'고객센터'},
    {name:'회원가입/로그인',
    url:'./Login'}
]

function Main_menu(){    

    const [logState, setLogState] = useState(false)
    const [userName, setUserName] = useState()



    const logData = localStorage.getItem('log')
    const username = localStorage.getItem('userName')
    /////////////////로그인 상태 유지
    useEffect(()=>{
      if(logData && username){
        setLogState(true)
        setUserName(localStorage.getItem('userName'))
      }
  
    },[localStorage.getItem('log'), localStorage.getItem('userName')])





    return(
       <div className="main-menu-container">
            <Link to={Logo.url} className="main-menu-logo">{Logo.name}</Link>
                <div className="main-menu-right">
                    {Main_menus.map((ele,id)=>{
                    return(
                        <Link to={ele.url} key={id} className='main-menu-list'>{ele.name === '회원가입/로그인' ? (logState ? `${userName}님`:ele.name) : ele.name}</Link>
                    )
                    })}
                </div>
            
       </div>
    )
}

export default Main_menu
