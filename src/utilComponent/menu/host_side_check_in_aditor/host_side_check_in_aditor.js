import default_data from "../../../utilData/defaultData"
import './host_side_check_in_aditor.scss'
import UseMenuHostSideCheckInAditorStyle from "../hook-store/style-hooks/menu_host_side_check_in_aditor_style"
import '../../../manage_scss_style/commonness/commonness.scss'

function HostSideCheckInAditor({acc_data = null}){

    // =================================================
    // hooks //
    // style
    const {render_box_output} = UseMenuHostSideCheckInAditorStyle(undefined, undefined, undefined, 
        {
            'acc_data' : acc_data
        }
    )

    return (
        <div className="host-side-check-in-aditor__container common-scroll-bar">
            <div className="host-side-check-in-aditor__wrapper">
                {default_data.host_side_check_in_menus.map((el, id) => {
                    return (
                        <div className="host-side-check-in-aditor__sellect-box small-button not-user-sellect" key={id}>
                            <span className="host-side-check-in-aditor__sellect-box-title">{el.name}</span>
                            {render_box_output(el)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HostSideCheckInAditor