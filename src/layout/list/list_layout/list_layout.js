import Footer from "@/utilComponent/menu/footer/Footer"
import './list_layout.scss'
import React from "react"

function ListLayout({children}){
    // =================================================
    // mapping children //    
    const children_object = {}
    React.Children.forEach(children, (el)=>{
        if(el.props.role){
            children_object[el.props.role] = el
        }
    })

    return (
        <div className="list-layout__container">
            <nav className="list-layout__menu-container">
                <div className="list-layout__header-menu-container">
                    {children_object.main_menu}
                    {children_object.search_menu}
                </div>
            </nav>
            <div className="list-layout__content">
                <aside className="list-layout__content-sidebar">
                    {children_object.side_bar}
                </aside>
                <div className="list-layout__main-content">
                    {children_object.main_content}
                </div>
            </div>
            <div className="list-layout__footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default ListLayout