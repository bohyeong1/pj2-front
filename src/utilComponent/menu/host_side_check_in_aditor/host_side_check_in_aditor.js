import default_data from "@/util/default_data/default_data"
import './host_side_check_in_aditor.scss'
import UseMenuHostSideCheckInAditorStyle from "../hook-store/style-hooks/menu_host_side_check_in_aditor_style"
import '../../../manage_scss_style/commonness/commonness.scss'
import useMenuHostSideCheckInAditorBusiness from "../hook-store/business-hooks/menu_host_side_check_in_aditor_business"
import { useRef, useState } from "react"
import { reference_store, state_store } from '@/util/function/util_function'
import { AccDataContext } from "@/context/acc_data_context/config/acc_data_context"
import { useContext } from "react"

function HostSideCheckInAditor(){
    
    // =================================================
    // context states //
    const {acc_data, setAcc_data} = useContext(AccDataContext)

    // =================================================
    // refs //
    const text_area1_ref = useRef(null)
    const text_area2_ref = useRef(null)

    // =================================================
    // hooks //
    const {click_box} = useMenuHostSideCheckInAditorBusiness()
    // style
    const {render_box_output} = UseMenuHostSideCheckInAditorStyle(undefined, undefined, 
                                    reference_store([
                                        {
                                            'text_area1_ref' : text_area1_ref
                                        },
                                        {
                                            'text_area2_ref' : text_area2_ref
                                        }
                                    ])
                                )

    return (
        <div className="host-side-check-in-aditor__container common-scroll-bar">
            <div className="host-side-check-in-aditor__wrapper">
                {default_data.host_side_check_in_menus.map((el, id) => {
                    return (
                        <div className="host-side-check-in-aditor__sellect-box small-button not-user-sellect" key={id}
                        onClick={() => {click_box(el.url)}}>
                            <span className="host-side-check-in-aditor__sellect-box-title">{el.name}</span>
                            {acc_data && render_box_output(el, acc_data)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HostSideCheckInAditor