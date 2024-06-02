import React from "react";
import './Det-sec1.css';

// const amenitiesMap = {
//     "안뜰전망": '아이콘1',
//     "주방": "아이콘2"
// }

function Det_sec1({data, user}){
    console.log(data)
    if(data){
        return(
            <div className="det-sec1-container">
                <div className="det-sec1-sec1">
                    <div className="det-sec1-sec1-1">
                        <div className="de-s1-s1-1-tex1">{`${data.title}`}</div>
                        <div className="de-s1-s1-1-tex1">{`최대 인원 ${data.capacity}명 침실 ${data.base_facility[0].counts}개 침대 ${data.base_facility[1].counts}개 
                        욕실 ${data.base_facility[3].counts}개 소파 ${data.base_facility[2].counts}개`}</div>
                    </div>
                    <div className="det-sec1-sec2-1">{`평점 ${data.evaluation} 후기 ${data.reply}`}</div>
                    <div className="det-sec1-sec3-1">
                        <div className="de-s1-s1-3-tex1">{`집주인 ${user.name}씨`}</div>
                        <div className="de-s1-s1-3-tex2">{`판매경력 ${user.carrer}일`}</div>
                    </div>
                
    
                </div>
                <div className="det-sec1-sec2">
                    <div className="det-sec1-sec2-1">편의시설</div>
                    <div className="det-sec1-sec2-2">{data.service_facility.map((ele,id)=>{
                        return (
                            <span key={id}>{ele.name}. </span>
                        )})}</div>
                </div>
                <div className="det-sec1-sec3">{data.summary}</div>
                <div className="det-sec1-sec4">달력 / 예약가능날짜</div>
            </div>
        )
    }

}

export default Det_sec1