import React, {useRef, useState} from "react";
import './Acc_regist_lv9.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/UtilFunction";

function Acc_regist_lv9(){

    const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터
    //현재 등록중인 숙소 데이터
    const registData = JSON.parse(sessionStorage.getItem('registData'))


    // text 상태 div Ref
    const ac_regi_lv9_stringstate = useRef()  ///글자개수
    const ac_regi_lv9_alert = useRef()          ///경고 text
    const ac_regi_lv9_input = useRef()


    // 선택된 카테고리의 data값 state
    const [sellectData, setSellectData] = useState()


    ////////////////////디바운싱
    function debounce(func, delay) {
        let timer;
        return function() {
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        }
    }

    //////////////////타이틀 스테이트값 1초 디바운스 한후에 스테이트에 담기 ㅇㅇ
    function handleFn(){
        setSellectData(ac_regi_lv9_input.current.value)
    }
    const debounceSetTitle = debounce(handleFn,1000)

    function lv8TextInputChange(){
        const length = ac_regi_lv9_input.current.value.length
        ac_regi_lv9_stringstate.current.innerText = `${length}/400`
        if(length>400){
            ac_regi_lv9_alert.current.style.display = 'block'
        }else{
            ac_regi_lv9_alert.current.style.display = 'none'
            debounceSetTitle()
        }
    }

    console.log(sellectData)


    ///숙소 데이터 업데이트 패치
    async function fetchCategory(data){

        const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register/update`, 'PUT', 
        {seller : userData._id,
        _id : registData._id,
        summary : data
        }, localStorage.getItem('log'))
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
                        <textarea  className="Acc_regist_lv9-con-s1-b1-t1" ref={ac_regi_lv9_input} type='text' spellCheck={false} style={{width:'100%', boxSizing:'border-box', height:'100%', 
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
                <Host_footer fetchHandlerFun = {fetchCategory} dropData = {sellectData}></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv9