import React, {Suspense} from "react";
import { Route } from "react-router-dom";
import Loading from "../../../utilComponent/material/loading/loading";

// =================================================
// accomodation update component //
const host_update_accomodation_routes = {
    route1 : React.lazy(() => import('@/pages/acc_regist/update/views/accomodation/host_update_accomodation_view1/host_update_accomodation_view1')),
    route2 : React.lazy(() => import('@/pages/acc_regist/update/views/accomodation/host_update_accomodation_view2/host_update_accomodation_view2'))
}

// =================================================
// check in out update component //
const host_update_check_routes = {
    route1 : React.lazy(() => import('@/pages/acc_regist/update/views/check/host_update_check_view1/host_update_check_view1')),
    route2 : React.lazy(() => import('@/pages/acc_regist/update/views/check/host_update_check_view2/host_update_check_view2'))
}

function host_update_routes(keyword){
    // accomodation update view
    if(keyword === 'accomodation'){
        return (
            <>
                <Route exact path="title" 
                element={<Suspense fallback={<Loading></Loading>}><host_update_accomodation_routes.route1/></Suspense>}></Route>

                <Route exact path="category" 
                element={<Suspense fallback={<Loading></Loading>}><host_update_accomodation_routes.route2/></Suspense>}></Route>
            </>
        )
    }
    // check in out update view
    else if(keyword === 'check'){
        return (
            <>
                <Route exact path="checkin" 
                element={<Suspense fallback={<Loading></Loading>}><host_update_check_routes.route1/></Suspense>}></Route>

                <Route exact path="checkin-method" 
                element={<Suspense fallback={<Loading></Loading>}><host_update_check_routes.route2/></Suspense>}></Route>
            </>
        )

    }
    else{
        throw new Error('parameter 제대로 넣어주세요')
    }
}

export default host_update_routes