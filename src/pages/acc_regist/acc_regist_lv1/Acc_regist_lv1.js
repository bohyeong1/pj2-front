import React from "react";
import './Acc_regist_lv1.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from '../../../utilData/defaultData'

function Acc_regist_lv1(){

    // console.log(default_data.d_category_icon)

    return (
        <div className="Acc_regist_lv1-container">
            <Main_menu></Main_menu>
            <div className="Acc_regist_lv1_content">
                <div className="Acc_regist_lv1-con-title">
                    등록하는 숙소를 설명하는 단어(카테고리)를 선택해 주세요!
                </div>
                <div className="Acc_regist_lv1-con-sec1">
                    {default_data.d_category_icon.map((ele,id)=>{
                        return(
                            <div className="Acc_regist_lv1-con-s1-box" key={id}>
                                <img src={ele.url}/>
                                <div className="Acc_regist_lv1-con-s1-box-tex">{ele.name}</div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
            <div className="Acc_resist_lv1_footer">
                <Host_footer></Host_footer>
            </div>
        </div>
    )
}

export default Acc_regist_lv1