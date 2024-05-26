import React from "react";
import './Acc_regist_lv2.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";

function Acc_regist_lv2(){
    console.log(default_data.d_house_space)
    return(
        <div className="Acc_regist_lv2-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv2_content">
                <div className="Acc_regist_lv2-con-title">
                    이용자가 사용할 공간 유형
                </div>
                <div className="Acc_regist_lv2-con-sec1">
                    {default_data.d_house_space.map((ele,id)=>{
                        return(
                            <div className="Acc_regist_lv2-con-s1-box" key={id}>
                                <img src={ele.url}/>
                                <div className="Acc_regist_lv2-con-s1-box-tex1">{ele.name}</div>
                                <div className="Acc_regist_lv2-con-s1-box-tex2">{ele.text}</div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>

            <div className="Acc_regist_lv2-footer">
                <Host_footer></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv2