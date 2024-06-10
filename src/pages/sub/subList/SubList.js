import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import './SubList.css'
import Detail from "../../../picture/detail/Detail";
import Pagination from "react-js-pagination";

function SubList({data}){

    const [pageData, setPageData] = useState()
    const [currentPage , setCurrentPage] = useState()
    const [pageCount, setPageCount] = useState()


    useEffect(()=>{
        if(data){
            setPageData(data.slice(0,6))   //한페이지 출력하는 data개수
            setCurrentPage(1)                  ///초기 렌더링시 디폴트 페이지 넘버
            setPageCount(Math.ceil(data.length / 6)) //총페이지 개수
        }
    },[data])

    function sellectPageData(e){      
        // console.log(e)
        const startIndex = (e-1)*6
        const finishIndex = startIndex + 6 
        setCurrentPage(e)
        setPageData(data.slice(startIndex,finishIndex))           ///////화면에 보여주는 페이지
    }
  
    // console.log(pageData)

    return(
        <div className="sublist-container">
            {pageData?.map((ele, id)=>{
                // console.log(ele._id)
                return(
                    <NavLink to={`Detail_infoApp/${ele._id}`} className="sublist-list" key={id}>
                        <div className="list-img">
                            <Detail data={ele}></Detail>
                        </div>
                        <div className="list-text">
                            <div className="list-text-tex1">{`${ele.category.name}`}</div>
                            <div className="list-text-tex2">{ele.title}</div>
                            <div className="list-text-tex3">{ele.search_adress}</div>
                            <div className="list-text-tex4">
                                {ele?.keywords.map((el)=>{
                                    return(
                                        <span>{`${el.name}. `}</span>
                                    )
                                })}
                            </div>
                            <div className="list-text-tex5">
                                <span className="list-text-t5-b1">편의 시설</span>
                                <div className="list-text-t5-b2">
                                    {ele?.service_facility.map((el)=>{
                                        return(
                                            <span>{`${el.name}. `}</span>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="list-text-tex6">{`${ele.price}원`}</div>
                        </div>
                    </NavLink>
                )
            })
            }

            <Pagination pageCount={pageCount} activePage={currentPage}  itemsCountPerPage={6}  pageRangeDisplayed={5} totalItemsCount={data?.length} 
                    onChange={sellectPageData}  prevPageText ={'<'} nextPageText={'>'} hideFirstLastPages={true}></Pagination>
        </div>
    )
}

export default SubList