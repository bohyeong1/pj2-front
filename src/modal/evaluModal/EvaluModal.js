import React, {useState, useRef} from "react";
import './EvaluModal.css'
import default_data from "../../utilData/defaultData";
import Evalu_star from "./evalu_star/Evalu_star";





function EvaluModal({displayState,pullEvaluData}){
    ///숙소 평가 데이터
    const [evaluation, setEvaluation] = useState({
        evaluation : default_data.d_evaluation
    })

    // console.log(evaluation)

    //ref
    const gradeOutput = useRef([])

    function pullEvaluationData(index,data,setdata){
        let copiedObj = data
        copiedObj.evaluation[index].grade = setdata
        setEvaluation(copiedObj)
        // console.log(gradeOutput)
        gradeOutput.current[index].innerText = copiedObj.evaluation[index].grade + '점'
    }



    // 숙소 평가 등록
    function registEvalu(){
        try{
            for(const property of evaluation.evaluation){
                // console.log(property)
                if(!property.grade){
                    throw new Error('평가를 완료해주세요')
                }
            }

            pullEvaluData(evaluation)
        }catch(e){
            alert(e.message)
        }
    }

    return(
        <>
        <div className="EvaluModal-wrapper" style={{display:`${displayState ? 'block':'none'}`}}>
        </div>
        <div className="EvaluModal-container"  style={{display:`${displayState ? 'block':'none'}`}}>
            <div className="EvaluModal-title">
                <button className="EvaluModal-title-b1">x</button>
                <div className="EvaluModal-title-b2">숙소를 평가해 주세요!</div>
                <button className="EvaluModal-title-b3" onClick={registEvalu}>평가</button>
            </div>
            <div className="EvaluModal-content">
               {default_data.d_evaluation.map((el,id)=>{
                    return(
                        <div className="EvaluModal-con-b" key={id}>
                            <div className="EvaluModal-con-b-s1">
                                <img src={el.url} className="EvaluModal-con-b-s1-p1"></img>
                                <div className="EvaluModal-con-b-s1-p2">{el.title}</div>
                            </div>
                            <Evalu_star index={id} evaluData={evaluation} pullFunction = {pullEvaluationData}></Evalu_star>
                            
                            <div className="EvaluModal-con-b-s3" ref={(el)=>{gradeOutput.current[id] = el}}>
                                - 점
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