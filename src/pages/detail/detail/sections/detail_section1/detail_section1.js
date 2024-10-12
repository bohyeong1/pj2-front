import React from "react";
import './detail_section1.scss';
import default_data from "../../../../../utilData/defaultData";


function DetailSection1({data, user, evaluations, role}){
    console.log(data)
    const date = new Date(user?.createAt)

    if(data){
        return(
            <div className="detail-section1__container">
                <div className="detail-section1__section1">
                    <div className="detail-section1__section1-part1">
                        {/* 숙소 제목 */}
                        <div className="detail-section1__section1-part1-text1">
                            <span>{`${data.category.name}`} · {`${data.space_category.name}`}</span>
                            <span>{`${data.title}`}</span>
                        </div>
                        <div className="detail-section1__section1-part1-text2">
                            <span>최대 인원</span>
                            {data.base_facility.length && <span>
                                {`${data.capacity}명. 침실 ${data.base_facility[0].counts ? data.base_facility[0].counts : 0}개. 
                                침대 ${data.base_facility[1].counts ? data.base_facility[1].counts : 0}개. 
                                욕실 ${data.base_facility[3].counts ? data.base_facility[3].counts: 0}개. 소파 ${data.base_facility[2].counts ? data.base_facility[2].counts : 0}개`}
                            </span>}
                        </div>
                    </div>
                    <div className="detail-section1__section1-part2">                   
                        <div className="detail-section1__section1-part2-box1">
                            <img style={{width:'20px', height:'20px'}} src={default_data.d_imgs.star}>
                            </img>{`${data.avgEvaluation.length != 0 ? (data.avgEvaluation.reduce((prev, cur) => {return prev + cur},0)/data.avgEvaluation.length).toFixed(2) : 
                            '미평가'}`}
                        </div>
                            <span>{`후기 ${evaluations?.length}개`}</span>
                    </div>
                    <div className="detail-section1__section1-part3">
                        <div className="detail-section1__section1-part3-text1">
                            <span>집주인</span> {`${user.name}씨`}
                        </div>
                        <div className="detail-section1__section1-part3-text2">
                            <span>가입날짜</span> 
                            {`${date.getFullYear() + '년 ' + date.getMonth() + '월 ' + date.getDate() + '일'}`}
                        </div>
                    </div>               
    
                </div>

                <div className="detail-section1__section2">
                    <div className="detail-section1__section2-part1">편의시설</div>
                    <div className="detail-section1__section2-part2">{data.service_facility.map((ele,id)=>{
                        return (
                            <div key={id}   style={{display:"flex", height:'50px', alignItems:'center', gap:'10px'}}>
                                <img src={ele.url} style={{width:'30px', height:'30px'}}></img>
                                <span style={{width:'100px'}}>{ele.name}</span>
                            </div>
                        )})}
                    </div>
                </div>

                <div className="detail-section1__section3">
                    <div className="detail-section1__section3-part1">{data.title}</div>
                    <textarea readOnly spellCheck={false} className="detail-section1__section3-part2" value={data.summary}></textarea>
                </div>
            </div>
        )
    }

}

export default DetailSection1