import React from "react";
import './detail_section6.scss'
import default_data from "@/util/default_data/default_data";

function DetailSection6({data, role}){   
    console.log(data)
    return(
        <div className="detail-section6__container">
            <div className="detail-section6__container-title">
                <span>확인 사항</span>
            </div>
            <div className="detail-section6__container-contents">
                {/* check in out rules */}
                <div className="detail-section6__container-item">
                    <div className="detail-section6__container-item-title">
                        <span>입 · 퇴실 규칙</span>
                    </div>
                    <div className="detail-section6__item-check-time-wrapper">
                        <span>체크인 시간 · {data.check_time.check_in.name} 이후</span>
                        <span>체크아웃 시간 · {data.check_time.check_out.name} 이후</span>
                        <span>게스트 정원 · {data.capacity}명</span>
                        {data.comunication && 
                        <div className='detail-section6__item-check-time-comunication'>
                            <span>{data.comunication.name}</span>
                        </div>}
                    </div>
                    <div className="detail-section6__item-footer">
                        <button>자세히 보기</button>
                        <img src={default_data.d_imgs.drop_arrow}/>
                    </div>
                </div>
                {/* accomodation rules */}
                <div className="detail-section6__container-item">
                    <div className="detail-section6__container-item-title">
                        <span>숙소 규칙</span>
                    </div>
                    <div className="detail-section6__rule-wrapper">
                        {data?.rules.map((el, id)=>{
                            return(
                                <div className="detail-section6__rule-box" 
                                     key={id}>
                                    <span>
                                        {el.text} · 
                                    </span>
                                    <span style={{color : el.state ? '#1273E4' : '#C13515'}}>
                                        {el.name === 'addrule' && !el.state ? '없음' :
                                        el.name !== 'addrule' && !el.state ? '허용 안함' :
                                        el.name === 'animal' && el.state ? `반려동물 ${el.count}까지 허용` : 
                                        el.name === 'addrule' && el.state ? '았음' : 
                                        '허용'}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="detail-section6__item-footer">
                        <button>자세히 보기</button>
                        <img src={default_data.d_imgs.drop_arrow}/>
                    </div>
                </div>
                <div className="detail-section6__container-item">
                    <div className="detail-section6__container-item-title">
                        <span>환뷸 규정</span>
                    </div>
                    <div></div>
                </div>

            </div>
        </div>
    )
}

export default DetailSection6