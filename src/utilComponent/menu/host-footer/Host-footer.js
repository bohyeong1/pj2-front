import React, {useState} from "react";
import './host_footer.scss'
import { useLocation} from "react-router-dom";
import LinkBtn from "../../Button/link_btn/link_btn";
import default_data from "../../../utilData/defaultData";
import useMenuHostfooterBusiness from "../hook-store/business-hooks/menu_hostfooter_business";
import { state_store } from "../../../utilData/UtilFunction";

function Host_footer({fetch_handler, drop_data, button_state}){
    
    // =================================================
    // location //
    const location = useLocation()

    // =================================================
    // states //
    const [prev_url, setPrev_url] = useState(null)
    const [next_url, setNext_url] = useState(null)

    // =================================================
    // const //
    const regist_step = default_data.regist_step
    const this_url = location.pathname.split('/')
    const this_step = regist_step.indexOf(this_url[this_url.length-1])
    const percent = ((this_step +1)/ regist_step.length).toFixed(2)

    // =================================================
    // hooks //
    // business
    const {} = useMenuHostfooterBusiness({
        'regist_step' : regist_step,
        'this_step' : this_step        
        },
        state_store([
            {
                'prev_url' : prev_url,
                'setPrev_url' : setPrev_url
            },
            {
                'next_url' : next_url,
                'setNext_url' : setNext_url
            }
        ])
    )




    return(
        <div className="host-footer__container">
            <div className="host-footer__container-section1">
                <div className="host-footer__container-section1-bar" style={{width : `${100 * percent}%`}}></div>
            </div>
            <div className="host-footer__container-section2">
                <LinkBtn text='이전' url={prev_url} button_state={button_state}></LinkBtn>
                <LinkBtn text='다음' url={next_url} fetch_handler = {fetch_handler} drop_data={drop_data} index = {this_step} button_state={button_state}></LinkBtn>
            </div>

        </div>
    )

}
export default Host_footer