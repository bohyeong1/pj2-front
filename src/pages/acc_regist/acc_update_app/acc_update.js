import Main_menu from "../../../utilComponent/menu/main-menu/main-menu"
import Footer from "../../../utilComponent/menu/footer/Footer"
import HostSideAditor from "../../../utilComponent/menu/host_side_aditor/host_side_aditor"
import './acc_update.scss'
import default_data from "../../../utilData/defaultData"
import '../../../manage_scss_style/commonness/commonness.scss'
import useAccUpdateBusiness from "../hook_store/business_hooks/acc_update_business"
import { Suspense, lazy, useState } from "react"

function AccUpdate({login_user, acc_data}){

    // =================================================
    // states //    
    const [active_section, setActive_section] = useState(null)
    const [active_side_section, setActive_side_section] = useState('accomodation')

    // =================================================
    // hooks //
    // business
    const {click_prev_page_button} = useAccUpdateBusiness()
    console.log(acc_data)
    return (
        <div className="acc-update__container">
            <Main_menu login_user={login_user}></Main_menu>
            <div className="acc-update__content">
                <div className="acc-update__aditor-container">
                    <div className="acc-update__aditor-header">
                        <div className="acc-update__aditor-title">
                            <button onClick={click_prev_page_button}>
                                <img src={default_data.d_imgs.drop_arrow}></img>
                            </button> 
                            <span>숙소 에디터</span>
                        </div>
                        <div className="acc-update__aditor-button-container">
                            <div className="acc-update__aditor-button-part1">
                                <button className="small-button">숙소</button>
                                <button className="small-button">체크인 가이드</button>
                            </div>
                            <div className='acc-update__aditor-button-part2'>
                                <button className="small-button">
                                    <img src={default_data.d_imgs.transh_can}></img>
                                </button>                                
                            </div>
                        </div>
                    </div>
                    <HostSideAditor acc_data={acc_data}></HostSideAditor>
                </div>

            </div>
            <div className="acc-update__footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default AccUpdate