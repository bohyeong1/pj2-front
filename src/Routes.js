import { Route,Routes } from 'react-router-dom';
// =================================================
// default layout //
import DefaultLayout from './layout/default_layout/default_layout';
// =================================================
// routing pages //
import { 
    // main page //
    Main, 
    // membership page //
    Login, Join, Profile, Email_prove, Agree, Join_complete,
    // sub accomodation page //
    SubApp,
    // accomodations detail page //
    Detail,
    // accomodations host page //
    Acc_regist, 
    AccUpdate, 
    HostRegistView0,
    Acc_initial, AccManage, 
    Acc_regist_intro, AccRegist,
    Acc_initial_regist,
    // evaluation page //
    Evaluation,
    // private page //
    Private_history,Private_management, Private_point, Private_wish,
    // reservation page //
    Reservation,
    // terms page //
    Terms_host,Terms_creator, Terms_library, Terms_homepage, Terms_develope, Terms_refertosite,
} from './pages';
// =================================================
// routes //
import host_update_routes from './router/routes/host/host_update_routes';
import host_regist_routes from './router/routes/host/host_regist_routes';
// =================================================
// custom router //
import Private_router from './router/custom_router/private_router';
import Conditional_router from './router/custom_router/conditional_router';
import HostRegistCheckRouter from './router/custom_router/host_regist_check_router';
import LogCheckRouter from './router/custom_router/log_check_router';
import GetAccUserRouter from './router/custom_router/get_acc_user_router';
import HostLogCheckRouter from './router/custom_router/host_log_check_router';
// =================================================
// context provider //
import ImgProvider from '@/context/img_context/provider/img_provider';
import AccDataProvider from "@/context/acc_data_context/provider/acc_data_provider"
import CommonAccProvider from '@/context/common_acc_context/provider/common_acc_provider';
import UserProvider from '@/context/user_context/provider/user_provider';
import HostAccProvider from './context/host_acc_context/provider/host_acc_provider';

