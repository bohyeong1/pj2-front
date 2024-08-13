import React, { useState, forwardRef} from "react";
import './main-menu.css'
import { Link } from "react-router-dom";
import LogModal from "../../modal/logModal/LogModal";
import Search from "../search-menu/search/Search";
import { useSelector } from "react-redux";
import default_data from "../../../utilData/defaultData";

import { state_store, reference_store } from "../../../utilData/UtilFunction";
import useMenuMainBusiness from "../hook-store/business-hooks/menu-main-business";
import useMenuMainStyle from "../hook-store/style-hooks/menu-main-style";

const Main_menu = forwardRef((props, ref) => {    

    // redux state 
    const overay_state = useSelector(state => state.overay.open_target_id)

    // state
    const [hostlocation, setHostLocation] = useState(false)
    const [logState, setLogState] = useState(false)
    const [userName, setUserName] = useState()
    const [logModalState, setLogModalState] = useState(false)
    const [hostIndex, setHostIndex] = useState(null)

    // props
    const {data, preview, scroll} = props

    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // business
    const {clickLogbtn, link_to_url} = useMenuMainBusiness(data, 
        state_store([
            {
                'hostlocation':hostlocation,
                'setHostLocation':setHostLocation
            },
            {
                'logState':logState,
                'setLogState':setLogState
            },
            {
                'userName':userName,
                'setUserName':setUserName
            },
            {
                'logModalState':logModalState,
                'setLogModalState':setLogModalState
            },
            {
                'hostIndex':hostIndex,
                'setHostIndex':setHostIndex
            }
        ]))

    // style
    const {} =  useMenuMainStyle()





    return(
        <div className={`main-menu-wrapper ${overay_state ==='search-toggle' ? 'main-menu__active' : ''}`}>
            <div className="main-menu-container">
                <Link to={default_data.Logo.url} className="main-menu-logo">{default_data.Logo.name}</Link>

                <div className={`main-menu-host ${hostlocation ? 'hostmenu-active' : ''}`}>
                    {default_data.host_menus.map((ele,id)=>{
                        return(
                            <div key={id} className={`${hostIndex === id ? 'current-host' : ''}`} onClick={()=>{link_to_url(ele.url)}}>{ele.name}</div>
                        )
                    })}
                </div>

                <div className="main-menu-right">
                    {default_data.Main_menus.map((ele,id)=>{
                        return(
                            <div onClick={()=>{clickLogbtn(ele.url, id)}} key={id} className='main-menu-list'>
                                <img className="main-menu-log-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAANUlEQVR4nO3VsQkAMAwDwd9/rGiwZIIUAYs0f6DaIBAGSQUBdjn5dXg1GpOunJM0Jn4nSTw4Ff6YkoE1i0QAAAAASUVORK5CYII="></img>
                                {ele.name === '회원가입/로그인' ? (logState ? `${userName}님`:ele.name) : ele.name}</div>
                        )
                    })}
                    <LogModal log_m_state = {logModalState}></LogModal>
                </div>            
            </div>
            <div className="main-menu__search-container" style={{display:`${preview ? 'block' : 'none'}`}}>
                <div className="main-menu__search-preview-wrapper">
                    <div className={`main-menu__search-preview ${scroll ? 'main-menu_preview-active' : ''}`} ref={ref}>
                        <Search data={data} preview={preview ? preview : null}></Search>
                    </div>
                </div>
            </div>

       </div>
    )
})

export default Main_menu
