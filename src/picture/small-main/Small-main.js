import React from 'react';
import './Small-main.css'
import { Link } from "react-router-dom";

function Small_main({data}){

    return(
        <img className='small-main-img' src={`${data.img_url}`}></img>           
    )
}

export default Small_main


// ../../../../프로젝트2이미지/제주도/${ele.img_url}