import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import './MainApp.css'
import Lv1_description from "../lv1-description/Lv1-description";
import Lv2_description from "../lv2-description/Lv2-description";
import Lv3_description from "../lv3-description/Lv3-description";
import Lv4_description from "../lv4-description/Lv4-description";
import Main_menu from "../../../menu/main-menu/main-menu";
import Side_menu from "../../../menu/side-menu/side-menu";
import Search_menu from "../../../menu/search-menu/search-menu";
import Footer from "../../../menu/footer/Footer";
import connectData from "../../../utilData/Utildata";



function MainApp({city, log}){


  
    const [renderData,setRenderData] = useState()    

    useEffect(()=>{
        connectData('http://127.0.0.1:3700/api/common','POST')
        .then(result => {           
            setRenderData(result.accomodations)
        })
    },[])


    
    //메인화면 색션 필터 util 함수 /////관리자 페이지로 메인화면 출력 선택하게 옮기면 함수 일부 수정ㅇㅇ
    function sectionFilterData(data,value1,value2){                    ////////////value1 = key값 존재하는지 필터링, value2 = 키값에 해당하는 키워드 필터링 
        if(data){
            if(value1){
                if(value2){                    /////////////data, value1, value2 들어왔을때 -> 키값에 해당하는 키워드 필터링
                    const filteredData = data.filter((ele)=>{                      
                        if(Array.isArray(ele[value1])){
                            if(ele[value1].length===0){
                                return
                            }else{
                                const v_filteredData = ele[value1].filter((v_ele)=>{              /////////////value가 배열형태일때
                                    return v_ele.name === value2
                                })
                                return v_filteredData
                            }                            
                        }else{
                            return ele.value1 === value2                                       /////////////value가 string형태일때
                        }
                    })
                    return filteredData
                }else{                      /////////data, value1만 들어왔을때 -> key값 존재여부 필터링
                    const filteredData = data.filter((ele)=>{
                        return value1 in ele
                    })
                    return filteredData
                }
            }else{
                console.log('key와 property값을 입력해 주세요')
            }
        }else{
            console.log('데이터가 들어오지 않았습니다')
        }
    }

// console.log('전송받은 숙소 데이터 :', renderData)    

const imgurl ='http://www.cbiz.kr/news/photo/201907/16757_21366_1236.jpg'

const m_discount = sectionFilterData(renderData,'discount')          /////할인여부 분류
const m_eco = sectionFilterData(renderData,'keywords','가족여행')               //////친환경 분류

    return(
        <div className="mainApp">
            <div className="main-gnb">
                <Main_menu log={log}></Main_menu>
                <Search_menu></Search_menu>
                {/* <Side_menu></Side_menu> */}
            </div>
            <div className="main-content">
                <Lv1_description title={'국내 인기 여행지'} data = {city}></Lv1_description>
                {/* <Lv2_description title={'할인 해택 여행지'} data={m_discount}></Lv2_description> */}
                <Lv2_description title={'인기 추천 숙소'} data={renderData}></Lv2_description>
                <Lv2_description title={'가족여행 숙소'} data={renderData}></Lv2_description>
                <Lv4_description title={'친환경 숙소'} data={m_eco} imgurl = {imgurl}></Lv4_description>
                <Lv3_description title={'할인 이벤트'} data={renderData}></Lv3_description>
                <div>국내여행지</div>
            </div>
            <div className="main-footer">
                <Footer></Footer>
            </div>
        </div>

    )
}

export default MainApp