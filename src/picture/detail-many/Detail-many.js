import React from "react";
import './Detail-many.css'

function Detail_many({data}){
    const imgs = data.img_inv

    return(
        <div className="detail-box">
            {imgs.map((ele,id)=>{
                return(
                    <img className="det-many-img" key={id} src={ele}></img>
                )

            })}
        </div>
    )
}

export default Detail_many