import React, {Suspense} from "react";
import { Route } from "react-router-dom";
import Loading from "@/utilComponent/material/loading/loading";

// =================================================
// accomodation regist component //
const host_manage_routes = {
    route1 : React.lazy(() => import('@/pages/acc_regist/manage/views/host_manage_calendar/host_manage_calendar')),
    route2 : React.lazy(() => import('@/pages/acc_regist/manage/views/host_manage_initial_regist_step1/host_manage_initial_regist_step1')),
    route3 : React.lazy(() => import('@/pages/acc_regist/manage/views/host_manage_initial_regist_step2/host_manage_initial_regist_step2')),
    route4 : React.lazy(() => import('@/pages/acc_regist/manage/views/host_manage_main/host_manage_main')),
    route5 : React.lazy(() => import('@/pages/acc_regist/manage/views/host_manage_list/host_manage_list'))
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

            <Route 
                exact path="regist-1" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <host_manage_routes.route2/>
                    </Suspense>}>
            </Route>

            <Route 
                exact path="regist-2" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <host_manage_routes.route3/>
                    </Suspense>}>
            </Route>

            <Route 
                exact path="main" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <host_manage_routes.route4/>
                    </Suspense>}>
            </Route>
            
            <Route 
                exact path="list" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <host_manage_routes.route5/>
                    </Suspense>}>
            </Route>
        </>
    )

}

export default set_host_manage_routes