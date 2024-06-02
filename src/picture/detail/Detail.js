import React from "react";
import './Detail.css'

function Detail ({data}){

    return(
        <img className="detail-img" src={data?.main_img}></img>
    )
}

export default Detail