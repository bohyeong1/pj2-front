import React from "react";
import './Acc_regist.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Footer from '../../../menu/footer/Footer'
import { useNavigate } from "react-router-dom";
import UserImg from "../../../utilData/userImg/UserImg";
import default_data from "../../../utilData/defaultData";

function Acc_regist(){
    ///로그데이터
    const logData = sessionStorage.getItem('userData') || localStorage.getItem('userData')
    const logDataParse = JSON.parse(logData) || null


    // console.log(logDataParse)
    const reserveData = null

    const navigator = useNavigate()

    return(
        <div className="Acc_registApp">
            <Main_menu></Main_menu>
            
            <div className="Acc_regist-container">
                <div className="Acc_regist-sec1">
                    <div className="Acc_regist-s1-b1">{`${logDataParse.name} 님, 반갑습니다!`}</div>
                    <div className="Acc_regist-s1-b2">
                        <div className="Acc_regist-s1-b2-b1">
                            <div className="Acc_regist-s1-b2-b1-t1">호스팅 정책</div>
                            <div className="Acc_regist-s1-b2-b1-t2">보형짱 닷컴의 호스팅 정책을 꼭 확인해 주세요</div>
                            <div className="Acc_regist-s1-b2-b1-t3" onClick={()=>{navigator('/Terms_host')}}>이동하기</div>
                        </div>
                        <div className="Acc_regist-s1-b2-b2">
                            <div className="Acc_regist-s1-b2-b2-t1">호스트 소개하기</div>
                            <div className="Acc_regist-s1-b2-b2-t2">게스트들에게 자신을 소개하는 글을 작성해 보세요!</div>
                            <div className="Acc_regist-s1-b2-b2-t3" onClick={()=>{navigator('/Acc_regist/Acc_regist_intro')}}>이동하기</div>
                        </div>

                    </div>
                </div>

                <div className="Acc_regist-sec2">
                    <div className="Acc_regist-s2-b1">
                    </div>
                    <div className="Acc_regist-s2-b2">
                        <div className="Acc_regist-s2-b2-d1">
                            <UserImg data={logDataParse}></UserImg>
                        </div>
                        <div className="Acc_regist-s2-b2-d2">
                            <div className="Acc_regist-nodata"  style={{display:`${logDataParse.hostText ? 'none' : 'block'}`}}>
                                <span style={{marginRight : '15px'}}>게스트에게 보여줄 내용을 작성해 주세요!</span>
                                <img className="Acc_regist-nodata-img" src={default_data.d_imgs.smile}></img>
                            </div>
                            <textarea style={{display:`${!logDataParse.hostText ? 'none' : 'block'}`}} readOnly className="Acc_regist-s2-b2-d2-text" spellCheck={false}
                            value={logDataParse.hostText ? logDataParse.hostText : ''}></textarea>
                            
                        </div>
                    </div>

                </div>

                <div className="Acc_regist-sec3">
                    <div className="Acc_regist-s3-b1">예약</div>
                    <div className="Acc_regist-s3-b2">
                        <div className="Acc_regist-s3-b2-t1"></div>
                        <div className={`Acc_regist-s3-b2-t2 ${'reserve_active'}`}>
                            {reserveData ? '데이터 있음' : '예약된 숙소가 없습니다'}
                        </div>
                    </div>
                </div>

            </div>
            <div className="Acc_regist-footer">
                <Footer></Footer>
            </div>
        </div>

    )

}

export default Acc_regist