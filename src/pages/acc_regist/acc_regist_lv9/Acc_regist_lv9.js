import React, {useRef, useState} from "react";
import './Acc_regist_lv9.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";

function Acc_regist_lv9(){

    // alert text 스테이트
    const [lv9TextState, Lv9TextState] = useState(false)




    // text 상태 div Ref
    const ac_regi_lv9_stringstate = useRef()  ///글자개수
    const ac_regi_lv9_alert = useRef()          ///경고 text
    const ac_regi_lv9_input = useRef()


    function lv8TextInputChange(){
        const length = ac_regi_lv9_input.current.value.length
        ac_regi_lv9_stringstate.current.innerText = `${length}/400`
        if(length>400){
            ac_regi_lv9_alert.current.style.display = 'block'
        }else{
            ac_regi_lv9_alert.current.style.display = 'none'
        }

    }

    return(
        <div className="Acc_regist_lv9-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv9_content">
                <div className="Acc_regist_lv9-con-title">
                숙소를 설명하는 글을 작성해 주세요! 
                    <div className="Acc_regist_lv9-con-subtitle">최대 400자 까지 작성 가능합니다</div> 
                </div>

                <div className="Acc_regist_lv9-con-sec1">
                    <form className="Acc_regist_lv9-con-s1-b1">
                        <textarea  className="Acc_regist_lv9-con-s1-b1-t1" ref={ac_regi_lv9_input} type='text' style={{width:'100%', boxSizing:'border-box', height:'100%', 
                        textAlign : 'top', padding : '10px', fontSize : '1rem', lineHeight:'1.5rem'}} placeHolder='숙소를 설명하는 글을 작성해주세요!'  onChange={lv8TextInputChange}></textarea >
                        <input  className="Acc_regist_lv9-con-s1-b1-t2" type='submit' style={{display:'none'}}></input>
                    </form>

                    <div className="Acc_regist_lv9-con-s1-b2">
                        <div ref={ac_regi_lv9_stringstate} className="Acc_regist_lv9-con-s1-b2-t1">0/400</div>
                        <div ref={ac_regi_lv9_alert} className="Acc_regist_lv9-con-s1-b2-t2" style={{color:'red', display:'none'}}>400자 까지 입력할 수 있습니다</div>
                    </div>
                    
                </div>
            </div>

            <div className="Acc_regist_lv9-footer">
                <Host_footer></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv9