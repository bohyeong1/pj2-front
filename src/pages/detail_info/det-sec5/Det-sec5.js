import React from "react";
import './Det-sec5.css'
import UserImg from "../../../utilData/userImg/UserImg";

function Det_sec5({data, homeData}){    

    // console.log(homeData)
    
    return(
        <div className="Det_sec5-container">
            <div className="Det_sec5-con-title">호스트소개</div>
            <div className="Det_sec5-con-wrapper">
                <div className="Det_sec5-con-sec1">
                    <UserImg data={data} adress={homeData?.search_adress}></UserImg>
                </div>
                <div className="Det_sec5-con-sec2">

                </div>
            </div>

        </div>
    )
}


export default Det_sec5