import React,{useRef,useState} from "react";
import './Acc_regist_lv10.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import '../../../manage_scss_style/commonness/commonness.scss'
import session_storage from "../../../sessionStorage/session_storage";
import Loading from "../../../utilComponent/material/loading/loading";
import useAccRegistLv10Business from "../hook_store/business_hooks/acc_regist_lv10_business";
import useAccRegistLv10Style from "../hook_store/style_hooks/acc_regist_lv10_style";
import { state_store } from "../../../utilData/UtilFunction";

function AccRegistLv10({login_user, this_step}){

    // =================================================
    // accomodation information //
    const accomodation = session_storage.load('house')

    // =================================================
    // this level's accomodation field name //
    const field_name = default_data.regist_field[this_step]

    // =================================================
    // states //
    const [rules_structure, setRules_structure] = useState(default_data.home_rules)
    const [prev_data, setPrev_data] = useState(accomodation[field_name] ? accomodation[field_name] : null)
    const [sellect_state, setSellect_state] = useState({
        case1 : null,
        case2 : null,
        case3 : null       
    })
    const [loading, setLoading] = useState(null)
  
    // =================================================
    // hooks //
    // business
    const {register, setValue, watch, fetch_acc, changeAddRule} = useAccRegistLv10Business()
    // style
    const {check_active, click_allow, click_not_allow, plus_click, minus_click} = useAccRegistLv10Style({
            'watch' : watch,
            'setValue' : setValue
        },
        state_store([
            {
                'sellect_state' : sellect_state,
                'setSellect_state' : setSellect_state
            }
        ])
    )

    return(
        loading === false ? <Loading></Loading> :
        <div className="Acc-regist-lv10__container">
            <Main_menu login_user={login_user}></Main_menu>

            <div className="Acc-regist-lv10__content">
                <div className="Acc-regist-lv10__content-title">
                    <span>숙소 이용규칙을 선택해 주세요</span>                    
                </div>

                <div className="Acc-regist-lv10__content-section1">
                    {default_data.home_rules.map((ele,id)=>{
                        // 반려동물
                        if(id === 0){
                            return(
                                <div key={id} className={`Acc-regist-lv10__content-section1-box${id}`} id="Acc-regist-lv10__content-section1-box">
                                    <div className={`Acc-regist-lv10__content-section1-box${id}-part1`}>
                                        <span>{ele.text}</span>
                                    </div>
                                    <div className={`Acc-regist-lv10__content-section1-box${id}-part2`}>
                                        <div className={`Acc-regist-lv10__content-section1-box${id}-part2-text1`}>
                                            <span>동반 가능한 반려 동물 수</span>
                                        </div>
                                        <div className={`Acc-regist-lv10__content-section1-box${id}-part2-text2`}>
                                            <button id="Acc-regist-lv10__button" className={`Acc-regist-lv10__content-section2-box1-part2-lb small-button-disabled`} 
                                            onClick={minus_click}>
                                                <img src={default_data.d_imgs.minus}></img>
                                            </button>

                                            <div className="Acc-regist-lv10__content-section2-box1-part2-text1">
                                                <input className="Acc-regist-lv10__content-section2-box1-part2_val"
                                                readOnly
                                                {...register('count')}></input>
                                                <span>마리</span>
                                            </div>

                                            <button id="Acc-regist-lv10__button" className={`Acc-regist-lv10__content-section2-box1-part2-rb small-button`} 
                                            onClick={plus_click}>
                                                <img src={default_data.d_imgs.plus}></img>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        // 추가 규칙
                        else if(id === default_data.home_rules.length-1){
                            return(
                                <div key={id} className={`Acc-regist-lv10__content-section1-box${id}`}
                                id="Acc-regist-lv10__content-section1-box">
                                   <div className={`Acc-regist-lv10__content-section1-box${id}-part1`}>
                                        <span>{ele.text}</span>
                                    </div>
                                   <div className={`Acc-regist-lv10__content-section1-box${id}-part2`}>
                                       <textarea className={`Acc-regist-lv10__content-section1-box${id}-part2-text1 border-textarea`} 
                                       placeholder='추가 규칙을 작성해 주세요!' 
                                       onChange={changeAddRule} spellCheck={false}></textarea>
                                   </div>
                               </div>
                            )
                        }
                        // 나머지
                        else{
                            return(
                                <div key={id} className={`Acc-regist-lv10__content-section1-box${id}`}
                                id="Acc-regist-lv10__content-section1-box">
                                    <div className={`Acc-regist-lv10__content-section1-box${id}-part1`}>
                                        <span>{ele.text}</span>
                                    </div>
                                    <div className="Acc-regist-lv10__content-section1-button-wrapper">
                                        <button className={`Acc-regist-lv10__content-section1-button sellect-button 
                                        ${check_active(sellect_state[`case${id}`]) === 'active' ? 'sellect-active' : ''}`} 
                                        onClick={()=>{click_allow(`case${id}`)}}>허용</button>
                                        <button className={`Acc-regist-lv10__content-section1-button sellect-button 
                                        ${check_active(sellect_state[`case${id}`]) === 'no-active' ? 'sellect-active' : ''}`} 
                                        onClick={()=>{click_not_allow(`case${id}`)}}>비허용</button>
                                    </div>                     
                                </div>
                            )
                        }
                    })}                    
                </div>
            </div>
            <div className="Acc-regist-lv10__footer">
                <Host_footer fetch_handler={fetch_acc} drop_data={{summary : watch('count')}}
                button_state={watch('count') ? true : false} fetch_state={true}></Host_footer>
            </div>
        </div>
    )
}

export default AccRegistLv10