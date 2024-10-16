import {useState,useEffect} from "react";
import './detail_section4.scss'
import Pagination from "react-js-pagination";
import default_data from "@/util/default_data/default_data";
import ReplyModal from "@/utilComponent/modal/replyModal/ReplyModal";
import { get_date_difference, transform_date, state_store } from "@/util/function/util_function";
import useDetailSection4Style from "../../../hook_store/style_hooks/detail_section4_style";

function DetailSection4({evaluations, role}){

    const [page_data, setPage_data] = useState([])
    const [current_page , setCurrent_page] = useState(null)
    const [page_count, setPage_count] = useState(null)
    const [reply_modal_state, setReply_modal_state] = useState(false)
    const [sellect_data, setSellect_data] = useState()

    const {sellect_page_data, reply_modal_stateState, click_reply, get_collect_value} = useDetailSection4Style(undefined, 
                                                                                            state_store([
                                                                                                {
                                                                                                    'page_data' : page_data,
                                                                                                    'setPage_data' : setPage_data
                                                                                                },
                                                                                                {
                                                                                                    'current_page' : current_page,
                                                                                                    'setCurrent_page' : setCurrent_page
                                                                                                },
                                                                                                {
                                                                                                    'page_count' : page_count,
                                                                                                    'setPage_count' : setPage_count
                                                                                                },
                                                                                                {
                                                                                                    'reply_modal_state' : reply_modal_state,
                                                                                                    'setReply_modal_state' : setReply_modal_state
                                                                                                },
                                                                                                {
                                                                                                    'sellect_data' : sellect_data,
                                                                                                    'setSellect_data' : setSellect_data
                                                                                                }
                                                                                            ]),
                                                                                            undefined,
                                                                                            {
                                                                                                evaluations : evaluations
                                                                                            }
                                                                                        )

    return(
        <div className="detail-section4__container">
            {/* title */}
            <div className="detail-section4__container-section1">
                <div className="detail-section4__container-section1-title">
                    <span>댓글 목록</span>
                </div>
                <div className="detail-section4__container-section1-sub-title">
                    <span>{`${evaluations?.total_counts ? evaluations.total_counts : 0}명 평가`}</span>
                </div>
            </div>

            <div className="detail-section4__container-section2">
                {/* 댓글목록 */}
                <div className="detail-section4__container-section2-part1">
                    {page_data ?
                    page_data?.map((el, id)=>{
                        return(
                            <div className="detail-section4__container-section2-part1-content"
                                 key={id}>
                                {/* user data */}
                                <div className="detail-section4__container-section2-part1-user">
                                    <img className="detail-section4__user-img" 
                                         src={el.user_information[0].profileImg ? el.user_information[0].profileImg : undefined}
                                         style={{backgroundColor : el.user_information[0].profileImg ? undefined : el.user_information[0].defaultProfile}}/>
                                    <div className="detail-section4__user-text">
                                        <span>{el.user_information[0].name}</span>
                                        <span>보형짱닷컴 가입 기간 {get_date_difference(el.user_information[0].createAt)}</span>
                                    </div>
                                </div>
                                <div className="detail-section4__user-evaluation">
                                    <div className="detail-section4__star-box">
                                        <img src={default_data.d_imgs.star}/>
                                        <span>{get_collect_value(el.evaluation, 'avgGrade').toFixed(2)}</span>
                                    </div>   
                                    <span>
                                        {transform_date(el.createAt)}
                                    </span>
                                </div>
                                <div className="detail-section4__container-section2-part1-reply-box">
                                    <pre readOnly 
                                         className="detail-section4__container-section2-part1-reply">
                                        {el.text}
                                    </pre>
                                    <div>
                                        <button className="detail-section4__container-section2-part1-button" 
                                                onClick={()=>{click_reply(el)}}>
                                                    자세히 보기
                                        </button>
                                    </div>
                                </div>   
                            </div>
                        )
                    }) : 
                    <span>숙소를 평가한 인원이 없습니다.</span>}
                </div>
                {/* pagenation */}
                <div className="detail-section4__container-section2-part2">
                    {page_data.length &&
                    <Pagination page_count={page_count} 
                                activePage={current_page}  
                                itemsCountPerPage={6}  
                                pageRangeDisplayed={5} 
                                totalItemsCount={page_data.length} 
                                onChange={sellect_page_data}  
                                prevPageText ={'<'} 
                                nextPageText={'>'} 
                                hideFirstLastPages={true}/>}
                </div>
            </div>
            {/* 모달 */}
            <ReplyModal replyModal={reply_modal_state} 
                        replyModalState={reply_modal_stateState} 
                        data={sellect_data}/>
        </div>
    )
}

export default DetailSection4