import React from "react";
import './main-menu.css'
import { Link } from "react-router-dom";

const Logo = 
    {name:'보형짱 닷컴',
    url:'/',
    img:''}

const Main_menus = [    
    {name:'이벤트'},
    {name:'고객센터'},
    {name:'회원가입/로그인'}
]

function Main_menu(){
    return(
       <div className="main-menu-container">
            <Link className="main-menu-logo">{Logo.name}</Link>
                <div className="main-menu-right">
                    {Main_menus.map((ele,id)=>{
                    return(
                        <Link key={id} className='main-menu-list'>{ele.name}</Link>
                    )
                    })}
                </div>
            
       </div>
    )
}

export default Main_menu
