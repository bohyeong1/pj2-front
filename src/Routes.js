import { Route,Routes } from 'react-router-dom';
// =================================================
// default layout //
import DefaultLayout from './layout/default_layout/default_layout';
// =================================================
// parent url routes //
import { 
    Main, 
    List,
    // user //
    Login, Join, Profile, Email_prove, Agree, Join_complete,

    UserReservation,
    UserProfile,
    Detail,
    AccUpdate, 
    HostRegistView0,
    AccManage,
    AccMyPage,
    AccRegist,
    Reservation,
    ReservationDetail,
    
    // terms page //
    Terms_host,Terms_creator, Terms_library, Terms_homepage, Terms_develope, Terms_refertosite,
} from './pages';
// =================================================
// suspense routes //
import set_host_update_routes from './router/routes/host/host_update_routes';
import set_host_regist_routes from './router/routes/host/host_regist_routes';
import set_host_manage_routes from './router/routes/host/host_manage_route';
import set_host_mypage_routes from './router/routes/host/host_mypage_route';
import set_user_reservation_routes from './router/routes/user/user_reservation_routes'
import set_user_profile_routes from './router/routes/user/user_profile_routes';
// =================================================
// custom router //
import Private_router from './router/custom_router/private_router';
import HostRegistCheckRouter from './router/custom_router/host_regist_check_router';
import HostAuthRouter from './router/custom_router/host_auth_router';
import GetAccUserRouter from './router/custom_router/get_acc_user_router';
import HostLogCheckRouter from './router/custom_router/host_log_check_router';
import UserAuthRouter from './router/custom_router/user_auth_router'
import UserOptimisticAuthRouter from './router/custom_router/user_optimistic_auth_router';
// =================================================
// context provider //
import CommonAccProvider from '@/context/common_acc_context/provider/common_acc_provider';
import UserProvider from '@/context/user_context/provider/user_provider';
import HostAccProvider from './context/host_acc_context/provider/host_acc_provider';

