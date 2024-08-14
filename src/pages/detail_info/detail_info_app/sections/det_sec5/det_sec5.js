import React from "react";
import './det_sec5.scss'
import UserImg from "../../../../../utilData/userImg/UserImg";

function Det_sec5({data, homeData}){    

    // console.log()
    
    return(
        <div className="Det_sec5-container">
            <div className="Det_sec5-con-title">호스트소개</div>
            <div className="Det_sec5-con-wrapper">
                <div className="Det_sec5-con-sec1">
                    <UserImg data={data} adress={homeData?.search_adress}></UserImg>
                </div>
                <textarea readOnly spellCheck={false}  value={data?.hostText} className="Det_sec5-con-sec2">

                </textarea>
            </div>

        </div>
    )
}


export default Det_sec5