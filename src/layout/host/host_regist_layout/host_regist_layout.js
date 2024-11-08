import './host_regist_layout.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import { Outlet } from "react-router-dom"

function HostRegistLayout(){

    return (
        <div className="host-regist__layout">
            <main className="host-regist-layout__content">
                <Outlet/>
            </main>
        </div>
    )
}

export default HostRegistLayout