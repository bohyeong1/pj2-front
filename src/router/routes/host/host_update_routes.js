import React, {Suspense} from "react";
import { Route } from "react-router-dom";
import Loading from "../../../utilComponent/material/loading/loading";

// =================================================
// accomodation update component //
const host_update_accomodation_routes = {
    route1 : React.lazy(() => import('@/pages/acc_regist/update/views/accomodation/host_update_accomodation_view1/host_update_accomodation_view1')),
    route2 : React.lazy(() => import('@/pages/acc_regist/update/views/accomodation/host_update_accomodation_view2/host_update_accomodation_view2')),
    route3 : React.lazy(() => import('@/pages/acc_regist/update/views/accomodation/host_update_accomodation_view3/host_update_accomodation_view3')),
    route4 : React.lazy(() => import('@/pages/acc_regist/update/views/accomodation/host_update_accomodation_view4/host_update_accomodation_view4')),
    route5 : React.lazy(() => import('@/pages/acc_regist/update/views/accomodation/host_update_accomodation_view5/host_update_accomodation_view5')),
    route6 : React.lazy(() => import('@/pages/acc_regist/update/views/accomodation/host_update_accomodation_view6/host_update_accomodation_view6')),
    route7 : React.lazy(() => import('@/pages/acc_regist/update/views/accomodation/host_update_accomodation_view7/host_update_accomodation_view7')),
    route8 : React.lazy(() => import('@/pages/acc_regist/update/views/accomodation/host_update_accomodation_view8/host_update_accomodation_view8')),
    route9 : React.lazy(() => import('@/pages/acc_regist/update/views/accomodation/host_update_accomodation_view9/host_update_accomodation_view9')),
}

// =================================================
// check in out update component //
const host_update_check_routes = {
    route1 : React.lazy(() => import('@/pages/acc_regist/update/views/check/host_update_check_view1/host_update_check_view1')),
    route2 : React.lazy(() => import('@/pages/acc_regist/update/views/check/host_update_check_view2/host_update_check_view2')),
    route3 : React.lazy(() => import('@/pages/acc_regist/update/views/check/host_update_check_view3/host_update_check_view3')),
    route4 : React.lazy(() => import('@/pages/acc_regist/update/views/check/host_update_check_view4/host_update_check_view4')),
    route5 : React.lazy(() => import('@/pages/acc_regist/update/views/check/host_update_check_view5/host_update_check_view5')),
    route6 : React.lazy(() => import('@/pages/acc_regist/update/views/check/host_update_check_view6/host_update_check_view6'))
}

function host_update_routes(keyword){
    // accomodation update view
    if(keyword === 'accomodation'){
        return (
            <>
                <Route exact path="title" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_accomodation_routes.route1/></Suspense>}></Route>

                <Route exact path="category" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_accomodation_routes.route2/></Suspense>}></Route>
                
                <Route exact path="service-facility" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_accomodation_routes.route3/></Suspense>}></Route>
                
                <Route exact path="photo" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_accomodation_routes.route4/></Suspense>}></Route>
                
                <Route exact path="keyword" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_accomodation_routes.route5/></Suspense>}></Route>
                
                <Route exact path="price" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_accomodation_routes.route6/></Suspense>}></Route>
                
                <Route exact path="capacity" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_accomodation_routes.route7/></Suspense>}></Route>
                
                <Route exact path="summary" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_accomodation_routes.route8/></Suspense>}></Route>
                
                <Route exact path="rule" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_accomodation_routes.route9/></Suspense>}></Route>
            </>
        )
    }
    // check in out update view
    else if(keyword === 'check'){
        return (
            <>
                <Route exact path="checkin" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_check_routes.route1/></Suspense>}></Route>

                <Route exact path="custom-path" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_check_routes.route2/></Suspense>}></Route>

                <Route exact path="wifi" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_check_routes.route3/></Suspense>}></Route>

                <Route exact path="manual" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_check_routes.route4/></Suspense>}></Route>

                <Route exact path="checkout" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_check_routes.route5/></Suspense>}></Route>

                <Route exact path="comunication" 
                element={<Suspense fallback={<Loading part = {true}></Loading>}><host_update_check_routes.route6/></Suspense>}></Route>
            </>
        )

    }
    else{
        throw new Error('parameter 제대로 넣어주세요')
    }
}

export default host_update_routes