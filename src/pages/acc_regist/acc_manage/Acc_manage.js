import React from "react";
import './Acc_manage.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import { useNavigate } from "react-router-dom";

function Acc_manage(){

    const navigate = useNavigate()

    return(
        <div className="Acc_manage-container">
            <Main_menu></Main_menu>
            <div className="Acc_manage-content">
                <div className="Acc_manage-sec1">
                    <div className="Acc_manage-s1-title">숙소</div>
                    <div className="Acc_manage-s1-addBtn" onClick={()=>{navigate('/Acc_regist/Acc_regist_start')}}>
                        +
                    </div>
                </div>
                <div className="Acc_manage-sec2">
                    <div className="Acc_manage-s2-title">숙소</div>
                </div>
            </div>
        </div>
    )
}

export default Acc_manage