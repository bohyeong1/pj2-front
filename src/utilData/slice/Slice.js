import React from "react";
import './Slice.css'


function Slice({url, img, title, text1, text2}){

    // console.log(img)

    return(
        <div className="Slice-container" onClick={()=>{window.open(`${url}`)}}>
            <div className="Slice-img-box">
                <img className="Slice-img" src={img}></img>
            </div>

            <div className="Slice-content">
                <div className="Slice-con-title">{title}</div>
                <span className="Slice-con-text1">{text1}</span>
                <span className="Slice-con-text1">{text2}</span>
            </div>
        </div>
    )
}

export default Slice

