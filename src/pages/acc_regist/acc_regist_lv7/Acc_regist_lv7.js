import React, {useRef, useState} from "react";
import './Acc_regist_lv7.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/Utildata";

function Acc_regist_lv7(){
    // 카테고리 ref
    const categories = useRef([])

    // 선택된 카테고리의 data값 state
    const [sellectData, setSellectData] = useState([])
    
    const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터
    
    ///숙소 데이터 업데이트 패치
    async function fetchCategory(data){
        const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register/update`, 'PUT', 
        {seller : userData._id,
        keywords : data
        }, localStorage.getItem('log'))
    } 

    ///프론트쪽 카테고리 선택
    function clickLv7Box(id){
        // e.stopPropagation()   
        const sellect_keywords = default_data.d_keyword[id] 
            
            if(categories.current[id].state){
                categories.current[id].state = false
                categories.current[id].style.background = 'white'
                categories.current[id].style.border = 'solid 2px rgb(180,180,180)'

                let prevData = sellectData
                // console.log('state값',sellectData)
                const index = sellectData.indexOf(sellect_keywords)
                prevData.splice(index,1)
                // console.log(prevData)
                setSellectData(prevData)
            }else{
                categories.current[id].state = true
                categories.current[id].style.background = 'rgb(243, 243, 243)'
                categories.current[id].style.border = 'solid 2px black'

                if(!sellectData.includes(sellect_keywords)){
                    let prevData = sellectData
                    prevData.push(sellect_keywords)
                    // console.log(prevData)
                    setSellectData(prevData)
                }else{
                    console.log('중복임')
                    return
                }  
            }
    }

    console.log(sellectData)

    

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
                            <div className="Acc_regist_lv7-con-s1-box" key={id} ref={(el)=>{categories.current[id]=el}} state={false} onClick={()=>{clickLv7Box(id)}}>
                                <img src={ele.url}/>
                                <div className="Acc_regist_lv7-con-s1-box-tex1">{ele.name}</div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>

            <div className="Acc_regist_lv7-footer">
                <Host_footer fetchHandlerFun = {fetchCategory} dropData = {sellectData}></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv7