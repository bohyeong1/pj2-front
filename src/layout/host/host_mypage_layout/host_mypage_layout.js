import './host_mypage_layout.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import { Outlet } from "react-router-dom"

function HostMyPageLayout(){

    return (
        <div className="host-mypage-layout">
            <main className="host-mypage-layout__content">
                <Outlet/>
            </main>
        </div>
    )
}

export default HostMyPageLayout