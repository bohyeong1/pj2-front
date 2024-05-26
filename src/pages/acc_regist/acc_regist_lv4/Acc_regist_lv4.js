import React from "react";
import './Acc_regist_lv4.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";

function Acc_regist_lv4(){

    return(
        <div className="Acc_regist_lv4-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv4_content">
                <div className="Acc_regist_lv4-con-title">
                    숙소에서 사용가능한 서비스 시설을 <br></br> 선택해 주세요!
                </div>
                <div className="Acc_regist_lv4-con-sec1">
                    {default_data.d_service_facility_icon.map((ele,id)=>{
                        return(
                            <div className="Acc_regist_lv4-con-s1-box" key={id}>
                                <img src={ele.url}/>
                                <div className="Acc_regist_lv4-con-s1-box-tex1">{ele.name}</div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>

            <div className="Acc_regist_lv4-footer">
                <Host_footer></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv4