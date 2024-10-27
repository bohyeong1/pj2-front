import Main_menu from "@/utilComponent/menu/main-menu/main-menu"
import Footer from "@/utilComponent/menu/footer/Footer"
import { Outlet } from "react-router-dom"
import './default_layout.scss'

function DefaultLayout({login_user = null, host = false, footer = true}){

    return (
        <div className="default-layout__container">
            <nav className="default-layout__header">
                <Main_menu 
                    login_user = {login_user}
                    host = {host}/>
            </nav>
            <main className="default-layout__main">
                <Outlet/>
            </main>
            {footer && <footer className="default-layout__footer">
                <Footer/>
            </footer>}
        </div>
    )
}

export default DefaultLayout