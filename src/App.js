import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { MainApp, Login, Membership_join, Mem_join_complete,SubApp ,Detail_infoApp,Acc_regist
        ,Acc_regist_lv1, Acc_manage,Acc_regist_lv0, Acc_regist_lv2, Acc_regist_lv3,Acc_regist_lv4, Acc_regist_lv5

} from './pages';


import ReservationApp from './reservation/reservationApp/ReservationApp';
import AgreeTerms from './pages/membership/agreeTerms/AgreeTerms';
import Private_history from './Privacy/private-history/Private-history';
import Private_management from './Privacy/private-management/Private-management';
import Private_message from './Privacy/private-message/Private-message';
import Private_point from './Privacy/private-point/Private-point';
import Private_resister from './Privacy/private-resister/Private-resister';

import LogModal from './modal/logModal/LogModal';



const BASE_URL = 'http://127.0.0.1:3700'           ///베이스 url


function App(){


  const [data, setData] = useState([])
  const [category, setCategory] = useState([])
  const [logState, setLogState] = useState(false)
  const [userName, setUserName] = useState()

  ///////데이터 연결
  async function connectData(url, method, data = null, token = null){
    const dataJson = await fetch(url,{
      headers:{
        'Content-Type':'application/json',
        'Authorization': `${token? 'Bearer' + token : ''}`, 
      },
      method: method,
      body: data? data : null 
    })

    const result = await dataJson.json()
    return result
  }


/////////////데이터 저장
async function saveData(){
  const datas = await connectData(`${BASE_URL}/api/common`, 'POST')
  const categories = await connectData(`${BASE_URL}/api/common/cityName`, 'GET')
  setData(datas)
  setCategory(categories)

  // return datas 
}



//////////////데이터 받아오기
  useEffect(()=>{
    saveData()

  },[])






  return(
    <div className="App">

      <Routes>
        <Route exact path='/' element={<MainApp city={category.citys}></MainApp>}></Route>       ///메인
        <Route exact path='/Login' element={<Login></Login>}></Route>                                                      ///로그인
        <Route exact path='/Membership_join' element={<Membership_join></Membership_join>}></Route>                        ///회원가입
        <Route exact path='/Mem_join_complete' element={<Mem_join_complete></Mem_join_complete>}></Route>                 ///회원가입 완료
        <Route exact path='/SubApp' element={<SubApp></SubApp>}>                                ////숙소 분류 페이지
          <Route exact path=':city' element={<SubApp></SubApp>}></Route>
        </Route>
        <Route exact path='/SubApp/Detail_infoApp' element={<Detail_infoApp data={data.accomodations}></Detail_infoApp>}>         ////////숙소 상세페이지
          <Route exact path=':house' element={<Detail_infoApp data={data.accomodations}></Detail_infoApp>}></Route>
        </Route>
        <Route exact path='/Acc_regist' element={<Acc_regist></Acc_regist>}></Route>                                    ///// 숙소 호스팅 페이지
        <Route exact path='/Acc_regist/Acc_manage' element={<Acc_manage></Acc_manage>}></Route>
        <Route exact path='Acc_regist/Acc_regist_lv0' element={<Acc_regist_lv0></Acc_regist_lv0>}></Route>              ///////////숙소 등록 페이지 lv0
        <Route exact path='/Acc_regist/Acc_regist_lv1' element={<Acc_regist_lv1></Acc_regist_lv1>}></Route>                 /////숙소 등록 페이지lv1
        <Route exact path='Acc_regist/Acc_regist_lv2' element={<Acc_regist_lv2></Acc_regist_lv2>}></Route>                 ////////숙소 등록 페이지lv2
        <Route exact path='Acc_regist/Acc_regist_lv3' element={<Acc_regist_lv3></Acc_regist_lv3>}></Route>              //////////////// 숙소 등록 페이지 lv3
        <Route exact path='Acc_regist/Acc_regist_lv4' element={<Acc_regist_lv4></Acc_regist_lv4>}></Route>              /////////////숙소 등록 페이지 lv4
        <Route exact path='Acc_regist/Acc_regist_lv5' element={<Acc_regist_lv5></Acc_regist_lv5>}></Route>              /////////////숙소 등록 페이지 lv5
        
      </Routes>

    {/* <MainApp></MainApp> */}
    {/* <SubApp></SubApp> */}
    {/* <Detail_infoApp></Detail_infoApp> */}
    {/* <ReservationApp></ReservationApp> */}
    {/* <AgreeTerms></AgreeTerms> */}
    {/* <Membership_join></Membership_join> */}
    {/* <Mem_join_complete></Mem_join_complete> */}
    {/* <Private_history></Private_history> */}
    {/* <Private_management></Private_management> */}
    {/* <Private_message></Private_message> */}
    {/* <Private_point></Private_point> */}
    {/* <Private_resister></Private_resister> */}
    {/* <Login></Login> */}
    {/* <LogModal></LogModal> */}

    </div>
  )
}


export default App;
