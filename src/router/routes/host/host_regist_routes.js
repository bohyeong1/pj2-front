import React, {Suspense} from "react";
import { Route } from "react-router-dom";
import Loading from "@/utilComponent/material/loading/loading";

// =================================================
// accomodation regist component //
const accomodation_regist_routes = {
    route1 : React.lazy(() => import('@/pages/host/regist/views/host_regist_view0/host_regist_view0')),
    route2 : React.lazy(() => import('@/pages/host/regist/views/host_regist_view1/host_regist_view1')),
    route3 : React.lazy(() => import('@/pages/host/regist/views/host_regist_view2/host_regist_view2')),
    route4 : React.lazy(() => import('@/pages/host/regist/views/host_regist_view3/host_regist_view3')),
    route5 : React.lazy(() => import('@/pages/host/regist/views/host_regist_view4/host_regist_view4')),
    route6 : React.lazy(() => import('@/pages/host/regist/views/host_regist_view5/host_regist_view5')),
    route7 : React.lazy(() => import('@/pages/host/regist/views/host_regist_view6/host_regist_view6')),
    route8 : React.lazy(() => import('@/pages/host/regist/views/host_regist_view7/host_regist_view7')),
    route9 : React.lazy(() => import('@/pages/host/regist/views/host_regist_view8/host_regist_view8')),
    route10 : React.lazy(() => import('@/pages/host/regist/views/host_regist_view9/host_regist_view9')),
    route11 : React.lazy(() => import('@/pages/host/regist/views/host_regist_view10/host_regist_view10')),
    route12 : React.lazy(() => import('@/pages/host/regist/views/host_regist_view11/host_regist_view11')),
    route13 : React.lazy(() => import('@/pages/host/regist/views/host_regist_view12/host_regist_view12'))
}

function set_host_regist_routes(){
    // accomodation regist view
    return (
        <>
            <Route 
                exact path="step0" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <accomodation_regist_routes.route1/>
                    </Suspense>}>
            </Route>
            <Route 
                exact path="step1" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <accomodation_regist_routes.route2/>
                    </Suspense>}>
            </Route>
            <Route 
                exact path="step2" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <accomodation_regist_routes.route3/>
                    </Suspense>}>
            </Route>
            <Route 
                exact path="step3" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <accomodation_regist_routes.route4/>
                    </Suspense>}>
            </Route>
            <Route 
                exact path="step4" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <accomodation_regist_routes.route5/>
                    </Suspense>}>
            </Route>
            <Route 
                exact path="step5" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <accomodation_regist_routes.route6/>
                    </Suspense>}>
            </Route>
            <Route 
                exact path="step6" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <accomodation_regist_routes.route7/>
                    </Suspense>}>
            </Route>
            <Route 
                exact path="step7" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <accomodation_regist_routes.route8/>
                    </Suspense>}>
            </Route>
            <Route 
                exact path="step8" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <accomodation_regist_routes.route9/>
                    </Suspense>}>
            </Route>
            <Route 
                exact path="step9" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <accomodation_regist_routes.route10/>
                    </Suspense>}>
            </Route>
            <Route 
                exact path="step10" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <accomodation_regist_routes.route11/>
                    </Suspense>}>
            </Route>
            <Route 
                exact path="step11" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <accomodation_regist_routes.route12/>
                    </Suspense>}>
            </Route>
            <Route 
                exact path="step12" 
                element={
                    <Suspense fallback={<Loading part = {true}/>}>
                        <accomodation_regist_routes.route13/>
                    </Suspense>}>
            </Route>
        </>
    )

}

export default set_host_regist_routes