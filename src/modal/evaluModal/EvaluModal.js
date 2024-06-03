import React, {useState, useRef} from "react";
import './EvaluModal.css'
import default_data from "../../utilData/defaultData";
import Evalu_star from "./evalu_star/Evalu_star";





function EvaluModal(){



    


    return(
        <>
        <div className="EvaluModal-wrapper">
        </div>
        <div className="EvaluModal-container">
            <div className="EvaluModal-title">숙소를 평가해 주세요!</div>
            <div className="EvaluModal-content">
               {default_data.d_evaluation.map((el,id)=>{
                    return(
                        <div className="EvaluModal-con-b" key={id}>
                            <div className="EvaluModal-con-b-s1">
                                <img src={el.url} className="EvaluModal-con-b-s1-p1"></img>
                                <div className="EvaluModal-con-b-s1-p2">{el.title}</div>
                            </div>
                            <Evalu_star></Evalu_star>
                            
                            <div className="EvaluModal-con-b-s3">
                                평점 :
                            </div>
                        </div>
                    )
               })} 
            </div>
        </div>
        </>
    )
}

export default EvaluModal