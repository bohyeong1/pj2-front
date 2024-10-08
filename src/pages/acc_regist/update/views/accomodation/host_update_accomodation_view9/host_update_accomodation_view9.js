import './host_update_accomodation_view9.scss'
import default_data from "@/util/default_data/default_data";
import Loading from '@/utilComponent/material/loading/loading'
import { useContext, useState, useRef } from 'react'
import { AccDataContext } from '@/context/acc_data_context/config/acc_data_context'
import { state_store, reference_store, text_change } from '@/util/function/util_function'
import '@/manage_scss_style/commonness/commonness.scss'
import useHostUpdateAccomodationView9Business from '../../../hook_store/business_hooks/host_update_accomodation_view9_business';
import useHostUpdateAccomodationView9Style from '../../../hook_store/style_hooks/host_update_accomodation_view9_style';

function HostUpdateAccomodationView9(){
    // =================================================
    // context //
    const {acc_data, setAcc_data} = useContext(AccDataContext)

    // =================================================
    // refs //
    const gurabox_ref = useRef(null)
    const row_alram_ref = useRef(null) 
    const rule_alert_ref = useRef(null) 
 
    // =================================================
    // states //
    const [loading, setLoading] = useState(null)
    const [is_button, setIs_button] = useState(false)
    const [summary, setSummary] = useState(acc_data.rules ? acc_data.rules[4].summary : null)
    const [sellect_button, setSellect_button] = useState({
                                                    case1 : acc_data.rules ? acc_data.rules[1].state : null,
                                                    case2 : acc_data.rules ? acc_data.rules[2].state : null,
                                                    case3 : acc_data.rules ? acc_data.rules[3].state : null       
                                                })

    // =================================================
    // hooks //
    // business
    const {register, 
           setValue, 
           watch, 
           fetch_acc, 
           errors} = useHostUpdateAccomodationView9Business({
                            'acc_data' : acc_data,
                            'setAcc_data' : setAcc_data
                        },
                        state_store([
                            {
                                'sellect_button' : sellect_button,
                                'setSellect_button' : setSellect_button
                            },
                            {
                                'summary' : summary,
                                'setSummary' : setSummary
                            },
                            {
                                'loading' : loading,
                                'setLoading' : setLoading
                            },
                            {
                                'is_button' : is_button,
                                'setIs_button' : setIs_button
                            }
                        ]),
                        reference_store([
                            {
                                'gurabox_ref' : gurabox_ref
                            },
                            {
                                'row_alram_ref' : row_alram_ref
                            },
                            {
                                'rule_alert_ref' : rule_alert_ref
                            }
                        ])
                     )
    // style
    const {check_active, 
           click_allow, 
           click_not_allow, 
           plus_click, 
           minus_click} = useHostUpdateAccomodationView9Style({
                                'watch' : watch,
                                'setValue' : setValue
                            },
                            state_store([
                                {
                                    'sellect_button' : sellect_button,
                                    'setSellect_button' : setSellect_button
                                }
                            ]),
                            reference_store([
                                {
                                    'gurabox_ref' : gurabox_ref
                                },
                                {
                                    'row_alram_ref' : row_alram_ref
                                },
                                {
                                    'rule_alert_ref' : rule_alert_ref
                                }
                            ])
                         )

    return (
        loading === false ? <Loading part = {true}></Loading> :
        <div className='host-update-accomodation-view9__container'>
            <div className='host-update-accomodation-view9__wrapper common-scroll-bar'>
                <div className="host-update-accomodation-view9__title">
                    <span>이용 규칙</span>
                </div>
                <div className='host-update-accomodation-view9__content'>
                    {default_data.home_rules.map((ele,id)=>{
                        // 반려동물
                        if(id === 0){
                            return(
                                <div key={id} 
                                     className={`host-update-accomodation-view9__content-section${id}`} 
                                     id="host-update-accomodation-view9__content-section"
                                >
                                    <div className={`host-update-accomodation-view9__content-section${id}-part1`}>
                                        <span>{ele.text}</span>
                                    </div>
                                    <div className={`host-update-accomodation-view9__content-section${id}-part2`}>
                                        <div className={`host-update-accomodation-view9__content-section${id}-part2-text1`}>
                                            <span>동반 가능한 반려 동물 수</span>
                                        </div>
                                        <div className={`host-update-accomodation-view9__content-section${id}-part2-text2`}>
                                            <button id="host-update-accomodation-view9__button" 
                                                    className={`host-update-accomodation-view9__content-section${id}-part2-lb small-button-disabled`} 
                                                    onClick={minus_click}
                                            >
                                                        <img src={default_data.d_imgs.minus}></img>
                                            </button>

                                            <div className={`host-update-accomodation-view9__content-section${id}-part2-text1`}>
                                                <input className={`host-update-accomodation-view9__content-section${id}-part2_val`}
                                                       readOnly
                                                       {...register('count')}
                                                ></input>
                                                <span>마리</span>
                                            </div>

                                            <button id="host-update-accomodation-view9__button" 
                                                    className={`host-update-accomodation-view9__content-section${id}-part2-rb small-button`} 
                                                    onClick={plus_click}
                                            >
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
                                <div key={id} 
                                     className={`host-update-accomodation-view9__content-section${id}`}
                                     id="host-update-accomodation-view9__content-section"
                                >
                                    <div className={`host-update-accomodation-view9__content-section${id}-part1`}>
                                        <span>{ele.text}</span>
                                    </div>
                                    <div className={`host-update-accomodation-view9__content-section${id}-part2`}>
                                        <textarea className={`host-update-accomodation-view9__content-section${id}-part2-text1 border-textarea`} 
                                                  placeholder='추가 규칙을 작성해 주세요!' 
                                                  spellCheck={false}
                                                  {...register('summary', {
                                                  onChange : (e)=>{text_change(e.target.value, gurabox_ref, row_alram_ref, rule_alert_ref, 20, 20.52)}
                                                  })}
                                        >                                        
                                        </textarea>

                                        <pre className="host-update-accomodation-view9__gura-section" 
                                             ref={gurabox_ref}>                                                
                                        </pre>
                                        <div className="host-update-accomodation-view9__alert-section">
                                            <div ref={row_alram_ref} 
                                                 className="host-update-accomodation-view9__content-alert-text1">0/20</div>
                                            {/* alram */}
                                            <div ref={rule_alert_ref} 
                                                 className="host-update-accomodation-view9__content-alert-text2" 
                                                 style={{display:'none'}}>
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
                                <div key={id} 
                                     className={`host-update-accomodation-view9__content-section${id}`}
                                     id="host-update-accomodation-view9__content-section"
                                >
                                    <div className={`host-update-accomodation-view9__content-section${id}-part1`}>
                                        <span>{ele.text}</span>
                                    </div>
                                    <div className="host-update-accomodation-view9__content-button-wrapper">
                                        <button className={`host-update-accomodation-view9__content-button sellect-button 
                                                ${check_active(sellect_button[`case${id}`]) === 'active' ? 'sellect-active' : ''}`} 
                                                onClick={()=>{click_allow(`case${id}`)}}
                                        >
                                                    허용
                                        </button>
                                        <button className={`host-update-accomodation-view9__content-button sellect-button 
                                                ${check_active(sellect_button[`case${id}`]) === 'no-active' ? 'sellect-active' : ''}`} 
                                                onClick={()=>{click_not_allow(`case${id}`)}}
                                        >
                                                    비허용
                                        </button>
                                    </div>                     
                                </div>
                            )
                        }
                    })}                    
                </div>
            </div>

            {/* footer */}
            <div className="host-update-accomodation-view9__footer">
                <button className={`host-update-accomodation-view9__fetch-button ${is_button ? 'button-enable' : 'button-disable'}`}
                        disabled={is_button ? false : true}
                        onClick={fetch_acc}>
                            저장
                </button>
            </div>

        </div>
    )
}

export default HostUpdateAccomodationView9