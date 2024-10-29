import React, {Suspense} from "react";
import { Route } from "react-router-dom";
import Loading from "@/utilComponent/material/loading/loading";

// =================================================
// accomodation regist component //
const host_manage_routes = {
    route1 : React.lazy(() => import('@/pages/acc_regist/manage/views/host_manage_calendar/host_manage_calendar')),

}

function set_host_manage_routes(){
    // accomodation regist view
    return (
        <>
            <Route 
                exact path="calendar" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <host_manage_routes.route1/>
                    </Suspense>}>
            </Route>
        </>
    )

}

export default set_host_manage_routes