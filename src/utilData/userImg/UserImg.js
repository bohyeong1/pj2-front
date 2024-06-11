import React from "react";
import './UserImg.css'
import default_data from "../defaultData";

function UserImg({data, adress}){

    const date = new Date(data?.createAt)
    // console.log(data)

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
                    <div className="UserImg-con-s2-b1-t2">{adress ? adress : '설정 안함'}</div>
                </div>
                <div className="UserImg-con-s2-b2">
                    <div className="UserImg-con-s2-b2-t1">가입 날짜</div>
                    <div className="UserImg-con-s2-b2-t2">{date.getFullYear() + '년 ' + date.getMonth() + '월 ' + date.getDate() + '일'}</div>
                </div>
            </div>
        </div>
    )
}

export default UserImg