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

    // =================================================
    // redux states //
    const overay_state = useSelector(state => state.overay.open_target_id)

    // =================================================
    // states //
    const [host_location, setHost_location] = useState(false)
    const [log_state, setLog_state] = useState(false)
    const [log_modal_state, setLog_modal_state] = useState(false)
    const [host_index, setHost_index] = useState(null)

    // =================================================
    // props //
    const {data, preview, scroll, login_user} = props

    // =================================================
    // hooks //
    // business
    const {click_btn, link_to_url} = useMenuMainBusiness(data, 
        state_store([
            {
                'host_location':host_location,
                'setHost_location':setHost_location
            },
            {
                'log_state':log_state,
                'setLog_state':setLog_state
            },
            {
                'log_modal_state':log_modal_state,
                'setLog_modal_state':setLog_modal_state
            },
            {
                'host_index':host_index,
                'setHost_index':setHost_index
            }
        ]),undefined,
        {
            'login_user' : login_user
        }
    )

    // style
    const {} =  useMenuMainStyle()





    return(
        <div className={`main-menu-wrapper ${overay_state ==='search-toggle' ? 'main-menu__active' : ''}`}>
            <div className="main-menu-container">
                <Link to={default_data.Logo.url} className="main-menu-logo">{default_data.Logo.name}</Link>

                <div className={`main-menu-host ${host_location ? 'hostmenu-active' : ''}`}>
                    {default_data.host_menus.map((ele,id)=>{
                        return(
                            <div key={id} className={`${host_index === id ? 'current-host' : ''}`} onClick={()=>{link_to_url(ele.url)}}>{ele.name}</div>
                        )
                    })}
                </div>

                <div className="main-menu-right">
                    {default_data.Main_menus.map((ele,id)=>{
                        return(
                            <div onClick={()=>{click_btn(ele.url, id)}} key={id} className='main-menu-list'>
                                <img className="main-menu-log-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAANUlEQVR4nO3VsQkAMAwDwd9/rGiwZIIUAYs0f6DaIBAGSQUBdjn5dXg1GpOunJM0Jn4nSTw4Ff6YkoE1i0QAAAAASUVORK5CYII="></img>
                                {ele.name === '회원가입/로그인' ? (login_user ? `${login_user.userId}`:ele.name) : ele.name}</div>
                        )
                    })}
                    <LogModal log_m_state = {log_modal_state}></LogModal>
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
