import React from "react";
import './LinkBtn.css'
import { useNavigate } from "react-router-dom";

function LinkBtn({text, url}){
    const navigate = useNavigate()
    return(
        <button className="link-btn" onClick={()=>{
            if(!url){
                return
            }else{
                navigate(`/Acc_regist/${url}`)
            }}}>{text}</button>
    )
}

export default LinkBtn