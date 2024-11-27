import React, {useState} from "react";
import './host_footer.scss'
import { useLocation, useParams} from "react-router-dom";
import LinkBtn from "../../Button/link_btn/link_btn";
import useMenuHostfooterBusiness from "../hook-store/business-hooks/menu_hostfooter_business";
import { state_store } from "@/util/function/util_function";
import { useGetThisStep } from "@/util/hooks/util_hook";
import default_data from "@/util/default_data/default_data";

function Host_footer({fetch_handler, drop_data, button_state, fetch_state}){

    // =================================================
    // states //
    const [prev_url, setPrev_url] = useState(null)
    const [next_url, setNext_url] = useState(null)

    // =================================================
    // const //
    const [this_step] = useState(useGetThisStep())
    const [regist_step] = useState(default_data.regist_step)
    const [percent] = useState(((this_step +1)/ regist_step.length).toFixed(2))

    // =================================================
    // hooks //
    // business
    const {} = useMenuHostfooterBusiness(
        {
            regist_step,
            this_step       
        },
        state_store([
            {prev_url, setPrev_url},
            {next_url, setNext_url}
        ])
    )

    return(
        <div className="host-footer__container">
            <div className="host-footer__container-section1">
                <div 
                    className="host-footer__container-section1-bar" 
                    style={{width : `${100 * percent}%`}}></div>
            </div>
            <div className="host-footer__container-section2">
                <LinkBtn 
                    text='이전' 
                    url={prev_url}/>
                <LinkBtn 
                    text='다음' 
                    url={next_url} 
                    fetch_handler = {fetch_handler} 
                    drop_data={drop_data} 
                    index = {this_step} 
                    button_state={button_state}
                    fetch_state = {fetch_state}/>
            </div>
        </div>
    )
}
export default Host_footer