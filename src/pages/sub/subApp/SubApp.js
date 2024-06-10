import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import './SubApp.css'
import Side_menu from "../../../menu/side-menu/side-menu";
import Main_menu from "../../../menu/main-menu/main-menu";
import Search from "../../../menu/search-menu/search/Search";
import SubList from "../subList/SubList";
import Footer from "../../../menu/footer/Footer";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/Utildata"

function SubApp (){
    const params = useParams()              //파라미터
    const [SearchParams, setSearchParams] = useSearchParams()


    const [list, setList] = useState([])   //////////지역 필터 데이터
    const [def_list, setDef_list] = useState([])
    const [search_tg_state,setSearch_tg_state] = useState(null)


    ///쿼리스트링 키값 조회 함수    
    const keyInv = []
    for(const key of SearchParams.keys()){
        if(!keyInv.includes(key)){
            keyInv.push(key)
        }
    }

    ////서버로 보내는 쿼리 데이터 생성 for문
    const finalKey = {}              ///스테이트로 뺄까말까 추후 고려사항/랜더링 너무 많아질듯
    for(const value of keyInv){
        if(value === 'discount'){
            finalKey[value] = {$exists:true}
        }
        else if(value === 'price'){
            if(SearchParams.get(value).includes('%')){
                finalKey[value] = {$gt:SearchParams.get(value).split('%')[0]}
            }else{
                finalKey[value] = {$lt:SearchParams.get(value)}
            }
        }
        else if(value === 'capacity'){
            finalKey[value] = {$gte:SearchParams.get(value)}
        }
        else{
            finalKey[`${value}.name`] = {$all:SearchParams.getAll(value)}
        }       
    }


    console.log(finalKey)

    useEffect(()=>{
        connectData(`${default_data.d_base_url}/api/common`,'POST',{query:finalKey})
        .then(result => {
            const filteredData = result.accomodations.filter((ele)=>{
            const cityParam = params.city
            return ele.search_adress === cityParam
            })
            setList(filteredData)
        })
    },[SearchParams.toString(),params.city])


    /////////////초기 디폴트 숙소 데이터(서치 메뉴에 필요함 ㅇㅇ)
    useEffect(()=>{
        connectData('http://127.0.0.1:3700/api/common','POST')
        .then(result => {
            setDef_list(result.accomodations)
        })      

    },[])


    // tg_value={search_tg_state}
    // onClick={search_toggle}
    return(
        <div className="subApp">
            <Main_menu></Main_menu>
            <div className="sub-content">
                <Side_menu default_data={default_data}></Side_menu>
                <div className="sub-main-content">
                    <Search data={def_list} shadow={false} subtitle={false}></Search>
                    <SubList data={list}></SubList>
                </div>
            </div>
            <div className="sub-footer">
              <Footer></Footer>
            </div>

        </div>
    )
}

export default SubApp