import './host_manage_layout.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import { Outlet } from "react-router-dom"

function HostManageLayout(){
    return (
        <div className="host-manage-layout__container">
            <main className="host-manage-layout__content">
                <Outlet/>
            </main>
        </div>
    )
}

export default HostManageLayout