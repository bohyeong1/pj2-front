import React, {useRef, useState} from "react";
import './Acc_regist_lv8.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import '../../../manage_scss_style/commonness/commonness.scss'
import Loading from "../../../utilComponent/material/loading/loading";
import session_storage from "../../../sessionStorage/session_storage";
import useAccRegistLv8Business from "../hook_store/business_hooks/acc_regist_lv8_business";
import useAccRegistLv8Style from "../hook_store/style_hooks/acc_regist_lv8_style";
import { state_store, reference_store } from "../../../utilData/UtilFunction";

function AccRegistLv8({login_user, this_step}){
    // =================================================
    // accomodation information //
    const accomodation = session_storage.load('house')

    // =================================================
    // this level's accomodation field name //
    const field_name = default_data.regist_field[this_step]

    // =================================================
    // refs //
    const regist_lv8_alarm = useRef(null)
    const regist_lv8_capacity_value = useRef(null)

    // =================================================
    // states //
    const [title, setTitle] = useState(accomodation[field_name[0]] ? accomodation[field_name[0]] : null)
    const [capacity, setCapacity] = useState(accomodation[field_name[1]] && accomodation[field_name[1]] > 0 ? accomodation[field_name[1]] : 1)
    const [prev_data, setPrev_data] = useState(accomodation[field_name[0]] && accomodation[field_name[1]] && accomodation[field_name[1]] > 0 ? 
        {
            [field_name[0]] : accomodation[field_name[0]],
            [field_name[1]] : accomodation[field_name[1]]
        } : null)
    const [loading, setLoading] = useState(null)

    // =================================================
    // hooks //
    // business
    const {fetch_acc, register, errors, watch, isValid} = useAccRegistLv8Business(undefined, 
        state_store([
            {
                'title' : title,
                'setTitle' : setTitle
            },
            {
                'prev_data' : prev_data,
                'setPrev_data' : setPrev_data
            },
            {
                'loading' : loading,
                'setLoading' : setLoading
            },
        ]))     
    // style
    const {lv8_text_input_change, plus_click, minus_click} = useAccRegistLv8Style(undefined,
        state_store([
            {
                'capacity' : capacity,
                'setCapacity' : setCapacity
            }
        ]),
        reference_store([
            {
                'regist_lv8_alarm' : regist_lv8_alarm
            },
            {
                'regist_lv8_capacity_value' : regist_lv8_capacity_value
            }
        ])
    )

    return(
        loading === false ? <Loading></Loading> :
        <div className="Acc-regist-lv8__container">
            <Main_menu login_user = {login_user}></Main_menu>
            <div className="Acc-regist-lv8__content">
                <div className="Acc-regist-lv8__content-title">
                    <span>숙소를 대표하는 이름과 인원을 선택해 주세요!</span>
                </div>

                <div className="Acc-regist-lv8__content-section1">                    
                    <div className="Acc-regist-lv8__content-section1-box1-title">
                        <span>숙소 이름</span>
                        <div className="Acc-regist-lv8__section-box">
                            <div></div>
                        </div>
                    </div>

                    <div className="Acc-regist-lv8__content-section1-wrapper">
                        <form className="Acc-regist-lv8__content-section1-box1">                        
                            <textarea  className="Acc-regist-lv8__content-section1-box1-text1 border-textarea" maxLength={19}
                            type='text' spellCheck={false} placeholder='숙소를 설명하는 이름을 지어주세요!'
                            {...register('title', {
                                onChange : (e)=>{lv8_text_input_change(e.target.value)}
                            })}></textarea>
                        </form>
                        {/* error */}
                        {errors.title && <span className="input-alert-text">{errors.title.message}</span>}                            
                        {/* text length */}
                        <div className="Acc-regist-lv8__content-section1-box2">
                            <div ref={regist_lv8_alarm} className="Acc-regist-lv8__content-section1-box2-text1">0/20</div>
                        </div> 
                    </div>                                       
                </div>

                <div className="Acc-regist-lv8__content-section2">
                    <div className="Acc-regist-lv8__content-section2-title">
                        <span>수용 인원</span>
                        <div className="Acc-regist-lv8__section-box">
                            <div></div>
                        </div>
                    </div>
                    <div className="Acc-regist-lv8__content-section2-box1">
                        {/* minus button */}
                        <button id="Acc-regist-lv8__button" className={`Acc-regist-lv8__content-section2-box1-part1-lb ${capacity === 1 ? 'small-button-disabled' : 'small-button'}`} 
                        onClick={minus_click}
                        disabled={capacity === 1 ? true : false}>
                            <i className="material-icons minus-button">remove</i>
                        </button>
                        {/* value */}
                        <div className="Acc-regist-lv8__content-section2-box1-part1-text1">
                            <span ref={regist_lv8_capacity_value} className="Acc-regist-lv8__content-section2-box1-part1_value">
                                {capacity}
                            </span>
                            <span>명</span>
                        </div>
                        {/* plus button */}
                        <button id="Acc-regist-lv8__button" className={`Acc-regist-lv8__content-section2-box1-part1-rb ${capacity >= 30 ? 'small-button-disabled' : 'small-button'}`} 
                        onClick={plus_click}
                        disabled={capacity >= 30 ? true : false}>
                            <i className="material-icons plus-button">add</i>
                        </button>
                    </div>                   
                </div>
            </div>

            <div className="Acc-regist-lv8__footer">
                <Host_footer fetch_handler={fetch_acc} drop_data={{title : watch('title'), capacity : capacity}} 
                button_state={isValid && watch('title') && capacity > 0 ? true : false} fetch_state={true}></Host_footer>
            </div>
        </div>
    )
}

export default AccRegistLv8