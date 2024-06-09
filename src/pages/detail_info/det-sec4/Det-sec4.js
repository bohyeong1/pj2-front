import React, {useState,useEffect} from "react";
import './Det-sec4.css'
import Pagination from "react-js-pagination";

// 모달
import ReplyModal from "../../../modal/replyModal/ReplyModal";

function Det_sec4({data, replyModalState}){

    const [pageData, setPageData] = useState()
    const [currentPage , setCurrentPage] = useState()
    const [pageCount, setPageCount] = useState()

    const [replyModal, setReplyModal] = useState(false) //댓글 모달 상태값
    const [sellectUser, setSellecUser] = useState() //선택된 유저



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

        //댓글 모달 껏다 키기
        function replyModalState(){
            setReplyModal(!replyModal)
        }

    function clickDisplayReply(data){
        setSellecUser(data)
        replyModalState()
    }

    return(
        <div className="Det_sec4-container">
            <div className="Det_sec4-con-sec1">
                <div className="Det_sec4-con-s1-title">리뷰 목록</div>
                <div className="Det_sec4-con-s1-subtitle">{`${data?.length}개`}</div>
            </div>


            {/* 댓글목록 */}
            <div className="Det_sec4-con-sec2">
                <div className="Det_sec4-con-s2-b1">
                    {pageData?.map((el)=>{
                        return(
                            <div className="Det_sec4-con-s2-b1-content">
                                <div className="Det_sec4-con-s2-b1-logimg">
                                    <img className="Det_sec4-imgBox"></img>
                                    <div className="Det_sec4-evaluation">평점</div>
                                </div>
                                <textarea readOnly className="Det_sec4-con-s2-b1-reply" value={`${el.text}`}>
                                    
                                </textarea>    
                                <div>
                                    <button className="Det_sec4-con-s2-b1-btn" onClick={()=>{clickDisplayReply(el)}}>자세히 보기</button>
                                </div>

                            </div>
                        )
                    })}
                </div>


                <div className="Det_sec4-con-s2-b2">
                    <Pagination pageCount={pageCount} activePage={currentPage}  itemsCountPerPage={6}  pageRangeDisplayed={5} totalItemsCount={data?.length} 
                    onChange={sellectPageData}  prevPageText ={'<'} nextPageText={'>'} hideFirstLastPages={true}
                    ></Pagination>
                </div>

            </div>
                    {/* 모달 */}
            <ReplyModal replyModal={replyModal} replyModalState={replyModalState} data={sellectUser}></ReplyModal>
        </div>
    )
}

export default Det_sec4