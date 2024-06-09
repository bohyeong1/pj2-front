import React from "react";
import './UserImg.css'
import default_data from "../defaultData";

function UserImg({data}){

    console.log(data)

    return(
        <div className="UserImg-container">
            <div className="UserImg-con-sec1">
                <div className="UserImg-con-s1-b1">
                    <img className="UserImg-img" src={data?.profileImg ? data.profileImg : default_data.d_userImg.man}></img>
                </div>
                <div className="UserImg-con-s1-b2">
                    {data?.name}
                </div>
            </div>
            <div className="UserImg-con-sec2">
                <div className="UserImg-con-s2-b1">
                    <div className="UserImg-con-s2-b1-t1">지역</div>
                    <div className="UserImg-con-s2-b1-t2">ㅇㅇ</div>
                </div>
                <div className="UserImg-con-s2-b2">
                    <div className="UserImg-con-s2-b2-t1">호스트 경력</div>
                    <div className="UserImg-con-s2-b2-t2">ㅇㅇ</div>
                </div>
            </div>
        </div>
    )
}

export default UserImg