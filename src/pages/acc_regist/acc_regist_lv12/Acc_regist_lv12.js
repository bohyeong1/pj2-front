import React from "react";
import './Acc_regist_lv12.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";

function Acc_regist_lv12(){

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