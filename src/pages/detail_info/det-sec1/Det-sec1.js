import React from "react";
import './Det-sec1.css';
import default_data from "../../../utilData/defaultData";

// const amenitiesMap = {
//     "안뜰전망": '아이콘1',
//     "주방": "아이콘2"
// }

function Det_sec1({data, user, evaluations}){

    console.log(user)

    const date = new Date(user?.createAt)



    if(data){
        return(
            <div className="det-sec1-container">
                <div className="det-sec1-sec1">
                    <div className="det-sec1-sec1-1">
                        <div className="de-s1-s1-1-tex1">{`${data.search_adress}`}</div>
                        <div className="de-s1-s1-1-tex2"><span>최대 인원</span>{`${data.capacity}명. 침실 ${data.base_facility[0].counts ? data.base_facility[0].counts : 0}개. 
                        침대 ${data.base_facility[1].counts ? data.base_facility[1].counts : 0}개. 
                        욕실 ${data.base_facility[3].counts ? data.base_facility[3].counts: 0}개. 소파 ${data.base_facility[2].counts ? data.base_facility[2].counts : 0}개`}</div>
                    </div>
                    <div className="det-sec1-sec1-2">                   
                        <div className="det-sec1-sec1-2-b1">
                            <img style={{width:'20px', height:'20px'}} src={default_data.d_imgs.star}>
                            </img>{`${data.avgEvaluation.length != 0 ? (data.avgEvaluation.reduce((prev, cur) => {return prev + cur},0)/data.avgEvaluation.length).toFixed(2) : 
                            '미평가'}`}
                        </div>
                            <span>{`후기 ${evaluations?.length}개`}</span>
                    </div>
                    <div className="det-sec1-sec1-3">
                        <div className="de-s1-s1-3-tex1"><span>집주인</span> {`${user.name}씨`}</div>
                        <div className="de-s1-s1-3-tex2"><span>가입날짜</span> {`${date.getFullYear() + '년 ' + date.getMonth() + '월 ' + date.getDate() + '일'}`}</div>
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
                    <textarea readOnly spellCheck={false} className="det-sec1-sec3-2" value={data.summary}></textarea>
                </div>
            </div>
        )
    }

}

export default Det_sec1