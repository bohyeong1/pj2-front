import React from "react";
import './detail_section5.scss'
import UserImg from "../../../../../utilData/userImg/UserImg";

function DetailSection5({data, homeData, role}){    

    // console.log()
    
    return(
        <div className="detail-section5__container">
            <div className="detail-section5__container-title">
                <span>호스트소개</span>
            </div>
            <div className="detail-section5__container-contents">
                <div className="detail-section5__container-contents-part1">
                    <UserImg data={data} adress={homeData?.search_adress}></UserImg>
                </div>
                <textarea readOnly spellCheck={false}  value={data?.hostText} className="detail-section5__container-contents-part2">

                </textarea>
            </div>

        </div>
    )
}


export default DetailSection5