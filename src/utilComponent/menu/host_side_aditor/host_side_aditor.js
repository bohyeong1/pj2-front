import default_data from "../../../utilData/defaultData"
import useMenuHostSideAditorStyle from "../hook-store/style-hooks/menu_host_side_aditor_style"
import './host_side_aditor.scss'
import '../../../manage_scss_style/commonness/commonness.scss'

function HostSideAditor({acc_data = null}){
    // =================================================
    // hooks //
    // style
    const {render_box_output} = useMenuHostSideAditorStyle(undefined, undefined, undefined, 
        {
            'acc_data' : acc_data
        }
    )

    return(
        <div className="host-side-aditor__container common-scroll-bar">
            <div className="host-side-aditor__wrapper">
                {default_data.host_side_aditor_menus.map((el, id) => {
                    return (
                        <div className="host-side-aditor__sellect-box small-button not-user-sellect" key={id}>
                            <span className="host-side-aditor__sellect-box-title">{el.name}</span>
                            {render_box_output(el.name)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HostSideAditor