import React, { useEffect, useState } from "react";
import './Private-point.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Pri_side_menu from "../../../menu/pri-side-menu/Pri-side-menu";
import Footer from "../../../menu/footer/Footer";
import connectData from "../../../utilData/UtilFunction";
import default_data from "../../../utilData/defaultData";


function Private_point(){
    const [cashData, setCashData] = useState()

    ///로그데이터
    const logData = sessionStorage.getItem('userData') || localStorage.getItem('userData')
    const logDataParse = JSON.parse(logData) || null

    async function getUserData(){
        const user = await connectData(`${default_data.d_base_url}/api/users/mileage`, 'POST',{
            userId : JSON.parse(sessionStorage.getItem('userData')).userId,

        })
        sessionStorage.setItem('userData', JSON.stringify(user))
        setCashData(user)
    }

    useEffect(()=>{
        getUserData()
    },[])

    console.log(JSON.parse(sessionStorage.getItem('userData')))

    return(
        <div className="Private_point-container">
           <Main_menu></Main_menu>


            <div className="Private_point-content">
                <Pri_side_menu data={default_data.pri_sidemenu}></Pri_side_menu>

                <div className="pri-po-con-main">
                    <div className="pri-po-con-main-title">포인트 확인</div>

                    <div className="pri-po-con-main-sec1">
                       <div className="pri-po-con-a-s1-b1">내 포인트</div>
                       <div className="pri-po-con-a-s1-b2">{`${cashData?.cashInv}원`}</div>
                    </div>
                </div>
            </div>




            <div className="Private_point-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Private_point