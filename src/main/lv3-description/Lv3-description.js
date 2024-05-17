import React from "react";
import { Link } from "react-router-dom";
import './Lv3-description.css'
import Large_main from "../../picture/large-main/Large-main";

function Lv3_description({title,data}){
    console.log(data)
    return(
        <div className="lv3-description-container">
            <div className="lv3-description-title">{title}</div>
            <div className="lv3-description-content">
                <div className="lv3-content-container">
                    {data.map((ele,id)=>{  
                                           
                        return(
                        <div key={id} className="lv3-img-wrapper">
                            <div className="lv3-img-container">
                                <Large_main data={ele}></Large_main>
                            </div>
                            <div className="lv3-img-text">
                                <div className="lv3-img-tex1">{ele.keyword.map((ele)=>{return ele})}</div>
                                <div className="lv3-img-tex2-box">
                                    <div className="lv3-img-tex2-1">{ele.title}</div>
                                    <div className="lv3-img-tex2-2">할인 이벤트</div>
                                </div>
                                <div className="lv3-img-tex3">~6월 30일까지</div>

                            </div>
                        </div>
                        )                  
                                           
                    })}
                </div>
                
                    
                
            </div>
        </div>
    )
}

export default Lv3_description