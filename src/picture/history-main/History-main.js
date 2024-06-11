import React from 'react';
import './History-main.css'


function History_main({data}){

    return(
        <img className='History_main-img' src={`${data.main_img}`}></img>           
    )
}

export default History_main