import React,{useRef,useState} from "react";
import './Acc_regist_lv4.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/Utildata";

function Acc_regist_lv4(){


        // 카테고리 ref
        const categories = useRef([])

        // 선택된 카테고리의 data값 state
        const [sellectData, setSellectData] = useState([])
    
        const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터
    
        ///숙소 데이터 업데이트 패치
        async function fetchCategory(data){
            const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register/update`, 'PUT', 
            {seller : userData._id,
            service_facility : data
            }, localStorage.getItem('log'))
    
        } 
        
        ///프론트쪽 카테고리 선택
        function clickLv4Box(id){
            // e.stopPropagation()   

            const sellect_service_facility = default_data.d_service_facility_icon[id] 
            
                if(categories.current[id].state){
                    categories.current[id].state = false
                    categories.current[id].style.background = 'white'
                    categories.current[id].style.border = 'solid 2px rgb(180,180,180)'

                    let prevData = sellectData
                    // console.log('state값',sellectData)
                    const index = sellectData.indexOf(sellect_service_facility)
                    prevData.splice(index,1)
                    // console.log(prevData)
                    setSellectData(prevData)
                }else{
                    categories.current[id].state = true
                    categories.current[id].style.background = 'rgb(243, 243, 243)'
                    categories.current[id].style.border = 'solid 2px black'

                    if(!sellectData.includes(sellect_service_facility)){
                        let prevData = sellectData
                        prevData.push(sellect_service_facility)
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
        <div className="Acc_regist_lv4-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv4_content">
                <div className="Acc_regist_lv4-con-title">
                    숙소에서 사용가능한 서비스 시설을 <br></br> 선택해 주세요!
                </div>
                <div className="Acc_regist_lv4-con-sec1">
                    {default_data.d_service_facility_icon.map((ele,id)=>{
                        return(
                            <div className="Acc_regist_lv4-con-s1-box" ref={(el)=>{categories.current[id]=el}} state={false} onClick={()=>{clickLv4Box(id)}} key={id}>
                                <img src={ele.url}/>
                                <div className="Acc_regist_lv4-con-s1-box-tex1">{ele.name}</div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>

            <div className="Acc_regist_lv4-footer">
                <Host_footer fetchHandlerFun = {fetchCategory} dropData = {sellectData}></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv4