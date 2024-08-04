import React,{useRef} from "react";
import './Host-footer.css'
import { useLocation} from "react-router-dom";
import LinkBtn from "../../Button/linkBtn/LinkBtn";
import default_data from "../../../utilData/defaultData";

function Host_footer({fetchHandlerFun, dropData}){


    // console.log(fetchHandlerFun, dropData)

    const regist_step = default_data.regist_step
    const location = useLocation()
    const thisUrl = location.pathname.split('/')
    const thisStep = regist_step.indexOf(thisUrl[thisUrl.length-1])       //////현재 페이지 등록 단계의 인덱스
    const stepOfPercent = ((thisStep +1)/ regist_step.length).toFixed(2)

    // console.log(stepOfPercent)

    /////////이전 페이지 url 리턴 함수
    function createPrevUrl(index){
        if(index === 0){
            return false
        }else{
            return regist_step[index-1]
        }
    }

    //////////다음 페이지 url 리턴 함수
    function createNextUrl(index){
        if(index === regist_step.length-1){
            return false
        }else{
            return regist_step[index+1]
        }
    }

    const prevUrl = createPrevUrl(thisStep)
    const nextUrl = createNextUrl(thisStep)



    return(
        <div className="Host_footer-container">
            <div className="host_footer-con-sec1">
                <div className="host_footer-con-s1-bar" style={{width : `${100 * stepOfPercent}%`}}></div>
            </div>
            <div className="host_footer-con-sec2">
                <LinkBtn text='이전' url={prevUrl}></LinkBtn>
                <LinkBtn text='다음' url={nextUrl} fetchHandlerFun = {fetchHandlerFun} dropData={dropData} index = {thisStep}></LinkBtn>
            </div>

        </div>
    )

}
export default Host_footer