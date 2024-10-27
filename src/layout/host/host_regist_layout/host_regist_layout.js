import './host_regist_layout.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import { Outlet } from "react-router-dom"

function HostRegistLayout({option}){

    return (
        <div className="host-regist-layout">
            <main className="host-regist-layout__content">
                <Outlet/>
            </main>
        </div>
    )
}

export default HostRegistLayout