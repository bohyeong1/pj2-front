import './user_profile_layout.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import { Outlet, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import default_data from "@/util/default_data/default_data"

function UserProfileLayout(){

    // =================================================
    // location //
    const location = useLocation()

    // =================================================
    // navigate //
    const navigate = useNavigate()

    return (
        <div className="user-profile__layout">
            <aside className='user-profile__side'>
                {default_data.user_profile_side_menu.map((el, id)=>{
                    return (
                        <div 
                            className={`user-profile__side-select 
                                ${id === default_data.user_profile_side_menu.length - 1 ? '' : 'user-profile__side-select-onborder'}
                                ${location.pathname === el.url ? 'user-profile__side-select-onpage' : ''}`}
                            onClick={()=>{navigate(el.url)}}
                            key={id}>
                            <span>{el.name}</span>
                        </div>
                    )
                })}
            </aside>
            <main className="user-profile-layout__content">
                <Outlet/>
            </main>
        </div>
    )
}

export default UserProfileLayout