import React, {Suspense} from "react";
import { Route } from "react-router-dom";
import Loading from "@/utilComponent/material/loading/loading";

// =================================================
// user reservation component //
const user_reservation_routes = {
    route1 : React.lazy(() => import('@/pages/user/reservation/views/user_reservation_pending_list/user_reservation_pending_list'))
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
        </>
    )
}

export default set_user_reservation_routes