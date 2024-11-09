import './user_reservation_layout.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import { Outlet } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import default_data from "@/util/default_data/default_data"

function UserReservationLayout(){
    
    const location = useLocation()

    return (
        <div className="user-reservation__layout">
            <aside className='user-reservation__side'>
                {default_data.user_reservation_side_menu.map((el, id)=>{
                    return (
                        <div 
                            className={`user-reservation__side-select 
                                ${id === default_data.user_reservation_side_menu.length - 1 ? '' : 'user-reservation__side-select-onborder'}
                                ${location.pathname === el.url ? 'user-reservation__side-select-onpage' : ''}`}
                            key={id}>
                            <span>{el.name}</span>
                        </div>
                    )
                })}
            </aside>
            <main className="user-reservation-layout__content">
                <Outlet/>
            </main>
        </div>
    )
}

export default UserReservationLayout