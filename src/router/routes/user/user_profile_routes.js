import React, {Suspense} from "react";
import { Route } from "react-router-dom";
import Loading from "@/utilComponent/material/loading/loading";

// =================================================
// user profile component //
const user_profile_routes = {
    route1 : React.lazy(() => import('@/pages/user/profile/views/user_profile_manage/user_profile_manage')),
    route2 : React.lazy(() => import('@/pages/user/profile/views/user_profile_main/user_profile_main')),
    route3 : React.lazy(() => import('@/pages/user/profile/views/user_profile_cash/user_profile_cash'))
}

function set_user_profile_routes(){
    return (
        <>
            <Route 
                exact path="manage" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <user_profile_routes.route1/>
                    </Suspense>}>
            </Route>
            <Route 
                exact path="main" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <user_profile_routes.route2/>
                    </Suspense>}>
            </Route>
            <Route 
                exact path="cash" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <user_profile_routes.route3/>
                    </Suspense>}>
            </Route>
        </>
    )
}

export default set_user_profile_routes