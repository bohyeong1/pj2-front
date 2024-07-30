import React, {useRef,useState} from "react";
import './Acc_regist_lv3.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/UtilFunction";

function Acc_regist_lv3(){
    // console.log(default_data.d_base_facility)
    
    
    //  ref
    const categories = useRef([])        ///카테고리
    const regi_lv3_val = useRef([])



    // 선택된 카테고리의 data값 state
    const [sellectData, setSellectData] = useState([{},{},{},{}])

    const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터

    //현재 등록중인 숙소 데이터
    const registData = JSON.parse(sessionStorage.getItem('registData'))

    ///숙소 데이터 업데이트 패치
    async function fetchCategory(data){
        const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register/update`, 'PUT', 
        {seller : userData._id,
        _id : registData._id,
        base_facility : data
        }, localStorage.getItem('log'))
    } 
    
    ///프론트쪽 카테고리 선택
    function changeLv3Box(id){
        // e.stopPropagation()
        // console.log(categories.current[id])
        for(let i=0; i<default_data.d_base_facility.length; i++){
            if(i == id){
                categories.current[id].style.background = 'rgb(243, 243, 243)'
                categories.current[id].style.border = 'solid 2px black'
            }
            else{
                categories.current[i].style.background = 'white'
                categories.current[i].style.border = 'solid 2px rgb(180,180,180)'
            }
        }

        let sellec_base_facility = default_data.d_base_facility
        sellec_base_facility[id].counts = Number(regi_lv3_val.current[id].value) 
        setSellectData(sellec_base_facility)
    }

    console.log(sellectData)


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
                            <div className="Acc_regist_lv3-con-s1-box"  ref={(el)=>{categories.current[id]=el}} key={id}>
                                <div className="Acc_regist_lv3-con-s1-b1-d1">
                                    <img src={ele.url}/>
                                    <div className="Acc_regist_lv3-con-s1-box-tex1">{ele.name}</div>
                                </div>

                                <div className="Acc_regist_lv3-con-s1-b1-d2">
                                    <button id="Ac_re_lv3_btn" className={`Acc_regist_lv3-con-s1-b1-d2-lb${id}`} onClick={(e)=>{
                                            e.stopPropagation()
                                            regi_lv3_val.current[id].value = Number(regi_lv3_val.current[id].value)-1

                                        if(regi_lv3_val.current[id].value=== '0'){
                                            e.target.disabled = true
                                        }else{
                                            const rb_btn = document.querySelector(`.Acc_regist_lv3-con-s1-b1-d2-rb${id}`)
                                            rb_btn.disabled=false
                                        }

                                        changeLv3Box(id)    ///////인풋값 스테이트에 저장하기
                                        } 
                                    }>-</button>

                                    <div className="Acc_regist_lv3-con-s1-b1-d2-t1">
                                        <input ref={(el)=>{regi_lv3_val.current[id] = el}} type="text" value= '1' className="Acc_regist_lv3-con-s1-b1-d2_val"
                                        style={{padding:'0' , border:'none', fontSize:'1.2rem', width:'23px',height:'26px', display:'inline', background:'none'}}></input>
                                        <span style={{height:'28px'}}>개</span>
                                    </div>

                                    <button id="Ac_re_lv3_btn" className={`Acc_regist_lv3-con-s1-b1-d2-rb${id}`} onClick={(e)=>{
                                                e.stopPropagation()

                                                regi_lv3_val.current[id].value = Number(regi_lv3_val.current[id].value)+1

                                        if(regi_lv3_val.current[id].value==='30'){
                                            e.target.disabled = true
                                        }else{
                                            const lb_btn = document.querySelector(`.Acc_regist_lv3-con-s1-b1-d2-lb${id}`)
                                            lb_btn.disabled=false
                                        }
                                        changeLv3Box(id)    ///////인풋값 스테이트에 저장하기
                                        }        
                                    }>+</button>
                                </div>

                            </div>
                        )
                    })}                    
                </div>
            </div>

            <div className="Acc_regist_lv3-footer">
                <Host_footer fetchHandlerFun = {fetchCategory} dropData = {sellectData}></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv3



