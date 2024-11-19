import React, {Suspense} from "react";
import { Route } from "react-router-dom";
import Loading from "@/utilComponent/material/loading/loading";

// =================================================
// user profile component //
const user_profile_routes = {
    route1 : React.lazy(() => import('@/pages/user/profile/views/user_profile_manage/user_profile_manage'))
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
        </>
    )
}

export default set_user_profile_routes