import React from "react";
import './Acc_regist_lv7.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";

function Acc_regist_lv7(){

    return(
        <div className="Acc_regist_lv7-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv7_content">
                <div className="Acc_regist_lv7-con-title">
                    숙소를 대표하는 키워드를 선택해 주세요 
                    <div className="Acc_regist_lv7-con-subtitle">중복 선택 가능합니다!</div> 
                </div>
                <div className="Acc_regist_lv7-con-sec1">
                    {default_data.d_keyword.map((ele,id)=>{
                        return(
                            <div className="Acc_regist_lv7-con-s1-box" key={id}>
                                <img src={ele.url}/>
                                <div className="Acc_regist_lv7-con-s1-box-tex1">{ele.name}</div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>

            <div className="Acc_regist_lv7-footer">
                <Host_footer></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv7