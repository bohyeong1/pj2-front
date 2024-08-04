import React from "react";
import { useSearchParams } from "react-router-dom";
import './CheckBtn.css'

function CheckBtn({data, c_name ,keyValue}){

    const [SearchParams,setSearchParams] = useSearchParams()

    function checkbtnInput(e){
        if(e.target.checked){
            SearchParams.set(keyValue, e.target.value)
            setSearchParams(SearchParams)
        }else{
            SearchParams.delete(keyValue)
            setSearchParams(SearchParams)
        }
    }


    function checkbtnClick(e){
        const check_btn = document.querySelectorAll('.check_btn')
        check_btn.forEach((ele)=>{

            if(ele === e.target){
                if(e.target.checked){
                    e.target.checked = true
                }else{
                    e.target.checked = false
                }
            }else{
                ele.checked = false
            }
        })
    }


    return(
        <>
            {data.map((ele,id)=>{
                return(
                    <div key={id} className={c_name}>
                        <input className="check_btn" type='checkbox' value={ele.name} onClick={checkbtnClick} onInput={checkbtnInput} name={keyValue}></input>
                        <label for={ele}>{ele.name}</label>
                    </div>
                )
            })}
        </>   
    )
}

export default CheckBtn