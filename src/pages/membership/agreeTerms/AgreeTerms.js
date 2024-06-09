import React, {useState, useEffect} from "react";
import './AgreeTerms.css'
import { useNavigate } from "react-router-dom";
import Main_menu from "../../../menu/main-menu/main-menu";
import Footer from "../../../menu/footer/Footer";

function AgreeTerms(){

    const navigate = useNavigate()

    const [allchecked, setAllchecked] = useState(false)

    const [checkBox_state, setCheckBox_state]=useState({
        terms1 : false,
        terms2 : false,
        terms3 : false,
        terms4 : false
    })

    useEffect(()=>{
        for(const key in checkBox_state){
            if(checkBox_state[key] === true){
                continue
            }else{
                setAllchecked(false)
                return}            
        }
        setAllchecked(true)
    },[checkBox_state])

    // 전체 동의
    function allCheckbox(e){
        const check = e.target.checked
        // console.log(check)
        const copiedState = {...checkBox_state}
        for(const key in checkBox_state){
            copiedState[key] = check
        }
        // console.log(copiedState)
        setCheckBox_state(copiedState)
    }

    //선택동의
    function sellectCheckbox(e){
        const name = e.target.name
        const copiedState = {...checkBox_state}
        copiedState[name] = !checkBox_state[name]
        setCheckBox_state(copiedState)
    }

    console.log(allchecked)

    return(
        <div className="AgreeTerms-container">
            <Main_menu></Main_menu>
            <div className="AgreeTerms-content">
                <div className="AgreeTerms-content-sec1">
                    <div className="AgreeTerms-content-sec1-s1">보형짱 닷컴</div>
                    <div className="AgreeTerms-content-sec1-s2">
                        <div className="level-bar-lv1"></div>
                    </div>
                    <div className="AgreeTerms-content-sec1-s3">
                        보형짱 닷컴 <br/> 서비스 약관에 동의해 주세요
                    </div>
                    <div className="AgreeTerms-content-sec1-s4">
                        <input type="checkbox" className="terms-checkbox" checked={allchecked} onClick={allCheckbox}></input>
                        <label>전체 동의</label>
                    </div>
                </div>
                <div className="AgreeTerms-content-sec2">
                    <div className="AgreeTerms-content-sec2-s1">
                        <div className="AgreeTerms-con-s1-s1-box">
                            <input type="checkbox" className="terms-checkbox" name="terms1" checked={checkBox_state.terms1} onClick={sellectCheckbox}></input>
                            <label>너무 자세한 개인 정보는 기입하지 말아주세요!
                               <span>(필수)</span>
                            </label>
                        </div>
                        <div className="AgreeTerms-con-s1-s1-box">
                            <input type="checkbox" className="terms-checkbox" name="terms2" checked={checkBox_state.terms2}  onClick={sellectCheckbox}></input>
                            <label>클라우드 스토리지를 처음 사용해 봤습니다. <br></br>무분별한 이미지 등록을 자제해 주세요!
                                <span>(필수)</span>
                            </label>
                        </div>
                        <div className="AgreeTerms-con-s1-s1-box">
                            <input type="checkbox" className="terms-checkbox" name="terms3" checked={checkBox_state.terms3} onClick={sellectCheckbox}></input>
                            <label>홈페이지 피드백이나 고칠점을 제작자의 이메일로 보내주세요!
                               <span>(필수)</span>    
                            </label>     
                        </div>
                        <div className="AgreeTerms-con-s1-s1-box">
                            <input type="checkbox" className="terms-checkbox" name="terms4" checked={checkBox_state.terms4} onClick={sellectCheckbox}></input>
                            <label>푸터 부분에 제작자와 홈페이지의 정보가 담겨 있습니다. <br></br> 꼭 확인해주세요! 
                                <span>(필수)</span>
                            </label>     
                        </div>
                    </div>
                    <button className={`AgreeTerms-content-sec2-btn ${allchecked ? 'Agreeterms-btn-active' : ''}`} 
                    disabled = {allchecked ? false:true} onClick={()=>{navigate('/Membership_join')}}>다음</button>
                    
                </div>
            </div>
            <div className="AgreeTerms-footer">
                    <Footer></Footer>
            </div>
        </div>
    )
}

export default AgreeTerms