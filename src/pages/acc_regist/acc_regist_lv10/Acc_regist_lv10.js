import React,{useRef,useState} from "react";
import './Acc_regist_lv10.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/Utildata";

function Acc_regist_lv10(){
    // ref
    const regi_lv10_s1_alert = useRef()
    const regi_lv10_value = useRef()
    const addRulesRef = useRef() ///추가규칙

    // 카테고리 ref
    const categories = useRef()

    // 선택된 카테고리의 data값 state
    const [sellectData, setSellectData] = useState(default_data.home_rules)
        
    const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터

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
        let copiedData = sellectData
        copiedData[copiedData.length-1].summary = addRulesRef.current.value
        copiedData[copiedData.length-1].state = true
        setSellectData(copiedData)
    }
    const debounceSetRule = debounce(handleFn,1000)   

        
    ///숙소 데이터 업데이트 패치
    async function fetchCategory(data){
        const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register/update`, 'PUT', 
        {seller : userData._id,
        rules : data
        }, localStorage.getItem('log'))
        
    } 

    // 추가규칙 
    function changeAddRule(){      
        debounceSetRule()
    }

    console.log(sellectData)
    return(
        <div className="Acc_regist_lv10-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv10_content">
                <div className="Acc_regist_lv10-con-title">
                    숙소 이용규칙을 선택해 주세요
                </div>

                <div className="Acc_regist_lv10-con-sec1">
                    {default_data.home_rules.map((ele,id)=>{
                        if(id === 0){
                            return(
                                <div key={id} style={{borderBottom:`${id != (default_data.home_rules.length-1)?'solid 1px black':''}`}} className={`Acc_regist_lv10-con-s1-b${id}`}
                                 id="Acc_regist_lv10-con-s1-b">
                                    <div className={`Acc_regist_lv10-con-s1-b${id}-d1`}>{ele.text}</div>
                                    <div className={`Acc_regist_lv10-con-s1-b${id}-d2`}>
                                        <div className={`Acc_regist_lv10-con-s1-b${id}-d2-t1`}>동반 가능한 반려 동물 수</div>
                                        <div className={`Acc_regist_lv10-con-s1-b${id}-d2-t2`} style={{display: 'flex', width: '100%', gap:'30px', alignItems: 'center'}}>

                                        <button id="Ac_re_lv10_btn" className={`Acc_regist_lv10-con-s2-b1-d2-lb`} onClick={(e)=>{
                                            e.stopPropagation()

                                            regi_lv10_value.current.innerText = Number(regi_lv10_value.current.innerText)-1

                                            if(regi_lv10_value.current.innerText==='0'){
                                                e.target.disabled = true
                                            }else{
                                                const rb_btn = document.querySelector(`.Acc_regist_lv10-con-s2-b1-d2-rb`)
                                                rb_btn.disabled=false
                                                }

                                                let copiedData = sellectData
                                                copiedData[0].count = regi_lv10_value.current.innerText
                                                copiedData[0].state = true
                                                setSellectData(copiedData)
                                                
                                                } 
                                            }>-</button>

                                            <div className="Acc_regist_lv10-con-s2-b1-d2-t1">
                                                <span ref={regi_lv10_value} className="Acc_regist_lv10-con-s2-b1-d2_val">1</span>
                                                <span>마리</span>
                                            </div>

                                            <button id="Ac_re_lv10_btn" className={`Acc_regist_lv10-con-s2-b1-d2-rb`} onClick={(e)=>{
                                                e.stopPropagation()
                                                regi_lv10_value.current.innerText = Number(regi_lv10_value.current.innerText)+1

                                                if(regi_lv10_value.current.innerText==='5'){
                                                    e.target.disabled = true
                                                }else{
                                                    const lb_btn = document.querySelector(`.Acc_regist_lv10-con-s2-b1-d2-lb`)
                                                    lb_btn.disabled=false                    
                                                }

                                                let copiedData = sellectData
                                                copiedData[0].count = regi_lv10_value.current.innerText
                                                copiedData[0].state = true
                                                setSellectData(copiedData)

                                            }        
                                            }>+</button>

                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else if(id === default_data.home_rules.length-1){
                            return(
                                <div key={id} style={{borderBottom:`${id != (default_data.home_rules.length-1)?'solid 1px black':''}`}} className={`Acc_regist_lv10-con-s1-b${id}`}
                                id="Acc_regist_lv10-con-s1-b">
                                   <div className={`Acc_regist_lv10-con-s1-b${id}-d1`}>{ele.text}</div>
                                   <div className={`Acc_regist_lv10-con-s1-b${id}-d2`}>
                                       <textarea className={`Acc_regist_lv10-con-s1-b${id}-d2-t1`} ref={addRulesRef} placeholder='추가 규칙을 작성해 주세요!' onChange={changeAddRule}></textarea>
                                       <button className={`Acc_regist_lv10-con-s1-b${id}-d2-t2`}>등록</button>
                                   </div>
                               </div>
                            )
                        }
                        else{
                            return(
                                <div key={id} style={{borderBottom:`${id != (default_data.home_rules.length-1)?'solid 1px black':''}`}} className={`Acc_regist_lv10-con-s1-b${id}`}
                                 id="Acc_regist_lv10-con-s1-b">
                                    <div className={`Acc_regist_lv10-con-s1-b${id}-d1`}>{ele.text}</div>
                                </div>
                            )
                        }

                    })}
                    
                </div>
            </div>

            <div className="Acc_regist_lv10-footer">
                <Host_footer fetchHandlerFun = {fetchCategory} dropData = {sellectData}></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv10