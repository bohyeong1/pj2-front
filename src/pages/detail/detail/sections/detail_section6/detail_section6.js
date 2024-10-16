import React from "react";
import './detail_section6.scss'


function DetailSection6({data, role}){   

    return(
        <div className="Det_sec6-container">
            <div className="Det_sec6-con-title">숙소 이용 규칙</div>
            <div className="Det_sec6-con-wrapper">
                {data?.rules.map((el, id)=>{
                    return(
                        <div className="Det_sec6-con-box" key={id}>
                            <div className="Det_sec6-con-b-d1">{el.text}</div>
                            <textarea readOnly className="Det_sec6-con-b-d2" style={{color : `${el.state ? 'black' : 'red'}`}}>
                                {`${el.state ? `${id === 0 ? `${el.count}마리 까지 허용` : 
                                    `${id === 4 ? `${el.summary}` : '허용'}`}` : 
                                    `${id === 4 ? '없음' : '허용 안함'}`}`}
                            </textarea>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DetailSection6