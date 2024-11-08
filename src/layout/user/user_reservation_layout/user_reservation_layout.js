import './user_reservation_layout.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import { Outlet } from "react-router-dom"

function UserReservationLayout(){

    return (
        <div className="user-reservation__layout">
            <main className="user-reservation-layout__content">
                <Outlet/>
            </main>
        </div>
    )
}

export default UserReservationLayout