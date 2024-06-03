import React from "react";
import './Evaluation.css'
import Main_menu from "../../menu/main-menu/main-menu";
import Footer from "../../menu/footer/Footer";
import default_data from "../../utilData/defaultData";
import EvaluModal from "../../modal/evaluModal/EvaluModal";

function Evaluation(){
    return(
        <div className="EvaluationApp-container">
            <Main_menu></Main_menu>
            <div className="Evaluation-con-content">
                <div className="Evaluation-con-con-title">후기를 작성하시고 <br></br> 숙소의 평점을 메겨주세요!</div>
                <button className="Evaluation-con-con-b-title">평가하기</button>
                <div className="Evaluation-con-con-box">
                    {default_data.d_evaluation.map((el,id)=>{
                        return(
                            <div className="Evaluation-con-con-b-d" key={id}>
                                <div className="Evaluation-con-con-b-d-s1">
                                    <img src={el.url} className="Evaluation-con-con-b-d-s1-p1"></img>
                                    <div className="Evaluation-con-con-b-d-s1-p2">{el.title}</div>
                                    <div className="Evaluation-con-con-b-d-s1-p3">{`평점 :`}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <EvaluModal></EvaluModal>
            <div className="Evaluation-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Evaluation