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

    
}

export default ReservationReservationLayout