import React, {useRef} from "react";
import './check_button.scss'
import useButtonCheckbtnBusiness from "../hook-store/business-hooks/button-checkbtn-bunisess";
import useButtonCheckbtnStyle from "../hook-store/style-hooks/button-checkbtn-style";
import { reference_store } from "@/util/function/util_function";

function CheckButton({data, c_name ,keyValue, modal}){

    // =================================================
    // refs //
    const check_btn_input = useRef([])
    const check_btn_gura = useRef([])

    
    // =================================================
    // hooks //
    // business
    const {
        check_input_url, 
        check_click_url, 
        check_click_state, 
        check_input_state
    } = useButtonCheckbtnBusiness(undefined, undefined,
        reference_store([
            {check_btn_input},
            {check_btn_gura}
        ]),
        {
            keyValue,
            modal
        }
    )
    // style
    const {click_gurabox} = useButtonCheckbtnStyle(undefined, undefined,
        reference_store([
            {check_btn_input},
            {check_btn_gura}
        ]),
        {
            keyValue
        }
    )



    return(
        <>
            {data.map((ele,id)=>{
                return(
                    <div
                        key={id} 
                        className={c_name}>
                        <input 
                            ref={(el)=>{check_btn_input.current[id] = el}} 
                            className="check_btn" 
                            type='checkbox' 
                            value={ele.name} 
                            onClick={!modal ? check_click_url : check_click_state} 
                            onInput={!modal ? check_input_url : check_input_state} 
                            name={keyValue}/>
                        <span 
                            ref={(el)=>{check_btn_gura.current[id] = el}} 
                            className="check_btn_gura" 
                            onClick={(e)=>{click_gurabox(e,id)}}></span>
                        <label 
                            className="check-btn__text" 
                            htmlFor={ele}>
                                {ele.name}
                        </label>
                    </div>
                )
            })}
        </>   
    )
}

export default CheckButton