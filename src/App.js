import './App.css';
import { Route,Routes } from 'react-router-dom';
import React from 'react';
import { MainApp, Login, Membership_join, Mem_join_complete,SubApp ,Detail_infoApp,Acc_regist
        ,Acc_regist_lv1, Acc_manage,Acc_regist_lv0, Acc_regist_lv2, Acc_regist_lv3,Acc_regist_lv4, Acc_regist_lv5
        ,Acc_regist_lv6,Acc_regist_lv7,Acc_regist_lv8,Acc_regist_lv9,Acc_regist_lv10,Acc_regist_lv11,Acc_regist_lv12,
        Private_history,Private_management,ReservationApp,Acc_regist_start,Evaluation, AgreeTerms,Private_point,Acc_regist_intro,
        Terms_host,Terms_creator, Terms_library, Terms_homepage, Terms_develope, Terms_refertosite,Private_wish
} from './pages';
// gsap
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 리덕스
import { Provider } from 'react-redux';
import { store } from './redux/config/configStore';

import Overay from './utilComponent/modal/overay/overay';

function App(){

  // gsap plugin 등록
  gsap.registerPlugin(ScrollTrigger)

  return(
    <Provider store = {store}>
      <div className="App">
        {/* 모달창 오버레이 / redux로 모든 모달 및 드랍다운 전역관리*/}
        <Overay></Overay>

        <Routes>
          
          {/* ----------------------------------------
              -----------랜딩 페이지-----------------
              ---------------------------------------- */}
          <Route exact path='/' element={<MainApp></MainApp>}></Route>       ///메인
          
          {/* ----------------------------------------
              -----------로그 페이지-----------------
              ---------------------------------------- */}
          <Route exact path='/Login' element={<Login></Login>}></Route>                                                      ///로그인
          <Route exact path='/Membership_join' element={<Membership_join></Membership_join>}></Route>                        ///회원가입
          <Route exact path='/AgreeTerms' element={<AgreeTerms></AgreeTerms>}></Route>                                        ///회원가입 동의
          <Route exact path='/Mem_join_complete' element={<Mem_join_complete></Mem_join_complete>}></Route>                 ///회원가입 완료



          {/* ----------------------------------------
              -----------숙소 분류 페이지-----------------
              ---------------------------------------- */}
          <Route exact path='/SubApp' element={<SubApp></SubApp>}>                                ////숙소 분류 페이지
            <Route exact path=':city' element={<SubApp></SubApp>}></Route>
          </Route>
          <Route exact path='/SubApp/Detail_infoApp' element={<Detail_infoApp></Detail_infoApp>}>         ////////숙소 상세페이지
            <Route exact path=':house' element={<Detail_infoApp></Detail_infoApp>}></Route>
          </Route>


          {/* ----------------------------------------
              -----------호스팅 페이지-----------------
              ---------------------------------------- */}
          <Route exact path='/Acc_regist' element={<Acc_regist></Acc_regist>}></Route>                                    ///// 숙소 호스팅 페이지
          <Route exact path='/Acc_regist/Acc_manage' element={<Acc_manage></Acc_manage>}></Route>
          <Route exact path='/Acc_regist/Acc_regist_intro' element={<Acc_regist_intro></Acc_regist_intro>}></Route>                         /////호스트 텍스트 메시지 입력 페이지      

          <Route exact path='/Acc_regist/Acc_regist_start' element={<Acc_regist_start></Acc_regist_start>}></Route>              ///////////숙소 등록 시작 페이지
          <Route exact path='/Acc_regist/Acc_regist_lv0' element={<Acc_regist_lv0></Acc_regist_lv0>}></Route>              ///////////숙소 등록 페이지 lv0
          <Route exact path='/Acc_regist/Acc_regist_lv1' element={<Acc_regist_lv1></Acc_regist_lv1>}></Route>                 /////숙소 등록 페이지lv1
          <Route exact path='/Acc_regist/Acc_regist_lv2' element={<Acc_regist_lv2></Acc_regist_lv2>}></Route>                 ////////숙소 등록 페이지lv2
          <Route exact path='/Acc_regist/Acc_regist_lv3' element={<Acc_regist_lv3></Acc_regist_lv3>}></Route>              //////////////// 숙소 등록 페이지 lv3
          <Route exact path='/Acc_regist/Acc_regist_lv4' element={<Acc_regist_lv4></Acc_regist_lv4>}></Route>              /////////////숙소 등록 페이지 lv4
          <Route exact path='/Acc_regist/Acc_regist_lv5' element={<Acc_regist_lv5></Acc_regist_lv5>}></Route>              /////////////숙소 등록 페이지 lv5
          <Route exact path='/Acc_regist/Acc_regist_lv6' element={<Acc_regist_lv6></Acc_regist_lv6>}></Route>              /////////////숙소 등록 페이지 lv6
          <Route exact path='/Acc_regist/Acc_regist_lv7' element={<Acc_regist_lv7></Acc_regist_lv7>}></Route>              /////////////숙소 등록 페이지 lv7
          <Route exact path='/Acc_regist/Acc_regist_lv8' element={<Acc_regist_lv8></Acc_regist_lv8>}></Route>              /////////////숙소 등록 페이지 lv8
          <Route exact path='/Acc_regist/Acc_regist_lv9' element={<Acc_regist_lv9></Acc_regist_lv9>}></Route>              /////////////숙소 등록 페이지 lv9
          <Route exact path='/Acc_regist/Acc_regist_lv10' element={<Acc_regist_lv10></Acc_regist_lv10>}></Route>              /////////////숙소 등록 페이지 lv10
          <Route exact path='/Acc_regist/Acc_regist_lv11' element={<Acc_regist_lv11></Acc_regist_lv11>}></Route>              /////////////숙소 등록 페이지 lv11
          <Route exact path='/Acc_regist/Acc_regist_lv12' element={<Acc_regist_lv12></Acc_regist_lv12>}></Route>              /////////////숙소 등록 페이지 lv12


          {/* ----------------------------------------
              -----------마이 페이지-----------------
              ---------------------------------------- */}
          <Route exact path='/Private_history' element={<Private_history></Private_history>}></Route>              /////////////마이페이지 - 예약내역 리스트
          <Route exact path='/Private_management' element={<Private_management></Private_management>}></Route>              /////////////마이페이지 - 정보수정
          <Route exact path='/Private_point' element={<Private_point></Private_point>}></Route>              /////////////마이페이지 - 포인트확인
          <Route exact path='/Private_wish' element={<Private_wish></Private_wish>}></Route>                //////////////위시리스트

        {/* ----------------------------------------
            -----------예약 페이지-----------------
            ---------------------------------------- */}
          <Route exact path='/ReservationApp' element={<ReservationApp></ReservationApp>}>                    /////////////예약하기    
            <Route exact path=':reservation' element={<ReservationApp></ReservationApp>}></Route>
          </Route>             

          {/* ----------------------------------------
              -----------평가 페이지-----------------
              ---------------------------------------- */}
          <Route exact path='/evaluation' element={<Evaluation></Evaluation>}>              /////////////숙소 평가
            <Route exact path=':evaluation' element={<Evaluation></Evaluation>}></Route>
          </Route>

          {/* ----------------------------------------
              ----------약관 페이지-----------------
              ---------------------------------------- */}
          <Route exact path='/Terms_host' element={<Terms_host></Terms_host>}></Route>                    ////호스트 약관
          <Route exact path='/Terms_creator' element={<Terms_creator></Terms_creator>}></Route>            ////제작자소개
          <Route exact path='/Terms_library' element={<Terms_library></Terms_library>}></Route>           ////사용라이브러리
          <Route exact path='/Terms_homepage' element={<Terms_homepage></Terms_homepage>}></Route>           ////홈페이지 약관
          <Route exact path='/Terms_develope' element={<Terms_develope></Terms_develope>}></Route>          ////개발현황
          <Route exact path='/Terms_refertosite' element={<Terms_refertosite></Terms_refertosite>}></Route>    ////참고사이트



          {/* <Route path='*'></Route>            /////////개발중인 페이지 */}
        </Routes>


      </div>
    </Provider>
  )
}


export default App;
