import React,{useRef} from "react";
import './Host-footer.css'
import { useLocation } from "react-router-dom";
import LinkBtn from "../../Button/linkBtn/LinkBtn";
import default_data from "../../utilData/defaultData";

function Host_footer(){

    // const stepBar = useRef()       ////스탭바 ref

    const regist_step = default_data.regist_step
    const location = useLocation()
    const thisUrl = location.pathname.split('/')
    const thisStep = regist_step.indexOf(thisUrl[thisUrl.length-1])       //////현재 페이지 등록 단계의 인덱스
    console.log(regist_step.indexOf(thisUrl[thisUrl.length-1]) )

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


    ////////////////////////////////절차 단계를 나타내는 state bar 애니메이션
    function stateBarAni(){
        console.log('확인')
        // const stepBar = document.querySelector('.host_footer-con-s1-bar')
        // stepBar.style.width = `${thisStep/(regist_step.length - 1)*100}%`
    }
    stateBarAni()


    return(
        <div className="Host_footer-container">
            <div className="host_footer-con-sec1">
                <div className="host_footer-con-s1-bar">1</div>
            </div>
            <div className="host_footer-con-sec2">
                <LinkBtn text='이전' url={prevUrl}></LinkBtn>
                <LinkBtn text='다음' url={nextUrl}></LinkBtn>
            </div>

        </div>
    )

}
export default Host_footer