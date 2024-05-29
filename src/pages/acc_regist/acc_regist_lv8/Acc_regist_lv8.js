import React, {useRef, useState} from "react";
import './Acc_regist_lv8.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";

function Acc_regist_lv8(){

    // text 상태 div Ref
    const ac_regi_lv8_stringstate = useRef()  ///글자개수
    const ac_regi_lv8_alert = useRef()          ///경고 text
    const ac_regi_lv8_input = useRef()
    const regi_lv8_value = useRef()             ////수용인원
    const regi_lv8_s3_alert = useRef()          ///수용인원 경고 text


    function lv8TextInputChange(){
        const length = ac_regi_lv8_input.current.value.length
        ac_regi_lv8_stringstate.current.innerText = `${length}/20`
        if(length>20){
            ac_regi_lv8_alert.current.style.display = 'block'
        }else{
            ac_regi_lv8_alert.current.style.display = 'none'
        }

    }

    return(
        <div className="Acc_regist_lv8-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv8_content">
                <div className="Acc_regist_lv8-con-title">
                숙소를 대표하는 이름과 <br></br>인원을 선택해 주세요!
                </div>

                <div className="Acc_regist_lv8-con-sec1">                    
                    <div className="Acc_regist_lv8-con-s1-b1-title">숙소 이름</div>

                    <form className="Acc_regist_lv8-con-s1-b1">                        
                        <textarea  className="Acc_regist_lv8-con-s1-b1-t1" ref={ac_regi_lv8_input} type='text' style={{width:'100%', boxSizing:'border-box', height:'100%', 
                        textAlign : 'top', padding : '10px', fontSize : '1rem', lineHeight:'1.5rem'}} placeHolder='숙소를 설명하는 이름을 지어주세요!'  onChange={lv8TextInputChange}></textarea >
                        <input  className="Acc_regist_lv8-con-s1-b1-t2" type='submit' style={{display:'none'}}></input>
                    </form>

                    <div className="Acc_regist_lv8-con-s1-b2">
                        <div ref={ac_regi_lv8_stringstate} className="Acc_regist_lv8-con-s1-b2-t1">0/20</div>
                        <div ref={ac_regi_lv8_alert} className="Acc_regist_lv8-con-s1-b2-t2" style={{color:'red', display:'none'}}>20자 까지 입력할 수 있습니다</div>
                    </div>                                        
                </div>

                <div className="Acc_regist_lv8-con-sec2">
                    <div className="Acc_regist_lv8-con-s2-title">수용 인원</div>
                    <div className="Acc_regist_lv8-con-s2-b1">
                        <button id="Ac_re_lv8_btn" className={`Acc_regist_lv8-con-s2-b1-d2-lb`} onClick={(e)=>{
                            e.stopPropagation()

                            regi_lv8_value.current.innerText = Number(regi_lv8_value.current.innerText)-1

                            if(regi_lv8_value.current.innerText==='0'){
                                e.target.disabled = true
                            }else{
                                const rb_btn = document.querySelector(`.Acc_regist_lv8-con-s2-b1-d2-rb`)
                                rb_btn.disabled=false
                                regi_lv8_s3_alert.current.style.display='none'
                                }
                                } 
                        }>-</button>

                        <div className="Acc_regist_lv8-con-s2-b1-d2-t1">
                            <span ref={regi_lv8_value} className="Acc_regist_lv8-con-s2-b1-d2_val">1</span>
                            <span>명</span>
                        </div>

                        <button id="Ac_re_lv8_btn" className={`Acc_regist_lv8-con-s2-b1-d2-rb`} onClick={(e)=>{
                            e.stopPropagation()
                            console.log('확인')
                            regi_lv8_value.current.innerText = Number(regi_lv8_value.current.innerText)+1

                                if(regi_lv8_value.current.innerText==='20'){
                                    e.target.disabled = true
                                    regi_lv8_s3_alert.current.style.display='block'
                                }else{
                                    const lb_btn = document.querySelector(`.Acc_regist_lv8-con-s2-b1-d2-lb`)
                                    lb_btn.disabled=false
     
                                }
                            }        
                        }>+</button>
                    </div>

                    <div className="Acc_regist_lv8-con-sec3" ref={regi_lv8_s3_alert} style={{display:'none'}}>20명 이상 수용되는 숙소는 저희 홈페이지에서 다루지 않습니다. <br></br> 그런건 호텔스 닷컴으로 가주세요;...</div>
                </div>


            </div>

            <div className="Acc_regist_lv8-footer">
                <Host_footer></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv8