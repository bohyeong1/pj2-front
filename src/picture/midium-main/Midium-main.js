import React from 'react';
import './Midium-main.css'
import { Link } from "react-router-dom";

function Midium_main({data}){
    return(
        <img className='midium-main-img' src={`${data.main_img}`}></img>           
    )
}

export default  Midium_main