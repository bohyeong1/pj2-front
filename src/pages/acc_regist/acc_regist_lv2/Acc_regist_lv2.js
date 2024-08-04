import React,{useRef, useState} from "react";
import './Acc_regist_lv2.css'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/UtilFunction";

function Acc_regist_lv2(){

    // 카테고리 ref
    const categories = useRef([])

    // 선택된 카테고리의 data값 state
    const [sellectData, setSellectData] = useState(null)

    const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터
    //현재 등록중인 숙소 데이터
    const registData = JSON.parse(sessionStorage.getItem('registData'))

    ///숙소 데이터 업데이트 패치
    async function fetchCategory(data){
        const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register/update`, 'PUT', 
        {seller : userData._id,
        _id : registData._id,
        space_category : data
        }, localStorage.getItem('log'))
    } 
    
    ///프론트쪽 카테고리 선택
    function clickLv2Box(id){
        // e.stopPropagation()

        for(let i=0; i<default_data.d_house_space.length; i++){
            if(i == id){
                categories.current[id].style.background = 'rgb(243, 243, 243)'
                categories.current[id].style.border = 'solid 2px black'
            }
            else{
                categories.current[i].style.background = 'white'
                categories.current[i].style.border = 'solid 2px rgb(180,180,180)'
            }
        }
        setSellectData(default_data.d_house_space[id])
    }

    // console.log(sellectData)
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
                            <div className="Acc_regist_lv2-con-s1-box" ref={(el)=>{categories.current[id]=el}} key={id} onClick={()=>{clickLv2Box(id)}}>
                                <img src={ele.url}/>
                                <div className="Acc_regist_lv2-con-s1-box-tex1">{ele.name}</div>
                                <div className="Acc_regist_lv2-con-s1-box-tex2">{ele.text}</div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>

            <div className="Acc_regist_lv2-footer">
                <Host_footer fetchHandlerFun = {fetchCategory} dropData = {sellectData}></Host_footer>
            </div>

        </div>
    )
}

export default Acc_regist_lv2