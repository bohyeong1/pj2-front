import React, {useState} from "react";
import './Acc_regist_intro.css'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Footer from "../../../utilComponent/menu/footer/Footer";
import default_data from "../../../utilData/defaultData";
import UserImg from "../../../utilData/userImg/UserImg";
import HostTextModal from "../../../utilComponent/modal/hostTextModal/HostTextModal";


function Acc_regist_intro(){

    const [hostModal, setHostModal] = useState(false) //호스트 모달 상태값

    ///로그데이터
    const logData = sessionStorage.getItem('userData') || localStorage.getItem('userData')
    const logDataParse = JSON.parse(logData) || null

    //댓글 모달 껏다 키기
    function hostModalState(){
        setHostModal(!hostModal)
    }

    return(
        <div className="Acc_regist_intro-container">
            <Main_menu></Main_menu>
            <div className="Acc_regist_intro-content">
                <div className="Acc_regist_intro-sec1">
                    <div className="Acc_regist_intro-s1-title">호스트 소개</div>
                </div>

                <div className="Acc_regist_intro-sec2">
                    <div className="Acc_regist_intro-s2-b1">
                        <button className="Acc_regist_intro-s2-b1-btn" onClick={()=>{setHostModal(true)}}>수정하기</button>
                    </div>
                    <div className="Acc_regist_intro-s2-b2">
                        <div className="Acc_regist_intro-s2-b2-d1">
                            <UserImg data={logDataParse}></UserImg>
                        </div>
                        <div className="Acc_regist_intro-s2-b2-d2">
                            <div className="Acc_regist_intro-nodata"  style={{display:`${logDataParse.hostText ? 'none' : 'block'}`}}>
                                <span style={{marginRight : '15px'}}>게스트에게 보여줄 내용을 작성해 주세요!</span>
                                <img className="Acc_regist_intro-nodata-img" src={default_data.d_imgs.smile}></img>
                            </div>
                            <textarea style={{display:`${!logDataParse.hostText ? 'none' : 'block'}`}} className="Acc_regist_intro-s2-b2-d2-text" spellCheck={false}
                            value={logDataParse.hostText ? logDataParse.hostText : ''}></textarea>                            
                        </div>
                    </div>
                </div>

            <HostTextModal data={logDataParse} hostModal={hostModal} hostModalState={hostModalState}></HostTextModal>

            </div>
            <div className="Acc_regist_intro-footer">
                <Footer></Footer>
            </div>
        </div>
    )

}

export default Acc_regist_intro