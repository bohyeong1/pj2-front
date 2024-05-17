import React from "react";
import './Lv1-description.css'
import { Link } from "react-router-dom";
import Small_main from "../../picture/small-main/Small-main";






function Lv1_description({title, data}){
    
// console.log(data)

    return(
        <div className="lv1-description-container">
            <div className="lv1-description-title">{title}</div>
            <div className="lv1-description-content">
                <div className="lv1-content-container">
                    {data.map((ele,id)=>{                                              
                        return(
                        <div key={id} className="lv1-img-wrapper">
                            <div className="lv1-img-container">
                                <Small_main data={ele}></Small_main>
                            </div>
                            <div className="lv1-img-title">
                                {ele.cityName}
                            </div>
                        </div>
                        )                  
                        
                    })}
                </div>
                    
                
            </div>
        </div>
    )
}

export default Lv1_description