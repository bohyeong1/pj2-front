import {useContext} from "react";
import './link_button.scss'
import useButtonLinkbtnBusiness from "../hook-store/business-hooks/button_linkbtn_business";
import useButtonLinkbtnStyle from "../hook-store/style-hooks/button_linkbtn_style";
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";

function LinkButton({text, url, fetch_handler = null, drop_data = null, index, button_state, fetch_state}){

    // =================================================
    // context state //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // hooks //
    // business
    const {click_link_btn} = useButtonLinkbtnBusiness(
        {
            host_acc, 
            setHost_acc
        }, 
        undefined, undefined,
        {
            fetch_handler,
            drop_data,
            index,
            fetch_state
        }
    )
    // style
    const {button_style} = useButtonLinkbtnStyle()
   
    return(
        <div className="link-btn__container">
            <button 
                style={{display : `${!url ? 'none' : 'block'}`}} 
                disabled={button_style(url, button_state, text, false, fetch_state)} 
                className={`link-btn ${button_style(url, button_state, text, true, fetch_state)}`} 
                onClick={()=>{click_link_btn(url)}}>
                    {text}
            </button>
        </div>
    )
}

export default LinkButton