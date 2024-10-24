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
    Acc_regist, Acc_initial, AccManage,
    Acc_regist_lv0,AccRegistLv1, AccRegistLv2, AccRegistLv3,
    AccRegistLv4, AccRegistLv5,AccRegistLv6, AccRegistLv7,
    AccRegistLv8,AccRegistLv9, AccRegistLv10, AccRegistLv11,AccRegistLv12,
    AccUpdate,
    Acc_regist_start, Acc_regist_intro,
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
// =================================================
// custom router //
import Private_router from './router/custom_router/private_router';
import Conditional_router from './router/custom_router/conditional_router';
import Parameter_router from './router/custom_router/parameter_router';
import LogCheckRouter from './router/custom_router/log_check_router';
import GetAccUserRouter from './router/custom_router/get_acc_user_router';
// =================================================
// context provider //
import ImgProvider from '@/context/img_context/provider/img_provider';
import AccDataProvider from "@/context/acc_data_context/provider/acc_data_provider"
import CommonAccProvider from '@/context/common_acc_context/provider/common_acc_provider';
import UserProvider from '@/context/user_context/provider/user_provider';

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
                <Route path='/Acc_regist/Acc_regist_start' element={<Acc_regist_start></Acc_regist_start>}></Route>                                           {/*숙소 등록 시작 페이지*/} 
                    
                <Route path="/Acc_regist/Acc_regist_lv0" element={<Parameter_router element={Acc_regist_lv0} data_state={true}/>} />
                <Route path="/Acc_regist/Acc_regist_lv0/:house" element={<Parameter_router element={Acc_regist_lv0} data_state={true}/>}/>                        {/*숙소 등록 페이지 lv0*/}
                <Route path="/Acc_regist/AccRegistLv1/:house" element={<Parameter_router element={AccRegistLv1} data_state={true}/>}/>                            {/*숙소 등록 페이지lv1*/} 
                <Route path="/Acc_regist/AccRegistLv2/:house" element={<Parameter_router element={AccRegistLv2} data_state={true}/>}/>                            {/*숙소 등록 페이지lv2*/}   
                <Route path="/Acc_regist/AccRegistLv3/:house" element={<Parameter_router element={AccRegistLv3} data_state={true}/>}/>                            {/*숙소 등록 페이지 lv3*/}
                <Route path="/Acc_regist/AccRegistLv4/:house" element={<Parameter_router element={AccRegistLv4} data_state={true}/>}/>                            {/*숙소 등록 페이지 lv4*/}      
                <Route path="/Acc_regist/AccRegistLv5/:house" element={<Parameter_router element={AccRegistLv5} data_state={true}/>}/>                            {/*숙소 등록 페이지 lv5*/}
                <Route path="/Acc_regist/AccRegistLv6/:house" element={<ImgProvider><Parameter_router element={AccRegistLv6} data_state={true}/></ImgProvider>}/> {/*숙소 등록 페이지 lv6*/}                                               
                <Route path="/Acc_regist/AccRegistLv7/:house" element={<Parameter_router element={AccRegistLv7} data_state={true}/>}/>                            {/*숙소 등록 페이지 lv7*/}
                <Route path="/Acc_regist/AccRegistLv8/:house" element={<Parameter_router element={AccRegistLv8} data_state={true}/>}/>                            {/*숙소 등록 페이지 lv8*/}
                <Route path="/Acc_regist/AccRegistLv9/:house" element={<Parameter_router element={AccRegistLv9} data_state={true}/>}/>                            {/*숙소 등록 페이지 lv9*/}
                <Route path="/Acc_regist/AccRegistLv10/:house" element={<Parameter_router element={AccRegistLv10} data_state={true}/>}/>                          {/*숙소 등록 페이지 lv10*/}
                <Route path="/Acc_regist/AccRegistLv11/:house" element={<Parameter_router element={AccRegistLv11} data_state={true}/>}/>                          {/*숙소 등록 페이지 lv11*/}     
                <Route path="/Acc_regist/AccRegistLv12/:house" element={<Parameter_router element={AccRegistLv12} data_state={true}/>}/>                          {/*숙소 등록 페이지 lv12*/}     

                <Route path="/Acc_regist/update/:house" element={<Parameter_router element={AccUpdate} data_state={true}/>}/>                                     {/*숙소 업데이트 페이지*/}  
                
                {/* // =================================================
                    // host // */}
                {/* host - 숙소 업데이트 페이지 */}            
                <Route path='/host' 
                       element = {
                            <AccDataProvider>
                                <Parameter_router 
                                    element={DefaultLayout} 
                                    data_state={true}/>
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