import React, { useState, useEffect } from "react";
import './Pri-side-menu.css'
import default_data from "../../../utilData/defaultData";
import { useLocation, useNavigate } from "react-router-dom";




function Pri_side_menu({data}){

    const [priSideState, setPriSideState] = useState(null)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        const index = data.findIndex((obj)=>{return obj.url === location.pathname})
        setPriSideState(index)
    },[location])

    console.log(priSideState)

    return(
        <div className='Pri_side_menu-container'>
            {data.map((el,id)=>{
                return(
                    <div className={`Pri_side_menus ${id === priSideState ? 'pside_active' : ''}`} onClick={()=>{navigate(el.url)}}
                    key={id} style={{borderBottom:`${data.length -1 === id ? 'none' : 'solid 1px rgb(235,235,235)'}`}}>{el.name}</div>
                )
            })}
            
        </div>
    )
}

export default Pri_side_menu