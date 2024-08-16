import React, {useState} from "react";
import './agree.scss'
import '../../../manage_scss_style/commonness/commonness.scss'
import { useNavigate } from "react-router-dom";
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import { state_store } from "../../../utilData/UtilFunction";
import useMembershipAgreeStyle from "../hook-store/style-hooks/membership_agree_style";

function Agree(){

    const navigate = useNavigate()

    // state
    const [all_check, setAll_check] = useState(false)
    const [checkbox_state, setCheckbox_state]=useState({
        terms1 : false,
        terms2 : false,
        terms3 : false,
        terms4 : false
    })

    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // style
    const {all_check_box, sellect_check_box} = useMembershipAgreeStyle(undefined, state_store([
        {
            'all_check':all_check,
            'setAll_check':setAll_check
        },
        {
            'checkbox_state':checkbox_state,
            'setCheckbox_state':setCheckbox_state
        }
    ]))

    return(
        <div className="agree-app">
            <Main_menu></Main_menu>
            <div className="agree-app__container">
                <div className="agree-app__container-section1">
                    <div className="agree-app__container-section1-part1">약관동의</div>
                    <div className="agree-app__container-section1-part2">
                        <div className="level-bar-lv1"></div>
                    </div>
                    <div className="agree-app__container-section1-part3">
                        보형짱 닷컴 <br/> 서비스 약관에 동의해 주세요
                    </div>
                    <div className="agree-app__container-section1-part4">
                        <input type="checkbox" className="terms-checkbox__daepyo" checked={all_check} onChange={all_check_box}></input>
                        <label>전체 동의</label>
                    </div>
                </div>
                <div className="agree-app__container-section2">
                    <div className="agree-app__container-section2-part1">
                        <div className="agree-app__container-section2-part1-box">
                            <input type="checkbox" className="terms-checkbox" name="terms1" checked={checkbox_state.terms1} onChange={sellect_check_box}></input>
                            <label>너무 자세한 개인 정보는 기입하지 말아주세요!
                               <span>(필수)</span>
                            </label>
                        </div>
                        <div className="agree-app__container-section2-part1-box">
                            <input type="checkbox" className="terms-checkbox" name="terms2" checked={checkbox_state.terms2}  onChange={sellect_check_box}></input>
                            <label>아직 배우는 단계이니 무분별한 이미지 등록을 자제해 <br></br><br></br>주세요!
                                <span>(필수)</span>
                            </label>
                        </div>
                        <div className="agree-app__container-section2-part1-box">
                            <input type="checkbox" className="terms-checkbox" name="terms3" checked={checkbox_state.terms3} onChange={sellect_check_box}></input>
                            <label>홈페이지 피드백이나 고칠점을 제작자의 이메일로 보내<br></br><br></br>주세요!
                               <span>(필수)</span>    
                            </label>     
                        </div>
                        <div className="agree-app__container-section2-part1-box">
                            <input type="checkbox" className="terms-checkbox" name="terms4" checked={checkbox_state.terms4} onChange={sellect_check_box}></input>
                            <label>푸터에 제작자와 홈페이지의 정보가 담겨 있습니다. <br></br><br></br> 꼭 확인해주세요! 
                                <span>(필수)</span>
                            </label>     
                        </div>
                    </div>
                    
                    <button className={`agree-app__container-section2-btn ${all_check ? 'button-enable' : 'button-disable'}`} 
                    disabled = {all_check ? false:true} onClick={()=>{navigate('/Membership_join')}}>다음</button>
                    
                </div>
            </div>
        </div>
    )
}

export default Agree