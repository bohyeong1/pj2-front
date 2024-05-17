import React from "react";
import './Detail.css'

function Detail ({data}){

    return(
        <img className="detail-img" src={data.img_url}></img>
    )
}

export default Detail