import React, { useState, forwardRef} from "react";
import './main_menu.scss'
import { Link } from "react-router-dom";
import LogModal from "../../modal/logModal/LogModal";
import SearchMenu from "../search-menu/search_menu";
import { useSelector } from "react-redux";
import default_data from "@/util/default_data/default_data";
import { state_store } from "@/util/function/util_function";
import useMenuMainBusiness from "../hook-store/business-hooks/menu_main_business";
import useMenuMainStyle from "../hook-store/style-hooks/menu_main_style";
import menu_icon from '@/assets/icon/menu-icon.png'

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
    const {data, search, scroll, login_user, border = true} = props

    // =================================================
    // hooks //
    // business
    const {click_btn, link_to_url} = useMenuMainBusiness(undefined, 
        state_store([
            {host_location, setHost_location},
            {log_state, setLog_state},
            {log_modal_state, setLog_modal_state},
            {host_index, setHost_index}
        ]),
        undefined,
        {
            login_user
        }
    )

    // style
    const {} =  useMenuMainStyle()

    return(
        <div className={`main-menu__wrapper ${border ? 'main-menu__border-on' : ''}`}>
            <div className="main-menu__container">
                {/* logo */}
                <Link 
                    to={default_data.Logo.url} 
                    className="main-menu__logo">
                        {default_data.Logo.name}
                </Link>

                {/* host menu */}
                {host_location &&
                <div className={`main-menu__host`}>
                    {default_data.host_menus.map((el,id)=>{
                        return(
                            <div 
                                key={id} 
                                className={`${host_index === id ? 'current-host' : ''}`} 
                                onClick={()=>{link_to_url(el.url)}}>
                                    <span>{el.name}</span>
                            </div>
                        )
                    })}
                </div>}

                {/* search menu */}
                {search &&
                <div className="main-menu__search-container">
                    <div 
                        className={`main-menu__search`} 
                        ref={ref}>
                        <SearchMenu 
                            data = {data} 
                            related_preview = {true}
                            preview_form = {true}/>
                    </div>
                </div>}

                {/* default menu */}
                <div className="main-menu__right">
                    <div 
                        onClick={()=>{click_btn('/Login')}}
                        className='main-menu__list'>
                        <img 
                            className="main-menu__log-img" 
                            src={menu_icon}/>
                        <span>{login_user ? `${login_user.userId}` : '회원가입/로그인'}</span> 
                    </div>
                    <LogModal log_m_state = {log_modal_state}/>
                </div>            
            </div>
       </div>
    )
})

export default Main_menu
