import React, { useState, forwardRef} from "react";
import './main_menu.scss'
import { Link } from "react-router-dom";
import LogModal from "../../modal/logModal/LogModal";
import SearchMenu from "../search-menu/search_menu";
import default_data from "@/util/default_data/default_data";
import { state_store } from "@/util/function/util_function";
import useMenuMainBusiness from "../hook-store/business-hooks/menu_main_business";
import useMenuMainStyle from "../hook-store/style-hooks/menu_main_style";
import menu_icon from '@/assets/icon/menu-icon.png'

const Main_menu = forwardRef((props, ref) => {    

    // =================================================
    // states //
    const [host_location, setHost_location] = useState(false)
    const [log_state, setLog_state] = useState(false)
    const [log_modal_state, setLog_modal_state] = useState(false)
    const [host_index, setHost_index] = useState(null)
    const [host_modal, setHost_modal] = useState(false)

    // =================================================
    // props //
    const {data, search, host = false, login_user, border = true} = props

    // =================================================
    // hooks //
    // business
    const {
        click_btn, 
        link_to_url
    } = useMenuMainBusiness(undefined, 
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
    const {click_host_menu} = useMenuMainStyle(
        undefined, 
        state_store([
            {host_modal, setHost_modal}
        ])
    )

    return(
        <div className={`main-menu__wrapper ${border ? 'main-menu__border-on' : ''}`}>
            <div className="main-menu__container">
                {/* logo */}
                <Link 
                    to={default_data.Logo.url} 
                    className="main-menu__logo not-user-sellect">
                        {default_data.Logo.name}
                </Link>

                {/* host menu */}
                {host &&
                <div className={`main-menu__host`}>
                    {default_data.host_menus.map((el,id)=>{
                        return(
                            <div 
                                key={id} 
                                className={`main-menu__host-menu not-user-sellect ${host_index === id ? 'current-host' : ''}`} 
                                onClick={()=>{link_to_url(el.url)}}>
                                    <span>{el.name}</span>
                            </div>
                        )
                    })}
                    <div 
                        className="main-menu__host-menu not-user-sellect"
                        onClick={click_host_menu}>
                        <span>메뉴</span>

                        {/* host modal */}
                        {host_modal &&
                        <div className="main-menu__host-modal">
                            {default_data.host_modal_menus.map((el, id)=>{
                                return (
                                    <div 
                                        className="main-menu__host-modal-select not-user-sellect"
                                        onClick={()=>{link_to_url(el.url)}}
                                        key={id}>
                                        <span>{el.name}</span>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>
                </div>}

                {/* search menu */}
                {search &&
                <div className="main-menu__search-container">
                    <div 
                        className={`main-menu__search not-user-sellect`} 
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
                        className='main-menu__list not-user-sellect'>
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
