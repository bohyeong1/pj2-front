import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Footer.css'
import default_data from "../../utilData/defaultData";

function Footer(){

    const navigator = useNavigate()

    return(
        <div className="footer-container">
            <div className="footer-con-sec1">
                <div className="footer-con-s1-b1">
                    <div className="footer-con-s1-b1-header">
                        <div className="footer-con-s1-b1-h-t1">고객센터</div>
                        <div className="footer-con-s1-b1-h-t2">오전 9시 ~ 오후 6시(학원에 있는 시간)</div>
                    </div>
                    <div className="footer-con-s1-b1-sub">
                        <div className="footer-con-s1-b1-sub-t1">
                            <img style={{height:'20px'}} src={default_data.d_imgs.telephone}></img>
                            010-5508-6125</div>
                        <div className="footer-con-s1-b1-sub-t2">개인 전번이에요. 장난전화 ㄴㄴ</div>
                    </div>
                </div>
                <div className="footer-con-s1-b2">
                    <div className="footer-con-s1-b2-p1">
                        <div>제작자</div>
                        <div className="footer-con-s1-b2-p1-container">
                            <div className="footer-link-to-terms"  onClick={()=>{navigator('/Terms_creator')}}>제작자 소개</div>
                            <div className="footer-link-to-terms"  onClick={()=>{navigator('/Terms_library')}}>사용 라이브러리</div>
                        </div>


                    </div>
                    <div className="footer-con-s1-b2-p1">
                        <div>이용약관</div>
                            <div className="footer-con-s1-b2-p1-container">
                                <div className="footer-link-to-terms"  onClick={()=>{navigator('/Terms_homepage')}}>홈페이지 약관</div>
                                <div className="footer-link-to-terms"  onClick={()=>{navigator('/Terms_host')}}>호스팅 약관</div>
                            </div>
                    </div>
                    <div className="footer-con-s1-b2-p1">
                        <div>홈페이지</div>
                            <div className="footer-con-s1-b2-p1-container">
                                <div className="footer-link-to-terms"  onClick={()=>{navigator('/Terms_develope')}}>홈페이지 개발현황</div>
                                <div className="footer-link-to-terms"  onClick={()=>{navigator('/Terms_refertosite')}}>참고사이트</div>
                        </div>
                    </div>            
                </div>
            </div>

            <div className="footer-con-sec2">
                <div className="fooer-con-s2-b1">
                    성명 : 서보형 | 학원 주소 : 서구 1160 그린컴퓨터아트학원 대전본점 | 프론트엔드-리엑트 반<br></br>
                    강사 : 이성용 | 상담사 : 류아름 | 수료날짜(수업완료) : 2024-6-24 | 사용언어 : html css javascript react express <br></br>
                    E-mail : tjqhgud9104@naver.com(피드백 및 훈수 환영) | 지나친 비방을 제외한 건전한 욕설 및 피드백 이메일로 부탁드립니다.
                </div>
                <div className="fooer-con-s2-b2">
                    소속 : 대전 그린 컴퓨터 아트학원(대전본점) - 자바스크립트&리액트반 
                </div>
            </div>
        </div>
    )
}

export default Footer