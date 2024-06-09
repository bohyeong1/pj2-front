import React from "react";
import './Detail-many.css'

function Detail_many({data, handleFnc}){
    const imgs = data?.sub_img

    return(
        <div className="detail-box">
            {imgs?.map((ele,id)=>{
                return(
                    <div className="det-many-wrapper" style={{background:'black'}}>
                        <img className="det-many-img" key={id} src={ele} onClick={handleFnc}></img>
                    </div>

                )

            })}
        </div>
    )
}

export default Detail_many