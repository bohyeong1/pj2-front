import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
// import { Component } from 'react';
import React, {useEffect, useState} from 'react';
import { MainApp, Login, Membership_join, Mem_join_complete,SubApp ,Detail_infoApp} from './pages';

// import MainApp from './pages/main/mainApp/MainApp';
// import SubApp from './sub/subApp/SubApp';
// import Detail_infoApp from './detail_info/detail_infoApp/Detail_infoApp';
import ReservationApp from './reservation/reservationApp/ReservationApp';
import AgreeTerms from './pages/membership/agreeTerms/AgreeTerms';
// import Membership_join from './pages/membership/membership-join/Membership-join';
// import Mem_join_complete from './pages/membership/mem-join-comlete/Mem-join-complete';
import Private_history from './Privacy/private-history/Private-history';
import Private_management from './Privacy/private-management/Private-management';
import Private_message from './Privacy/private-message/Private-message';
import Private_point from './Privacy/private-point/Private-point';
import Private_resister from './Privacy/private-resister/Private-resister';
// import Login from './pages/membership/login/Login';


const BASE_URL = 'http://127.0.0.1:3700'           ///베이스 url



// const dummyData = [{
    
//     main_img:'https://cdn.mhns.co.kr/news/photo/202201/520746_630720_356.jpg',
//     title:'제주호텔',
//     cityName:'제주도',
//     price:12000,
//     adress:'대전 둔산동 그린아트',
//     evaluation:4.5,
//     category:'모텔',
//     keyword:['친환경']
// },{
    
//     main_img:'http://www.bokjinews.com/news/photo/202304/99645_33265_5629.jpg',
//     title:'서울신라호텔',
//     cityName:'서울',
//     price:20000,
//     adress:'대전 탄방동 탄방역',
//     evaluation:4.8,
//     category:'호텔',
//     keyword:['가족여행']
// }]







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
    </div>
  )
}


export default App;