function FinalRoutes(){
    return(
        <>
            <Routes>            
                {/* // =================================================
                    // 메인 페이지 // */}
                <Route path='/' element={<Main/>}></Route>                                                                                  {/*메인*/}
                
                {/* // =================================================
                    // 로그인, 회원가입 페이지 // */}
                <Route path='/Login' element={<Login></Login>}></Route>                                                                                 {/*로그인*/}
                <Route path='/Join' element={<Join></Join>}></Route>                                                                                    {/*회원가입*/}
                <Route path='/Agree' element={<Agree></Agree>}></Route>                                                                                 {/*회원가입 동의*/}
                <Route path='/Email_prove' element={<Private_router data_state={true} element={Email_prove} />}></Route>                                {/*이메일 인증*/}
                <Route path='/Profile' element={<Private_router data_state={true} element={Profile} />}></Route>                                        {/*프로필 이미지 + 닉네임 등록*/}
                <Route path='Join_complete' element = {<Private_router data_state={true} element={Join_complete}/>}></Route>                            {/*회원가입 완료*/}

                {/* // =================================================
                    // 숙소 분류 페이지 // */}
                <Route path='/SubApp' element={<SubApp></SubApp>}>                                                                                      {/*숙소 분류 페이지*/}
                    <Route path=':city' element={<SubApp></SubApp>}></Route>
                </Route>

                {/* // =================================================
                    // detail // */}                    
                {/* detail - 숙소 상세 페이지 */}
                <Route path = '/detail' element = {<LogCheckRouter element={DefaultLayout}/>}>                                                                
                    <Route path=':house' element={<Detail/>}></Route>
                </Route>

                {/* // =================================================
                    // reseration // */}
                {/* reservation - 숙소 예약 페이지 */}
                <Route 
                    path='/reservation' 
                    element={
                        <UserProvider>
                            <CommonAccProvider>
                                <GetAccUserRouter element={DefaultLayout}/>
                            </CommonAccProvider>
                        </UserProvider>}>                                                             
                    <Route path=':house' element={<Reservation/>}></Route>
                </Route>    
               
                {/* // =================================================
                    // 호스트 페이지 // */}
                <Route path='/Acc_regist' element={<Conditional_router data_state={true}                                              
                element={Acc_regist} redirection_url={'/Acc_initial'}></Conditional_router>}></Route>                                                         {/*숙소 호스팅 페이지*/}
                <Route path='/Acc_initial' element={<Acc_initial></Acc_initial>}></Route>                                                                     {/*호스트 등록 페이지*/}   
                <Route path='/Acc_initial_regist' element={<Private_router data_state={true} element={Acc_initial_regist}/>}></Route>                         {/*초기 호스트 정보 기입 페이지*/}    
                
                <Route path='/Acc_regist/AccManage' element={<Private_router data_state={true} element={AccManage}/>}></Route>                                {/*호스트 숙소 확인 페이지*/}
                
                <Route path='/Acc_regist/Acc_regist_intro' element={<Acc_regist_intro></Acc_regist_intro>}></Route>                                           {/*호스트 텍스트 메시지 입력 페이지*/} 
               
                {/* // =================================================
                    // host // */}

                {/* host - 숙소 등록 페이지 */}
                <Route 
                    path='/host' 
                    element = {
                        <UserProvider>
                            <HostAccProvider>
                                <HostRegistCheckRouter 
                                    element={DefaultLayout} 
                                    redirection_url = {'/Acc_initial'}
                                    footer = {false}
                                    host={true}/>
                            </HostAccProvider>
                        </UserProvider>}>
                    <Route 
                        path='regist/:house' 
                        element = {<AccRegist/>}>
                        {host_regist_routes()}
                    </Route>
                </Route>

                <Route
                    path='/host'
                    element={
                        <HostAccProvider>
                            <UserProvider>
                                <HostLogCheckRouter
                                    element={DefaultLayout} 
                                    redirection_url = {'/Acc_initial'}
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
                    element = {
                        <AccDataProvider>
                            <HostRegistCheckRouter 
                                element={DefaultLayout} 
                                redirection_url = {'/Acc_initial'}
                                host={true}/>
                        </AccDataProvider>}>
                    <Route 
                        path='update/:house/accomodation' 
                        element = {<AccUpdate option={'accomodation'}/>}>
                        {host_update_routes('accomodation')}
                    </Route>
                    <Route 
                        path='update/:house/check' 
                        element = {<AccUpdate option={'check'}/>}>
                        {host_update_routes('check')}
                    </Route>
                </Route>
                
                {/* // =================================================
                    // 마이 페이지 // */}
                <Route path='/Private_history' element={<Private_history></Private_history>}></Route>                                                   {/*마이페이지 - 예약내역 리스트*/}
                <Route path='/Private_management' element={<Private_management></Private_management>}></Route>                                          {/*마이페이지 - 정보수정*/}
                <Route path='/Private_point' element={<Private_point></Private_point>}></Route>                                                         {/*마이페이지 - 포인트확인*/}
                <Route path='/Private_wish' element={<Private_wish></Private_wish>}></Route>                                                            {/*위시리스트*/}

         

                {/* // =================================================
                    // 평가 페이지 // */}
                <Route path='/evaluation' element={<Evaluation></Evaluation>}>                                                                          {/*숙소 평가*/}
                    <Route path=':evaluation' element={<Evaluation></Evaluation>}></Route>
                </Route>

                {/* // =================================================
                    // 약관 페이지 // */}
                <Route path='/Terms_host' element={<Terms_host></Terms_host>}></Route>                                                                  {/*호스트 약관*/}
                <Route path='/Terms_creator' element={<Terms_creator></Terms_creator>}></Route>                                                         {/*제작자소개*/}
                <Route path='/Terms_library' element={<Terms_library></Terms_library>}></Route>                                                         {/*사용라이브러리*/}
                <Route path='/Terms_homepage' element={<Terms_homepage></Terms_homepage>}></Route>                                                      {/*홈페이지 약관*/}
                <Route path='/Terms_develope' element={<Terms_develope></Terms_develope>}></Route>                                                      {/*개발현황*/}
                <Route path='/Terms_refertosite' element={<Terms_refertosite></Terms_refertosite>}></Route>                                             {/*참고사이트*/}

                {/* <Route path='*'></Route>//개발중인 페이지 */}
            </Routes>
        </>
    )
}

export default FinalRoutes