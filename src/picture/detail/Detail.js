import React from "react";
import './Detail.css'

function Detail ({data, handleFnc}){

    return(
        <img className="detail-img" src={data?.main_img} onClick={handleFnc}></img>
    )
}

export default Detail