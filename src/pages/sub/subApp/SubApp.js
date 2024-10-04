import React, { useState, useRef } from "react";
import './SubApp.scss'
import Side_menu from "../../../utilComponent/menu/side-menu/side-menu";
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import SubList from "../subList/SubList";
import Footer from "../../../utilComponent/menu/footer/Footer";
import { pop_three_texts } from "../../../utilData/UtilFunction";
import Dropdown from "../../../utilComponent/material/dropdown_query_string/dropdown";
import Sub_modal from "../../../utilComponent/modal/mapModal/map-modal";

import useSubSubAppBusiness from "../hook-store/business-hooks/sub-subApp-business";
import useSubSubAppStyle from "../hook-store/style-hooks/sub-subApp-style";
import { state_store, reference_store } from "../../../utilData/UtilFunction";


function SubApp (){

    // console.log('렌더회수 체크')
    
    // =================================================
    // state //
    const [list, setList] = useState([]) 
    const [def_list, setDef_list] = useState([])
    const [current_page , setCurrent_page] = useState(1)
    const [total_count, setTotal_count] = useState(null)
    const [total_page, setTotal_page] = useState(null)
    const [count_number, setCount_number] = useState(10)
    const [search_keyword, setSearch_keyword] = useState(null)

    // =================================================
    // refs //
    const modal = useRef(null)

    // =================================================
    // hooks //
    // business
    const {city} = useSubSubAppBusiness(undefined, state_store([
        {
            'list':list,
            'setList':setList
        },
        {
            'def_list':def_list,
            'setDef_list':setDef_list
        },
        {
            'current_page':current_page,
            'setCurrent_page':setCurrent_page
        },
        {
            'total_count':total_count,
            'setTotal_count':setTotal_count
        },
        {
            'count_number':count_number,
            'setCount_number':setCount_number
        },
        {
            'total_page':total_page,
            'setTotal_page':setTotal_page
        },
        {
            'search_keyword':search_keyword,
            'setSearch_keyword':setSearch_keyword
        }
    ]))

    // style
    const {} = useSubSubAppStyle()  

    return(
        <div className="subApp">
            {/* sub modal => data 개수 페이지 네이션으로 잘라온 30개 기준 정렬 지도에 표시 */}
            <Sub_modal ref = {modal} city={city} data={list}></Sub_modal>
            <div className="subApp__menu-container">
                <Main_menu  data={search_keyword ? search_keyword : null} preview={true} scroll={false}></Main_menu>
            </div>
            <div className="sub-content">
                <div className="sub-content__filter-container">
                    <Side_menu modal={false} ref= {modal}></Side_menu>
                </div>
                <div className="sub-main-content">
                    <div className="sub-board">
                        <span className="sub-board__list-count">
                            {`'${city}' 숙소 ${total_count ? (String(total_count).length > 3 ? pop_three_texts(total_count) : total_count):'0'}개`}
                        </span>
                        <Dropdown></Dropdown>
                    </div>
                    <SubList data={list} total_count={total_count} count_number={count_number} current_page={current_page} setCurrent_page={setCurrent_page}
                    total_page = {total_page} modal={false}></SubList>
                </div>
            </div>
            <div className="sub-footer">
              <Footer></Footer>
            </div>
        </div>
    )
}

export default SubApp