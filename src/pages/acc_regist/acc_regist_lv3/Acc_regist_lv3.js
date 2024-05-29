import React, {useRef} from "react";
import './Acc_regist_lv3.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";

function Acc_regist_lv3(){
    console.log(default_data.d_base_facility)

    const regi_lv3_val = useRef([])

    return(
        <div className="Acc_regist_lv3-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv3_content">
                <div className="Acc_regist_lv3-con-title">
                    숙소가 포함하고 있는 기본 시설을 <br></br>작성해 주세요!
                </div>
                <div className="Acc_regist_lv3-con-sec1">
                    {default_data.d_base_facility.map((ele,id)=>{
                        return(
                            <div className="Acc_regist_lv3-con-s1-box" key={id}>
                                <div className="Acc_regist_lv3-con-s1-b1-d1">
                                    <img src={ele.url}/>
                                    <div className="Acc_regist_lv3-con-s1-box-tex1">{ele.name}</div>
                                </div>

                                <div className="Acc_regist_lv3-con-s1-b1-d2">
                                    <button id="Ac_re_lv3_btn" className={`Acc_regist_lv3-con-s1-b1-d2-lb${id}`} onClick={(e)=>{
                                            e.stopPropagation()

                                            regi_lv3_val.current[id].innerText = Number(regi_lv3_val.current[id].innerText)-1

                                        if(regi_lv3_val.current[id].innerText==='0'){
                                            e.target.disabled = true
                                        }else{
                                            const rb_btn = document.querySelector(`.Acc_regist_lv3-con-s1-b1-d2-rb${id}`)
                                            rb_btn.disabled=false
                                        }
                                        } 
                                    }>-</button>

                                    <div className="Acc_regist_lv3-con-s1-b1-d2-t1">
                                        <span ref={(el)=>{regi_lv3_val.current[id] = el}} className="Acc_regist_lv3-con-s1-b1-d2_val">1</span>
                                        <span>개</span>
                                    </div>

                                    <button id="Ac_re_lv3_btn" className={`Acc_regist_lv3-con-s1-b1-d2-rb${id}`} onClick={(e)=>{
                                                e.stopPropagation()

                                                regi_lv3_val.current[id].innerText = Number(regi_lv3_val.current[id].innerText)+1

                                        if(regi_lv3_val.current[id].innerText==='30'){
                                            e.target.disabled = true
                                        }else{
                                            const lb_btn = document.querySelector(`.Acc_regist_lv3-con-s1-b1-d2-lb${id}`)
                                            lb_btn.disabled=false
                                        }
                                        }        
                                    }>+</button>
                                </div>


                            </div>
                        )
                    })}                    
                </div>
            </div>

            <div className="Acc_regist_lv3-footer">
                <Host_footer></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv3



