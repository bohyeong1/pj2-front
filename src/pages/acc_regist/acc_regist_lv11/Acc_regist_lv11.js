import React from "react";
import './Acc_regist_lv11.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";

function Acc_regist_lv11(){

    return(
        <div className="Acc_regist_lv11-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv11_content">
                <div className="Acc_regist_lv11-con-title">
                    호스팅 가격을 정해주세요!
                </div>
                <div className="Acc_regist_lv11-con-sec1">                   
                    
                </div>
            </div>

            <div className="Acc_regist_lv11-footer">
                <Host_footer></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv11