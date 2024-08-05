import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import './SubList.css'
import Pagination from "react-js-pagination";
import default_data from "../../../utilData/defaultData";
import Static_img from "../../../picture/static-img/static-img";
import { pop_three_texts } from "../../../utilData/UtilFunction";

import { state_store, reference_store } from "../../../utilData/UtilFunction";
import useSubSubListBusiness from "../hook-store/business-hooks/sub-subList-business";
import useSubSubListStyle from "../hook-store/style-hooks/sub-subList-style";

function SubList({data}){

    // state
    const [pageData, setPageData] = useState(null)
    const [currentPage , setCurrentPage] = useState(1)
    const [total_count, setTotal_count] = useState(null)
    const [count_number, setCount_number] = useState(10)

    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // business
    // const {sellectPageData} = useSubSubListBusiness(data, state_store([
    //     {
    //         'pageData':pageData,
    //         'setPageData':setPageData
    //     },
    //     {
    //         'currentPage':currentPage,
    //         'setCurrentPage':setCurrentPage
    //     },
    //     {
    //         'total_count':total_count,
    //         'setTotal_count':setTotal_count
    //     },
    //     {
    //         'count_number':count_number,
    //         'setCount_number':setCount_number
    //     }
    // ]))

    // style
    const {} = useSubSubListStyle()

    return(
        <div className="sublist-container">
            {pageData?.map((ele, id)=>{
                // console.log(ele)
                let price
                if(String(ele.price).length > 3){
                    price = pop_three_texts(ele.price)
                }else{
                    price = ele.price
                } 

                return(
                    <NavLink to={`Detail_infoApp/${ele._id}`} className="sublist-list" key={id}>
                        <div className="list-img">
                            <Static_img url={ele.main_img}></Static_img>
                        </div>
                        <div className="list-text">
                            <div className="list-text-tex1">{`${ele.category.name}`}</div>
                            <div className="list-text-tex2">{ele.title}</div>
                            <div className="list-text-evaluation"><img style={{width:'20px', height:'20px'}} src={default_data.d_imgs.star}></img>
                                    {`${ele.avgEvaluation.length != 0 ? (ele.avgEvaluation.reduce((prev, cur) => {return prev + cur},0)/ele.avgEvaluation.length).toFixed(2) : 
                                    '미평가'}`}</div>
                            <div className="list-text-tex3">{ele.search_adress}</div>
                            <div className="list-text-tex4">
                                {ele?.keywords.map((el, id)=>{
                                    return(
                                        <span key={id}>{`${el.name}. `}</span>
                                    )
                                })}
                            </div>
                            <div className="list-text-tex5">
                                <span className="list-text-t5-b1">편의 시설</span>
                                <div className="list-text-t5-b2">
                                    {ele?.service_facility.map((el, id)=>{
                                        return(
                                            <span key={id}>{`${el.name}. `}</span>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="list-text-tex6">
                                <span>{price}</span>
                                <span>원</span>
                            </div>
                        </div>
                    </NavLink>
                )
            })
            }

            {/* <Pagination pageCount={pageCount} activePage={currentPage}  itemsCountPerPage={10}  pageRangeDisplayed={5} totalItemsCount={data?.length} 
                    onChange={sellectPageData}  prevPageText ={'<'} nextPageText={'>'} hideFirstLastPages={true}></Pagination> */}
        </div>
    )
}

export default SubList