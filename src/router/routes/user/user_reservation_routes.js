import React, {Suspense} from "react";
import { Route } from "react-router-dom";
import Loading from "@/utilComponent/material/loading/loading";

// =================================================
// user reservation component //
const user_reservation_routes = {
    route1 : React.lazy(() => import('@/pages/user/reservation/views/user_reservation_pending_list/user_reservation_pending_list')),
    route2 : React.lazy(() => import('@/pages/user/reservation/views/user_reservation_message/user_reservation_message')),
    route3 : React.lazy(() => import('@/pages/user/reservation/views/user_reservation_detail_message/user_reservation_detail_message')),
    route4 : React.lazy(() => import ('@/pages/user/reservation/views/user_reservation_wish_list/user_reservation_wish_list')),
    route5 : React.lazy(() => import('@/pages/user/reservation/views/user_reservation_success_list/user_reservation_success_list'))
}

function set_user_reservation_routes(){
    return (
        <>
            <Route 
                exact path="pending-list" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <user_reservation_routes.route1/>
                    </Suspense>}>
            </Route>

            <Route 
                exact path="message" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <user_reservation_routes.route2/>
                    </Suspense>}>
            </Route>

            <Route 
                exact path="message/detail/:reservation" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <user_reservation_routes.route3/>
                    </Suspense>}>
            </Route>

            <Route 
                exact path="wish-list" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <user_reservation_routes.route4/>
                    </Suspense>}>
            </Route>

            <Route 
                exact path="success-list" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <user_reservation_routes.route5/>
                    </Suspense>}>
            </Route>
        </>
    )
}

export default set_user_reservation_routes