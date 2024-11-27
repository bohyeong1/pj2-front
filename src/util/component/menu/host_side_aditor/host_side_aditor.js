import default_data from "@/util/default_data/default_data"
import useMenuHostSideAditorStyle from "../hook-store/style-hooks/menu_host_side_aditor_style"
import './host_side_aditor.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import useMenuHostSideAditorBusiness from "../hook-store/business-hooks/menu_host_side_aditor_business"
import { useRef } from "react"
import { reference_store } from '@/util/function/util_function'
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";
import { useContext } from "react"

function HostSideAditor(){
    // =================================================
    // context states //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // refs //
    const text_area_ref = useRef(null)

    // =================================================
    // hooks //
    // business
    const {click_box} = useMenuHostSideAditorBusiness()
    // style
    const {render_box_output} = useMenuHostSideAditorStyle(
        undefined, undefined, 
        reference_store([
            {text_area_ref}
        ])
    )

    return(
        <div className="host-side-aditor__container common-scroll-bar">
            <div className="host-side-aditor__wrapper">
                {default_data.host_side_aditor_menus.map((el, id) => {
                    return (
                        <div 
                            className="host-side-aditor__sellect-box small-button not-user-sellect" 
                            key={id}
                            onClick={()=>{click_box(el.url)}}>
                            <span className="host-side-aditor__sellect-box-title">{el.name}</span>
                            {host_acc && render_box_output(el.name, host_acc)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HostSideAditor