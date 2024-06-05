import React, {useState, useRef} from "react";
import { useParams } from "react-router-dom";
import './Evaluation.css'
import Main_menu from "../../menu/main-menu/main-menu";
import Footer from "../../menu/footer/Footer";
import default_data from "../../utilData/defaultData";
import EvaluModal from "../../modal/evaluModal/EvaluModal";
import connectData from "../../utilData/Utildata";

function Evaluation(){

    const params = useParams()

    //ref
    const evaluOutput = useRef([])
    const evalu_stringstate = useRef()
    const evalu_alert = useRef()
    const evalu_text_ref = useRef()

    // state
    const [displayState, setDisplayState] = useState(false)
    const [sellectData, setSellectData] = useState()
    const [textData, setTextData] = useState()

    function pullEvaluData(data){
        // setSellectData(data)
        setDisplayState(false)
        let totalAvg = 0
        for(let i=0; i< data.evaluation.length; i++){
            evaluOutput.current[i].innerText = `평점 : ${data.evaluation[i].grade}`
            totalAvg += Number(data.evaluation[i].grade)

        }
        //평균평점
        const totalObj = {
            name:'avgGrade',
            title:'평균평점',
            url:'',
            grade:totalAvg / data.evaluation.length
        }

        // console.log([...data.evaluation, totalObj])
        setSellectData([...data.evaluation, totalObj])

        // console.log(totalObj)
    }

    const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터


    ////////////////////디바운싱
    function debounce(func, delay) {
        let timer;
        return function() {
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        }
    }
    
    //////////////////타이틀 스테이트값 1초 디바운스 한후에 스테이트에 담기 ㅇㅇ
    function handleFn(){
        setTextData(evalu_text_ref.current.value)
    }
    const debounceSetTitle = debounce(handleFn,1000)
    
    function evaluTextInputChange(){
        const length = evalu_text_ref.current.value.length
        evalu_stringstate.current.innerText = `${length}/200`
        if(length>200){
            evalu_alert.current.style.display = 'block'
        }else{
            evalu_alert.current.style.display = 'none'
            debounceSetTitle()
        }
    }


    async function fetchEvaluation(){
        const evaluationData = connectData(`${default_data.d_base_url}/api/evalu/regist`, 'POST',{
            writerid : userData._id,
            homeid : params.evaluation,
            evaluation : sellectData,
            text : textData
        })
    }

    // console.log(textData)
    console.log(sellectData)

    // console.log(totalGrade)


    return(
        <div className="EvaluationApp-container">
            <Main_menu></Main_menu>
            <div className="Evaluation-con-content">
                <div className="Evaluation-con-con-title">후기를 작성하시고 <br></br> 숙소의 평점을 메겨주세요!</div>
                <button className="Evaluation-con-con-b-btn" onClick={()=>{setDisplayState(true)}}>평가하기</button>
                <div className="Evaluation-con-con-b1">
                    {default_data.d_evaluation.map((el,id)=>{
                        return(
                            <div className="Evaluation-con-con-b-d" key={id}>
                                <div className="Evaluation-con-con-b-d-s1">
                                    <img src={el.url} className="Evaluation-con-con-b-d-s1-p1"></img>
                                    <div className="Evaluation-con-con-b-d-s1-p2">{el.title}</div>
                                    <div className="Evaluation-con-con-b-d-s1-p3" ref={(el)=>{evaluOutput.current[id]=el}}>{`평점 :`}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="Evaluation-con-con-b2">
                    <div className="Evaluation-con-con-b2-d1">리뷰 작성하기</div>
                    <textarea className="Evaluation-con-con-b2-d2" placeholder="숙소에 대한 리뷰를 작성해 주세요!"  ref={evalu_text_ref}    onChange={evaluTextInputChange}
                    style={{boxSizing:'border-box', padding : '10px', lineHeight:'2rem'}}></textarea>
                </div>

                <div className="Evaluation-con-con-b3">
                    <div ref={evalu_stringstate} className="Evaluation-con-con-b3-d1">0/200</div>
                    <div ref={evalu_alert} className="Evaluation-con-con-b3-d2" style={{color:'red', display:'none'}}>200자 까지 입력할 수 있습니다</div>

                    <button onClick={fetchEvaluation}>평가완료</button>
                </div>

            </div>
            <EvaluModal displayState={displayState} pullEvaluData={pullEvaluData}></EvaluModal>
            <div className="Evaluation-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Evaluation