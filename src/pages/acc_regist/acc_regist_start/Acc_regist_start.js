import React from "react";
import './Acc_regist_start.css'
import { useNavigate } from "react-router-dom";
import Main_menu from "../../../menu/main-menu/main-menu";
import connectData from "../../../utilData/Utildata";
import default_data from "../../../utilData/defaultData";



function Acc_regist_start(){
    // console.log(JSON.parse(sessionStorage.getItem('userData')))
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    // console.log(localStorage.getItem('log'))
    const navigate = useNavigate()


    async function registStart(){
        const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register`, 'POST', {seller : userData._id}, localStorage.getItem('log'))

        navigate('/Acc_regist/Acc_regist_lv0')
    }


    return(
        <div className="Acc_regist_start-container">
            <Main_menu></Main_menu>
            <div className="Acc_regist_start-content">
                <button onClick={registStart}>숙소 등록하기</button>
            </div>

        </div>
    )
}

export default Acc_regist_start