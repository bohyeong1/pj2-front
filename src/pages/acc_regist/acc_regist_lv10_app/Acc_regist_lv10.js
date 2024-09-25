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
import { reference_store, state_store } from "../../../utilData/UtilFunction";

function AccRegistLv10({login_user, this_step}){

    // =================================================
    // accomodation information //
    const accomodation = session_storage.load('house')
 
    // =================================================
    // this level's accomodation field name //
    const field_name = default_data.regist_field[this_step]

    // =================================================
    // states //
    const [data_ready, setData_ready] = useState(false)
    const [current_data, setCurrent_data] = useState(accomodation[field_name] ? accomodation[field_name] : null)
    const [prev_data, setPrev_data] = useState(accomodation[field_name] ? accomodation[field_name] : null)
    const [sellect_state, setSellect_state] = useState({
        case1 : null,
        case2 : null,
        case3 : null       
    })
    const [loading, setLoading] = useState(null)

    // =================================================
    // refs //
    const regist_lv10_gurabox = useRef(null)
    const regist_lv10_row_alram = useRef(null) 
    const regist_lv10_alert = useRef(null) 

    // =================================================
    // hooks //
    // business
    const {register, setValue, watch, fetch_acc, errors} = useAccRegistLv10Business(undefined,
        state_store([
            {
                'sellect_state' : sellect_state,
                'setSellect_state' : setSellect_state
            },
            {
                'current_data' : current_data,
                'setCurrent_data' : setCurrent_data
            },
            {
                'prev_data' : prev_data,
                'setPrev_data' : setPrev_data
            },
            {
                'data_ready' : data_ready,
                'setData_ready' : setData_ready
            },
            {
                'loading' : loading,
                'setLoading' : setLoading
            }
        ])
    )
    // style
    const {check_active, click_allow, click_not_allow, plus_click, minus_click, text_change} = useAccRegistLv10Style({
            'watch' : watch,
            'setValue' : setValue
        },
        state_store([
            {
                'sellect_state' : sellect_state,
                'setSellect_state' : setSellect_state
            }
        ]),
        reference_store([
            {
                'regist_lv10_gurabox' : regist_lv10_gurabox
            },
            {
                'regist_lv10_row_alram' : regist_lv10_row_alram
            },
            {
                'regist_lv10_alert' : regist_lv10_alert
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
                                        spellCheck={false}
                                        {...register('rule', {
                                            onChange : (e)=>{text_change(e.target.value)}
                                        })}>                                        
                                        </textarea>

                                        <pre className="Acc-regist-lv10__gurabox" ref={regist_lv10_gurabox}></pre>
                                        <div className="Acc-regist-lv10__alert-box">
                                            <div ref={regist_lv10_row_alram} className="Acc-regist-lv10__content-section1-box2-text1">0/20</div>
                                            {/* alram */}
                                            <div ref={regist_lv10_alert} className="Acc-regist-lv10__content-section1-box2-text2" style={{color:'red', display:'none'}}>
                                                20줄 이내로 작성해 주세요!
                                            </div>
                                            {/* error */}
                                            {errors.rule && <span className="input-alert-text">{errors.rule.message}</span>}  
                                        </div>
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
                <Host_footer fetch_handler={fetch_acc} drop_data={data_ready ? current_data : null} button_state={data_ready} fetch_state={true}></Host_footer>
            </div>
        </div>
    )
}

export default AccRegistLv10