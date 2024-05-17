import React from 'react';
import './Large-main.css'
import { Link } from "react-router-dom";

function Large_main({data}){
    return(
        <img className='large-main-img' src={`${data.img_url}`}></img>           
    )
}

export default  Large_main