function FinalRoutes(){
    return(
        <>
            <Routes>            
                {/* // ================================================================================================================================================================
                    // main // */}
                <Route path='/' element={
                    <UserProvider>
                        <UserOptimisticAuthRouter element={Main}/>
                    </UserProvider>}>
                </Route>      

                {/* // ================================================================================================================================================================
                    // list // */}
                <Route path='/list' element={
                    <UserProvider>
                        <UserOptimisticAuthRouter element={List}/>
                    </UserProvider>}>
                </Route>                                                                    
                
                {/* // ================================================================================================================================================================
                    // user // */}
                {/* user - 예약 관련 페이지 */}
                <Route 
                    path='/user'
                    element={
                        <UserProvider>
                            <UserAuthRouter
                                element={DefaultLayout} 
                                redirection_url = {'/Login'}/>
                        </UserProvider>
                    }>
                    <Route 
                        path='reservation' 
                        element = {<UserReservation/>}>
                        {set_user_reservation_routes()}
                    </Route>
                </Route>
                {/* user - profile 관련 페이지 */}
                <Route 
                    path='/user'
                    element={
                        <UserProvider>
                            <UserAuthRouter
                                element={DefaultLayout} 
                                redirection_url = {'/Login'}/>
                        </UserProvider>
                    }>
                    <Route 
                        path='profile' 
                        element = {<UserProfile/>}>
                        {set_user_profile_routes()}
                    </Route>
                </Route>
                

                {/* // =================================================
                    // 로그인, 회원가입 페이지 // */}
                <Route path='/Login' element={<Login></Login>}></Route>                                                                                 {/*로그인*/}
                <Route path='/Join' element={<Join></Join>}></Route>                                                                                    {/*회원가입*/}
                <Route path='/Agree' element={<Agree></Agree>}></Route>                                                                                 {/*회원가입 동의*/}
                <Route path='/Email_prove' element={<Private_router data_state={true} element={Email_prove} />}></Route>                                {/*이메일 인증*/}
                <Route path='/Profile' element={<Private_router data_state={true} element={Profile} />}></Route>                                        {/*프로필 이미지 + 닉네임 등록*/}
                <Route path='Join_complete' element = {<Private_router data_state={true} element={Join_complete}/>}></Route>                            {/*회원가입 완료*/}


                {/* // ================================================================================================================================================================
                    // detail // */}                    
                {/* detail - 숙소 상세 페이지 */}
                <Route
                    path = '/detail' 
                    element = {
                        <UserProvider>
                            <UserOptimisticAuthRouter element={DefaultLayout}/>
                        </UserProvider>}>    
                    <Route path=':house' element={<Detail/>}/>
                </Route>

                {/* // ================================================================================================================================================================
                    // reseration // */}
                {/* reservation - 숙소 예약 페이지 */}
                <Route 
                    path='/reservation' 
                    element={
                        <UserProvider>
                            <CommonAccProvider>
                                <GetAccUserRouter element={DefaultLayout}/>
                            </CommonAccProvider>
                        </UserProvider>
                    }>                                                             
                    <Route 
                        path=':house' 
                        element={<Reservation/>}/>
                </Route> 

                {/* reservation - 예약된 숙소 detail page */}
                <Route 
                    path='/reservation/detail' 
                    element={
                        <UserProvider>
                            <UserAuthRouter element={DefaultLayout}/>
                        </UserProvider>
                    }>                                                             
                    <Route 
                        path=':house' 
                        element={<ReservationDetail/>}/>
                </Route> 
              
                {/* // ================================================================================================================================================================
                    // host // */}
                {/* host - 숙소 등록 페이지 */}
                <Route 
                    path='/host' 
                    element = {
                        <UserProvider>
                            <HostAccProvider>
                                <HostRegistCheckRouter 
                                    element={DefaultLayout} 
                                    redirection_url = {'manage/regist-1'}
                                    footer = {false}
                                    host={true}/>
                            </HostAccProvider>
                        </UserProvider>
                    }>
                    <Route 
                        path='regist/:house' 
                        element = {<AccRegist/>}>
                        {set_host_regist_routes()}
                    </Route>
                </Route>

                <Route
                    path='/host'
                    element= {
                        <HostAccProvider>
                            <UserProvider>
                                <HostLogCheckRouter
                                    element={DefaultLayout} 
                                    redirection_url = {'manage/regist-1'}
                                    footer = {false}
                                    host={true}/>
                            </UserProvider>
                        </HostAccProvider>
                    }>
                    <Route 
                        path='regist/step0' 
                        element = {<HostRegistView0/>}>
                    </Route>
                </Route>

                {/* host - 숙소 업데이트 페이지 */}            
                <Route 
                    path='/host' 
                    element = 
                        {
                            <HostAccProvider>
                                <UserProvider>
                                    <HostRegistCheckRouter 
                                        element={DefaultLayout} 
                                        redirection_url = {'manage/regist-1'}
                                        host={true}/>
                                </UserProvider>
                            </HostAccProvider>
                        }>
                    <Route 
                        path='update/:house/accomodation' 
                        element = {<AccUpdate option={'accomodation'}/>}>
                        {set_host_update_routes('accomodation')}
                    </Route>
                    <Route 
                        path='update/:house/check' 
                        element = {<AccUpdate option={'check'}/>}>
                        {set_host_update_routes('check')}
                    </Route>
                </Route>
                
                {/* host - host manage 페이지 */}
                <Route
                    path='/host'
                    element = {
                        <UserProvider>
                            <HostAuthRouter
                                element={DefaultLayout}
                                redirection_url={'manage/regist-1'}
                                host={true}/>
                        </UserProvider>
                    }>
                    <Route
                        path='manage'
                        element = {<AccManage/>}>
                        {set_host_manage_routes()}
                    </Route>
                </Route>

                {/* host - host mypage 페이지 */}
                <Route
                    path='/host'
                    element = 
                        {
                            <UserProvider>
                                <HostAuthRouter
                                    element={DefaultLayout}
                                    redirection_url={'manage/regist-1'}
                                    host={true}/>
                            </UserProvider>
                        }>
                        <Route
                            path='mypage'
                            element = {<AccMyPage/>}>
                            {set_host_mypage_routes()}
                        </Route>
                </Route> 

                {/* // =================================================
                    // 약관 페이지 // */}
                <Route path='/Terms_host' element={<Terms_host></Terms_host>}></Route>                                                                  {/*호스트 약관*/}
                <Route path='/Terms_creator' element={<Terms_creator></Terms_creator>}></Route>                                                         {/*제작자소개*/}
                <Route path='/Terms_library' element={<Terms_library></Terms_library>}></Route>                                                         {/*사용라이브러리*/}
                <Route path='/Terms_homepage' element={<Terms_homepage></Terms_homepage>}></Route>                                                      {/*홈페이지 약관*/}
                <Route path='/Terms_develope' element={<Terms_develope></Terms_develope>}></Route>                                                      {/*개발현황*/}
                <Route path='/Terms_refertosite' element={<Terms_refertosite></Terms_refertosite>}></Route>                                             {/*참고사이트*/}
            </Routes>
        </>
    )
}

export default FinalRoutes