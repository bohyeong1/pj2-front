import React, {useEffect} from "react";
import './Acc_regist_lv12.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/Utildata";

function Acc_regist_lv12(){

    const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터

    ///숙소 데이터 업데이트 패치 끝!!!~~~~
    async function finishRegist(){
        const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register/update`, 'PUT', 
        {seller : userData._id,
        sellState : true
        }, localStorage.getItem('log'))
        
    } 

    useEffect(()=>{
        finishRegist()
    },[])

    return(
        <div className="Acc_regist_lv12-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv12_content">
                <div className="Acc_regist_lv12-con-title">
                    등록이 완료 되었습니다!
                </div>
                <div className="Acc_regist_lv12-con-sec1">                   
                    
                </div>
            </div>

            <div className="Acc_regist_lv12-footer">
                <Host_footer></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv12