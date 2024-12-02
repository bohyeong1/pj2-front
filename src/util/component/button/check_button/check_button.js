import React, {useRef} from "react";
import './check_button.scss'
import useButtonCheckbtnBusiness from "../hook-store/business-hooks/button-checkbtn-bunisess";
import useButtonCheckbtnStyle from "../hook-store/style-hooks/button-checkbtn-style";
import { reference_store } from "@/util/function/util_function";

function CheckButton({data, c_name, value}){

    // =================================================
    // refs //
    const check_btn_input = useRef([])
    const check_btn_gura = useRef([])
    
    // =================================================
    // hooks //
    // business
    const {
        check_input_url
    } = useButtonCheckbtnBusiness(undefined, undefined,
        reference_store([
            {check_btn_input},
            {check_btn_gura}
        ]),
        {
            value
        }
    )
    // style
    const {
        click_gurabox,
        SearchParams
    } = useButtonCheckbtnStyle(undefined, undefined,
        reference_store([
            {check_btn_input},
            {check_btn_gura}
        ]),
        {
            value
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
                            readOnly
                            value={ele.name} 
                            checked = {SearchParams.get(value) === ele.name ? true : false}
                            onInput={check_input_url} 
                            name={value}/>
                        <span 
                            ref={(el)=>{check_btn_gura.current[id] = el}} 
                            className = {`check_btn_gura ${SearchParams.get(value) === ele.name ? 'check_btn_gura-active' : ''}`}
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