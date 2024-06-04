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
                        <div className="de-s1-s1-1-tex1">{`${data.search_adress}`}</div>
                        <div className="de-s1-s1-1-tex2">{`최대 인원 ${data.capacity}명. 침실 ${data.base_facility[0].counts ? data.base_facility[0].counts : 0}개. 
                        침대 ${data.base_facility[1].counts ? data.base_facility[1].counts : 0}개. 
                        욕실 ${data.base_facility[3].counts ? data.base_facility[3].counts: 0}개. 소파 ${data.base_facility[2].counts ? data.base_facility[2].counts : 0}개`}</div>
                    </div>
                    <div className="det-sec1-sec1-2">{`평점 ${data.evaluation} 후기 ${data.reply}`}</div>
                    <div className="det-sec1-sec1-3">
                        <div className="de-s1-s1-3-tex1">{`집주인 ${user.name}씨`}</div>
                        <div className="de-s1-s1-3-tex2">{`판매경력 ${user.carrer}일`}</div>
                    </div>               
    
                </div>

                <div className="det-sec1-sec2">
                    <div className="det-sec1-sec2-1">편의시설</div>
                    <div className="det-sec1-sec2-2">{data.service_facility.map((ele,id)=>{
                        return (
                            <div key={id}   style={{display:"flex", height:'50px', alignItems:'center', gap:'10px'}}>
                                <img src={ele.url} style={{width:'30px', height:'30px'}}></img>
                                <span style={{width:'100px'}}>{ele.name}</span>
                            </div>
                        )})}
                    </div>
                </div>

                <div className="det-sec1-sec3">
                    <div className="det-sec1-sec3-1">{data.title}</div>
                    <div className="det-sec1-sec3-2">{data.summary}</div>
                </div>
            </div>
        )
    }

}

export default Det_sec1