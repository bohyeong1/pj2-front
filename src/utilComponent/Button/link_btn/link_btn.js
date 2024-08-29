import React from "react";
import './link_btn.scss'
import useButtonLinkbtnBusiness from "../hook-store/business-hooks/button_linkbtn_business";
import useButtonLinkbtnStyle from "../hook-store/style-hooks/button_linkbtn_style";

function LinkBtn({text, url, fetch_handler = null, drop_data, index, button_state, fetch_state}){
    // =================================================
    // hooks //
    // business
    const {click_link_btn} = useButtonLinkbtnBusiness(undefined, undefined, undefined,
        {
            'fetch_handler' : fetch_handler,
            'drop_data' : drop_data,
            'index' : index,
            'fetch_state' : fetch_state
        }
    )
    // style
    const {button_style} = useButtonLinkbtnStyle()
   
    return(
        <div className="link-btn__container">
            <button style={{display : `${!url ? 'none' : 'block'}`}} disabled={button_style(url, button_state, text, false, fetch_state)} 
            className={`link-btn ${button_style(url, button_state, text, true, fetch_state)}`} 
            onClick={()=>{click_link_btn(url)}}>{text}</button>
        </div>
    )
}

export default LinkBtn