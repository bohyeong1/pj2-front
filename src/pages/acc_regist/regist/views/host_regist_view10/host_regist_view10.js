import {useRef,useState, useContext} from "react";
import './host_regist_view10.scss'
import Host_footer from "@/utilComponent/menu/host-footer/Host-footer";
import '@/manage_scss_style/commonness/commonness.scss'
import Loading from "@/utilComponent/material/loading/loading";
import useHostRegistView10Business from "../../hook_store/business_hooks/host_regist_view10_business";
import useHostRegistView10Style from "../../hook_store/style_hooks/host_regist_view10_style";
import default_data from "@/util/default_data/default_data";
import { state_store, reference_store } from "@/util/function/util_function";
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";

function HostRegistView10(){

    // =================================================
    // context states //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // states //
    const [data_ready, setData_ready] = useState(false)
    const [current_data, setCurrent_data] = useState(host_acc.rules ? host_acc.rules : null)
    const [prev_data, setPrev_data] = useState(host_acc.rules ? host_acc.rules : null)
    const [sellect_state, setSellect_state] = useState(
        {
            case1 : prev_data ? prev_data[1].state : null,
            case2 : prev_data ? prev_data[2].state : null,
            case3 : prev_data ? prev_data[3].state : null       
        }
    )
    const [loading, setLoading] = useState(null)

    // =================================================
    // refs //
    const regist_lv10_gurabox = useRef(null)
    const regist_lv10_row_alram = useRef(null) 
    const regist_lv10_alert = useRef(null) 

    // =================================================
    // hooks //
    // business
    const {
        register, 
        setValue, 
        watch, 
        fetch_acc, 
        errors
    } = useHostRegistView10Business(
        {
            host_acc,
            setHost_acc
        },
        state_store([
            {sellect_state, setSellect_state},
            {current_data, setCurrent_data},
            {prev_data, setPrev_data},
            {data_ready, setData_ready},
            {loading, setLoading}
        ])
    )
    // style
    const {
        check_active, 
        click_allow, 
        click_not_allow, 
        plus_click, 
        minus_click, 
        text_change
    } = useHostRegistView10Style(
        {
            watch,
            setValue
        },
        state_store([
            {sellect_state, setSellect_state}
        ]),
        reference_store([
            {regist_lv10_gurabox},
            {regist_lv10_row_alram},
            {regist_lv10_alert}
        ])
    )

    return(
        loading === false ? <Loading></Loading> :
        <div className="host-regist-view10__container">
            <div className="host-regist-view10__content">
                <div className="host-regist-view10__content-title">
                    <span>숙소 이용규칙을 선택해 주세요</span>                    
                </div>

                <div className="host-regist-view10__content-section1">
                    {default_data.home_rules.map((el,id)=>{
                        // 반려동물
                        if(id === 0){
                            return(
                                <div 
                                    key={id} 
                                    className={`host-regist-view10__content-section1-box${id}`} 
                                    id="host-regist-view10__content-section1-box">
                                    <div className={`host-regist-view10__content-section1-box${id}-part1`}>
                                        <span>{el.text}</span>
                                    </div>
                                    <div className={`host-regist-view10__content-section1-box${id}-part2`}>
                                        <div className={`host-regist-view10__content-section1-box${id}-part2-text1`}>
                                            <span>동반 가능한 반려 동물 수</span>
                                        </div>
                                        <div className={`host-regist-view10__content-section1-box${id}-part2-text2`}>
                                            <button 
                                                id="host-regist-view10__button" 
                                                className={`host-regist-view10__content-section2-box1-part2-lb
                                                    ${watch('count') <= 0 ? 'small-button-disabled' : 'small-button'}`} 
                                                disabled = {watch('count') <= 0 ? true : false}
                                                onClick={minus_click}>
                                                <i className="material-icons plus-button">remove</i>
                                            </button>

                                            <div className="host-regist-view10__content-section2-box1-part2-text1">
                                                <input 
                                                    className="host-regist-view10__content-section2-box1-part2_val"
                                                    readOnly
                                                    {...register('count')}/>
                                                <span>마리</span>
                                            </div>

                                            <button 
                                                id="host-regist-view10__button" 
                                                className={`host-regist-view10__content-section2-box1-part2-rb
                                                    ${watch('count') >= 5 ? 'small-button-disabled' : 'small-button'}`} 
                                                disabled = {watch('count') >= 5 ? true : false}
                                                onClick={plus_click}>
                                                <i className="material-icons plus-button">add</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        // 추가 규칙
                        else if(id === default_data.home_rules.length-1){
                            return(
                                <div 
                                    key={id} 
                                    className={`host-regist-view10__content-section1-box${id}`}
                                    id="host-regist-view10__content-section1-box">
                                   <div className={`host-regist-view10__content-section1-box${id}-part1`}>
                                        <span>{el.text}</span>
                                    </div>
                                   <div className={`host-regist-view10__content-section1-box${id}-part2`}>
                                        <textarea 
                                            className={`host-regist-view10__content-section1-box${id}-part2-text1 border-textarea common-scroll-bar`} 
                                            placeholder='추가 규칙을 작성해 주세요!' 
                                            spellCheck={false}
                                            {...register('rule', {
                                                onChange : (e)=>{text_change(e.target.value)}
                                            })}/>                                        

                                        <pre 
                                            className="host-regist-view10__gurabox" 
                                            ref={regist_lv10_gurabox}/>
                                        <div className="host-regist-view10__alert-box">
                                            <div 
                                                ref={regist_lv10_row_alram} 
                                                className="host-regist-view10__content-section1-box2-text1">
                                                    <span>0/20</span>
                                            </div>
                                            {/* alram */}
                                            <div 
                                                ref={regist_lv10_alert} 
                                                className="host-regist-view10__content-section1-box2-text2" 
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
                                <div 
                                    key={id} 
                                    className={`host-regist-view10__content-section1-box${id}`}
                                    id="host-regist-view10__content-section1-box">
                                    <div className={`host-regist-view10__content-section1-box${id}-part1`}>
                                        <span>{el.text}</span>
                                    </div>
                                    <div className="host-regist-view10__content-section1-button-wrapper">
                                        <button 
                                            className={`host-regist-view10__content-section1-button sellect-button 
                                                ${check_active(sellect_state[`case${id}`]) === 'active' ? 'sellect-active' : ''}`} 
                                            onClick={()=>{click_allow(`case${id}`)}}>
                                                허용
                                        </button>
                                        <button 
                                            className={`host-regist-view10__content-section1-button sellect-button 
                                                ${check_active(sellect_state[`case${id}`]) === 'no-active' ? 'sellect-active' : ''}`} 
                                            onClick={()=>{click_not_allow(`case${id}`)}}>
                                                비허용
                                        </button>
                                    </div>                     
                                </div>
                            )
                        }
                    })}                    
                </div>
            </div>
            <div className="host-regist-view10__footer">
                <Host_footer 
                    fetch_handler={fetch_acc} 
                    drop_data={data_ready ? current_data : null} 
                    button_state={data_ready} 
                    fetch_state={true}/>
            </div>
        </div>
    )
}

export default HostRegistView10