import React from "react";
import { NavLink } from "react-router-dom";
import './SubList.css'
import Pagination from "react-js-pagination";
import default_data from "../../../utilData/defaultData";
import Static_img from "../../../picture/static-img/static-img";
import { pop_three_texts } from "../../../utilData/UtilFunction";

// import { state_store, reference_store } from "../../../utilData/UtilFunction";
import useSubSubListBusiness from "../hook-store/business-hooks/sub-subList-business";
import useSubSubListStyle from "../hook-store/style-hooks/sub-subList-style";

import '../../../reponsibe-style-scss/subApp/subList.scss'


function SubList({data, current_page, setCurrent_page, total_count, count_number, total_page, modal, city}){

    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // business

    const {sellectPageData} = useSubSubListBusiness(data,undefined, undefined,
        {
            'current_page':current_page,
            'setCurrent_page':setCurrent_page
        }
    )   

    // style
    const {modal_list_click, modal_list_hover,modal_list_out,map_state} = useSubSubListStyle()

    return(
        <div className={`sublist-container ${modal ? 'sublist-modal__active' : null}`}>
            {/* 숙소 대분류 */}
            {modal ? 
            <div className="sublist__city-title">{`'${city}' 숙소 검색 결과`}</div>:null}

            {/* list */}
            {data ? data.length !== 0 ?  data.map((ele, id)=>{

                let price
                if(String(ele.price).length > 3){
                    price = pop_three_texts(ele.price)
                }else{
                    price = ele.price
                } 

                return(
                    !modal ? 
                    ///////////////////////////////////////////////
                    //////////////// 일반 창 레이아웃 //////////////
                    ///////////////////////////////////////////////
                    <NavLink to={`Detail_info_app/${ele._id}`} className="sublist-list" key={id}>
                        <div className="list-img">
                            <Static_img url={ele.main_img}></Static_img>
                        </div>
                        <div className="list-text">
                            {/* 숙소분류 */}
                            <div className="list-text-tex1">{`${ele.category.name}`}</div>
                            {/* 제목 */}
                            <div className="list-text-tex2">{ele.title}</div>
                            {/* 숙소평가 */}
                            <div className="list-text-evaluation">
                                <div className="list-evaluation__star-box">
                                    <img src={default_data.d_imgs.star}></img>
                                    <span>{`${ele.average ? ele.average.toFixed(2) : '미평가'}`}</span>
                                </div>
                                <span>{`${ele.counts_review !== 0 ? `${ele.counts_review}명 평가` : ''}`}</span>
                            </div>
                            {/* 숙소주소 */}
                            <div className="list-text-tex3">{ele.search_adress}</div>
                            {/* 키워드 */}
          
                            <div className="list-text-tex4">
                                {ele?.keywords.map((el, id)=>{
                                    return(
                                        <span key={id}>{`${el.name}. `}</span>
                                    )
                                })}
                            </div>
                            {/* 편의시설 */}
                            {!modal ?
                            <div className="list-text-tex5">
                                <span className="list-text-t5-b1">편의 시설</span>
                                <div className="list-text-t5-b2">
                                    {ele?.service_facility.map((el, id)=>{
                                        return(
                                            <span key={id}>{`${el.name}. `}</span>
                                        )
                                    })}
                                </div>
                            </div> : null}
                            {/* 가격 */}
                            <div className="list-text-tex6">
                                <span>{price}</span>
                                <span>원</span>
                            </div>
                        </div>
                    </NavLink> :

                    ///////////////////////////////////////////////
                    //////////////// 모달 창 레이아웃 //////////////
                    ///////////////////////////////////////////////
                    <div className={`sublist-list ${map_state[ele._id] === ele._id ? 'sublist-list__active': ''}`} key={id} data-key = {ele._id} 
                    onClick={modal_list_click} onMouseEnter={modal_list_hover} onMouseLeave={modal_list_out}> 
                        <div className="list-img">
                            <Static_img url={ele.main_img}></Static_img>
                        </div>
                        <div className="list-text">
                            {/* 숙소분류 */}
                            <div className="list-text-tex1">{`${ele.category.name}`}</div>
                            {/* 제목 */}
                            <div className="list-text-tex2">{ele.title}</div>
                            {/* 숙소평가 */}
                            <div className="list-text-evaluation">
                                <div className="list-evaluation__star-box">
                                    <img src={default_data.d_imgs.star}></img>
                                    <span>{`${ele.average ? ele.average.toFixed(2) : '미평가'}`}</span>
                                </div>
                                <span>{`${ele.counts_review !== 0 ? `${ele.counts_review}명 평가` : ''}`}</span>
                            </div>
                            {/* 숙소주소 */}
                            <div className="list-text-tex3">{ele.search_adress}</div>
                            {/* 키워드 */}
          
                            <div className="list-text-tex4">
                                {ele?.keywords.map((el, id)=>{
                                    return(
                                        <span key={id}>{`${el.name}. `}</span>
                                    )
                                })}
                            </div>
                            {/* 편의시설 */}
                            {!modal ?
                            <div className="list-text-tex5">
                                <span className="list-text-t5-b1">편의 시설</span>
                                <div className="list-text-t5-b2">
                                    {ele?.service_facility.map((el, id)=>{
                                        return(
                                            <span key={id}>{`${el.name}. `}</span>
                                        )
                                    })}
                                </div>
                            </div> : null}
                            {/* 가격 */}
                            <div className="list-text-tex6">
                                <span>{price}</span>
                                <span>원</span>
                            </div>
                        </div>
                    </div>
                )
            })
            :<span className="sublist-list_no-data">등록된 숙소가 존재하지 않아요!</span> :null}

            {!modal ?
            <Pagination pageCount={total_page} activePage={current_page}  itemsCountPerPage={count_number}  pageRangeDisplayed={5} totalItemsCount={total_count ? total_count : 0} 
                    onChange={sellectPageData}  prevPageText ={'<'} nextPageText={'>'} hideFirstLastPages={true}></Pagination> : null}
        </div>
    )
}

export default SubList