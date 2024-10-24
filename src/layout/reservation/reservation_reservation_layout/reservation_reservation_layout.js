import './reservation_reservation_layout.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import React from 'react'

function ReservationReservationLayout({children}){
    // =================================================
    // mapping children //    
    const children_object = {}
    React.Children.forEach(children, (el)=>{
        if(el.props.role){
            children_object[el.props.role] = el
        }
    })

    return (
        <div className="reservation-layout__content">
            <div className="reservation-layout__content-section1">
                {children_object.section2}
            </div>
            <div className="reservation-layout__content-section2">
                {children_object.section1}
            </div>
        </div>
    )
    
}

export default ReservationReservationLayout