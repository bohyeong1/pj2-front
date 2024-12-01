import { useSearchParams, NavLink } from "react-router-dom"
import { pop_three_texts } from '@/util/function/util_function';
import Dropdown from '@/util/component/material/dropdown_query_string/dropdown'
import './list_contents.scss'
import Pagination from "react-js-pagination";
import OriginalImg from "@/picture/original_img/original_img"
import default_data from "@/util/default_data/default_data";

function ListContents({data}){

    // =================================================
    // query sring //
    const [query_string] = useSearchParams()

    return (
        <div className="list-contents__container">
            <div className="list-contents__sub-board">
                <span className="list-contents__sub-board-list-count">
                    {`'${query_string.get('search-adress')}' 숙소 ${data.total_counts ? pop_three_texts(data.total_counts) : '0'}개`}
                </span>
                <Dropdown/>
            </div>

            <div className='list-contents__sublist-container'>
                {/* list */}
                {data.accomodations.length !== 0 ? 
                data.accomodations.map((el, id)=>{
                    return(
                        <NavLink 
                            to={`/detail/${el._id}`} 
                            className="list-contents__sublist-list" 
                            key={id}>
                            <div className="list-contents__list-img">
                                <OriginalImg url={el.main_img}/>
                            </div>
                            <div className="list-contents__list-text">
                                {/* 숙소분류 */}
                                <div className="list-contents__list-text-tex1">{`${el.category.name}`}</div>
                                {/* 제목 */}
                                <div className="list-contents__list-text-tex2">{el.title}</div>
                                {/* 숙소평가 */}
                                <div className="list-contents__list-text-evaluation">
                                    <div className="list-evaluation__star-box">
                                        <img src={default_data.d_imgs.star}></img>
                                        <span>{`${el.average ? el.average.toFixed(2) : '미평가'}`}</span>
                                    </div>
                                    <span>{`${el.counts_review !== 0 ? `${el.counts_review}명 평가` : ''}`}</span>
                                </div>
                                {/* 숙소주소 */}
                                <div className="list-contents__list-text-tex3">{el.search_adress}</div>
                                {/* 키워드 */}
            
                                <div className="list-contents__list-text-tex4">
                                    {el.keywords.map((ele, id)=>{
                                        return(
                                            <span key={id}>{`${ele.name}. `}</span>
                                        )
                                    })}
                                </div>
                                {/* 편의시설 */}
                                <div className="list-contents__list-text-tex5">
                                    <span className="list-contents__list-text-t5-b1">편의 시설</span>
                                    <div className="list-contents__list-text-t5-b2">
                                        {el?.service_facility.map((el, id)=>{
                                            return(
                                                <span key={id}>{`${el.name}. `}</span>
                                            )
                                        })}
                                    </div>
                                </div>
                                {/* 가격 */}
                                <div className="list-contents__list-text-tex6">
                                    <span>{pop_three_texts(el.price)}</span>
                                    <span>원</span>
                                </div>
                            </div>
                        </NavLink>
                    )}) : 
                    <span className="list-contents__sublist-list-no-data">등록된 숙소가 존재하지 않아요!</span>}

                <Pagination 
                    pageCount={data.total_pages} 
                    activePage={query_string.get('page')}  
                    itemsCountPerPage={query_string.get('limit')}  
                    pageRangeDisplayed={5} 
                    totalItemsCount={data.total_counts ? data.total_counts : 0} 
                    // onChange={sellectPageData}  
                    prevPageText ={'<'} 
                    nextPageText={'>'} 
                    hideFirstLastPages={true}/>
            </div>
        </div>
    )
}

export default ListContents