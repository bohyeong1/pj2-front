import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { MainApp, Login, Membership_join, Mem_join_complete,SubApp ,Detail_infoApp,Acc_regist
        ,Acc_regist_lv1, Acc_manage,Acc_regist_lv0, Acc_regist_lv2, Acc_regist_lv3,Acc_regist_lv4, Acc_regist_lv5
        ,Acc_regist_lv6,Acc_regist_lv7,Acc_regist_lv8,Acc_regist_lv9,Acc_regist_lv10,Acc_regist_lv11,Acc_regist_lv12,
        Private_history,Private_management,ReservationApp

} from './pages';




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


        <Route exact path='/Private_history' element={<Private_history></Private_history>}></Route>              /////////////마이페이지 - 예약내역 리스트
        <Route exact path='/Private_management' element={<Private_management></Private_management>}></Route>              /////////////마이페이지 - 정보수정


        <Route exact path='/ReservationApp' element={<ReservationApp></ReservationApp>}></Route>              /////////////예약하기
        



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
