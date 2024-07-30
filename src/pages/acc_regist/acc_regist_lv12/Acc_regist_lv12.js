import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './Acc_regist_lv12.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/UtilFunction";

function Acc_regist_lv12(){

    const navigator = useNavigate()

    const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터
    //현재 등록중인 숙소 데이터
    const registData = JSON.parse(sessionStorage.getItem('registData'))

    ///숙소 데이터 업데이트 패치 끝!!!~~~~
    async function finishRegist(){
        const city = JSON.parse(sessionStorage.getItem('city')) 
        console.log(city)
        const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register/update`, 'PUT', 
        {seller : userData._id,
        _id : registData._id,
        city : city,
        sellState : true
        }, localStorage.getItem('log'))
        
    } 

    useEffect(()=>{
        finishRegist()

        // 등록중에 사용한 숙소, 지역데이터 삭제
        sessionStorage.removeItem('registData')
        sessionStorage.removeItem('city')
    },[])

    return(
        <div className="Acc_regist_lv12-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv12_content">
                <div className="Acc_regist_lv12-con-title">
                    등록이 완료 되었습니다!
                </div>
                <div className="Acc_regist_lv12-conbox">
                    <div className="Acc_regist_lv12-con-sec1">                   
                    <iframe src="https://giphy.com/embed/BYoRqTmcgzHcL9TCy1" width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
                    </div>
                </div>

                <button className="Acc_regist_lv12-btn" onClick={()=>{navigator('/Acc_regist/Acc_manage')}}>등록한 숙소 보러가기</button>

            </div>

            <div className="Acc_regist_lv12-footer">
                <Host_footer></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv12