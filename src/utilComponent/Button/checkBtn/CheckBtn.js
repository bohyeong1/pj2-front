import React, {useRef} from "react";
import './CheckBtn.css'
import useButtonCheckbtnBusiness from "../hook-store/business-hooks/button-checkbtn-bunisess";
import useButtonCheckbtnStyle from "../hook-store/style-hooks/button-checkbtn-style";
import { state_store, reference_store } from "../../../utilData/UtilFunction";

function CheckBtn({data, c_name ,keyValue}){

    // ref
    const check_btn_input = useRef([])
    const check_btn_gura = useRef([])

    
    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // business
    const {checkbtnClick, checkbtnInput} = useButtonCheckbtnBusiness(undefined, undefined,reference_store([
            {
                'check_btn_input':check_btn_input,
            },
            {
                'check_btn_gura':check_btn_gura
            }
        ]),
            {
                'keyValue':keyValue
            })
    // style
    const {click_gurabox} = useButtonCheckbtnStyle(undefined, undefined,reference_store([
            {
                'check_btn_input':check_btn_input,
            },
            {
                'check_btn_gura':check_btn_gura
            }
        ]),
            {
                'keyValue':keyValue
            })



    return(
        <>
            {data.map((ele,id)=>{
                return(
                    <div key={id} className={c_name}>
                        <input ref={(el)=>{check_btn_input.current[id] = el}} className="check_btn" type='checkbox' value={ele.name} onClick={checkbtnClick} onInput={checkbtnInput} name={keyValue}></input>
                        <span ref={(el)=>{check_btn_gura.current[id] = el}} className="check_btn_gura" onClick={(e)=>{click_gurabox(e,id)}}></span>
                        <label className="check-btn__text" htmlFor={ele}>{ele.name}</label>
                    </div>
                )
            })}
        </>   
    )
}

export default CheckBtn