import React, {Suspense} from "react";
import { Route } from "react-router-dom";
import Loading from "@/utilComponent/material/loading/loading";

// =================================================
// host mypage component //
const host_mypage_routes = {
    route1 : React.lazy(() => import('@/pages/host/mypage/views/host_mypage_user_text/host_mypage_user_text')),
}

function set_host_mypage_routes(){
    return (
        <>
            <Route 
                exact path="information" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <host_mypage_routes.route1/>
                    </Suspense>}>
            </Route>
        </>
    )
}

export default set_host_mypage_routes