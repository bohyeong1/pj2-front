import HostSideAditor from "@/utilComponent/menu/host_side_aditor/host_side_aditor"
import HostSideCheckInAditor from "@/utilComponent/menu/host_side_check_in_aditor/host_side_check_in_aditor"
import './host_update_layout.scss'
import default_data from "@/util/default_data/default_data"
import '@/manage_scss_style/commonness/commonness.scss'
import useHostUpdateLayoutBusiness from "../hook_store/business_hooks/host_update_layout_business"
import useHostUpdateLayoutStyle from "../hook_store/style_hooks/host_update_layout_style"
import { Outlet } from "react-router-dom"

function HostUpdateLayout({option, acc_data = null}){

    // =================================================
    // hooks //
    // business
    const {click_prev_page_button, click_side_accomodation, click_side_check_in} = useHostUpdateLayoutBusiness()    
    // style
    const {optional_side_menu_render} = useHostUpdateLayoutStyle(undefined, undefined, undefined,
        {
            'acc_data' : acc_data
        })

    return (
        <div className="host-update-layout">
            <div className="host-update-layout__aditor-container">
                <div className="host-update-layout__aditor-header">
                    <div className="host-update-layout__aditor-title">
                        <button onClick={click_prev_page_button}>
                            <img src={default_data.d_imgs.drop_arrow}></img>
                        </button> 
                        <span>숙소 수정</span>
                    </div>
                    <div className="host-update-layout__aditor-button-container">
                        <div className="host-update-layout__aditor-button-part1">
                            <button className={`small-button ${option === 'accomodation' ? 'small-button-active' : null}`}
                            onClick={click_side_accomodation}>숙소</button>
                            <button className={`small-button ${option === 'check' ? 'small-button-active' : null}`}
                            onClick={click_side_check_in}>체크인 가이드</button>
                        </div>
                        <div className='host-update-layout__aditor-button-part2'>
                            <button className="small-button">
                                <img src={default_data.d_imgs.transh_can}></img>
                            </button>                                
                        </div>
                    </div>
                </div>
                {optional_side_menu_render(option,{render1 : HostSideAditor, render2 : HostSideCheckInAditor})}
            </div>
            <div className="host-update-layout__content">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default HostUpdateLayout