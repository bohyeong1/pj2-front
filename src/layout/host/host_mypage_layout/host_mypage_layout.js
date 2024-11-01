import './host_mypage_layout.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import { Outlet } from "react-router-dom"
import default_data from "@/util/default_data/default_data"
import { useLocation } from 'react-router-dom'

function HostMyPageLayout(){    

    const location = useLocation()

    return (
        <div className="host-mypage-layout">
            <aside className='host-mypage-layout__side'>
                {default_data.host_modal_menus.map((el, id)=>{
                    return (
                        <div 
                            className={`host-mypage-layout__side-select 
                                ${id === default_data.host_modal_menus.length - 1 ? '' : 'host-mypage-layout__side-select-onborder'}
                                ${location.pathname === el.url ? 'host-mypage-layout__side-select-onpage' : ''}`}
                            key={id}>
                            <span>{el.name}</span>
                        </div>
                    )
                })}
            </aside>
            <main className="host-mypage-layout__content">
                <Outlet/>
            </main>
        </div>
    )
}

export default HostMyPageLayout