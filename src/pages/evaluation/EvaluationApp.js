import React, {useState, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Evaluation.css'
import Main_menu from "../../utilComponent/menu/main-menu/main-menu";
import Footer from "../../utilComponent/menu/footer/Footer";
import default_data from "../../utilData/defaultData";
import EvaluModal from "../../utilComponent/modal/evaluModal/EvaluModal";
import connectData from "../../utilData/UtilFunction";

function Evaluation(){
    // 네비게이터
    const navigator = useNavigate()

    const params = useParams()

    //ref
    const evaluOutput = useRef([])
    const evalu_stringstate = useRef()
    const evalu_alert = useRef()
    const evalu_text_ref = useRef()

    // state
    const [sellectData, setSellectData] = useState()
    const [textData, setTextData] = useState()
    const [evaluModal, setEvaluModal] = useState(false) ///평가 모달 상태값

    const [totalAvg, setTotalAvg] = useState()

    // 평가 모달 껏다 키기
    function evaluModalState(){
        setEvaluModal(!evaluModal)
    }

    function pullEvaluData(data){
        setEvaluModal(false)
        let totalAvg = 0
        for(let i=0; i< data.evaluation.length; i++){
            evaluOutput.current[i].innerText = `평점 : ${data.evaluation[i].grade}`
            totalAvg += Number(data.evaluation[i].grade)

        }
        //평균평점
        const totalObj = {
            name:'avgGrade',
            title:'전체 평점',
            url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEBklEQVR4nO1Zz6tbRRSeKrUtuLGira/qw5qXc2762s3rRou/8EeRiq2C4EIU6u5B0db+Aa5aQUGlViqKFQWFiIiIKD5oUTG5Z5InXXRV0IV7pb9tbe0nM0nzkpm5t8lNbkwwB2Y1d873fTNzzsycq9TEJjax/9Qg0QbT1LgbhD6D0KdqnA31IkP4n0Yb41WB8CfQDNuEPlbjaFgsFaDpUkuI5svQRGrcDJo+ahNxtR1W42TQM+ud1VhalWo0o8bFoOmDgIhmo/fVOBjqpTshdDFRiNDfiIt3qVE3CB9yyJ9utjYxfEiNskFvuAPCF5wV2AdN+71VWYym1agahN5xCJ/Fz+tvhfDNEDrj9B1Qo2io823QfN7ZQq+3+jW/4fRdQGVmnRolA9R1Zoad2DgPKa1tfSOltb5QOmDGDp/wTxtvQsxziPl5aHoNmsvQXLdbyM9Ob3rjhd8KfHcRwr9CaAHC70HTS9DRI/Ys6kckqrNrEEf3QdNOG6TCn0PzMQidSz4bvPYXFmnK871IU7avWz9iMY81OJiEQTstt+rsmnQRQrt6IJtCIDm9BtJzRgzalS6mxrshfCUD+SsQ+h2aj5htkX594SP226w4Nd6dKmIJjOdTQH6D5u8gdBDCe6DpSfsKPDq9sivn7ThHp1fasdYH77E+je8GRliE5vneQOLoRfsg8h2WUZ9b3ivprnHL6vqOd0w/IlpONT8bvsXS1zhRWDFwEfW55RD6IjB5lyH8Qn/OhZ6xVwo/2L7Jsp0ScY6XboCmL4MidPG5wYAIP5GQNr9F5fZVffs/UVgB4a+CZ4zmpwciogUW87agGKHv+xFjxlofobMo5m0DFdECrdGD3uWvETM/4HjpxowiFoIHYcyP5SKiCzF7e/alaW9AxBmDkQ97l0CtuKURhG0EasXtGfxs9wK7VtySD+sQgUpptTeTGR5KZoznp1JanQ/rEAHNDzgETgFqWc9+oJZB+GTn1oruz4d10hWmMz6q2X1R1ZmU+cGyTQXnd7sp8UDTvTajCcWQ6OGuSkdCB3MX0Ab+ozOLL3f282zz0eVmpAXzMPNu204qV0MU8kdnxuJHW8FrXnnhy2b75a98teJozgtHyJ/DEVGZWeeRqxY32aevWwpKa+b+ZkXTZj8D0lT+QoS2BkidTVmBk15mutZYoa35Cwmdxsnv7bdtXcucO0KvehXH5LGvDEEIH+5qy4SKD78UbmlWX9ILEMIfDkNILQHcBHgZ9cLd3RW6bennUoIvPYxCXGhPL5iAz/SP0Yh36wNC53It3DV+pzkChDb37bdOG71zp37tlc0OKPxUM9dXENNDOfi/p1FOYiCOdgza/xJQHO2ALj6eG0DTDEauQiY2sf+h/Qut9derVNBHwQAAAABJRU5ErkJggg==',
            grade:totalAvg / data.evaluation.length
        }

        setSellectData([...data.evaluation, totalObj])
        setTotalAvg(totalObj)
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
        const evaluationData = await connectData(`${default_data.d_base_url}/api/evalu/regist`, 'POST',{
            writerid : userData._id,
            homeid : params.evaluation,
            evaluation : sellectData,
            text : textData,
            totalAvg : totalAvg
        })

        navigator('/Private_history')
    }

    return(
        <div className="EvaluationApp-container">
            <Main_menu></Main_menu>
            <div className="Evaluation-con-content">
                <div className="Evaluation-con-con-title">후기를 작성하시고 <br></br> 숙소의 평점을 메겨주세요!</div>

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
                <button className="Evaluation-con-con-b-btn" onClick={()=>{setEvaluModal(true)}}>평가하기</button>

                <div className="Evaluation-con-con-b2">
                    <div className="Evaluation-con-con-b2-d1">리뷰 작성하기</div>
                    <textarea className="Evaluation-con-con-b2-d2" placeholder="숙소에 대한 리뷰를 작성해 주세요!"  ref={evalu_text_ref}  onChange={evaluTextInputChange}
                    spellCheck={false}
                    style={{boxSizing:'border-box', padding : '10px', lineHeight:'2rem'}}></textarea>
                </div>

                <div className="Evaluation-con-con-b3">
                    <div ref={evalu_stringstate} className="Evaluation-con-con-b3-d1">0/200</div>
                    <div ref={evalu_alert} className="Evaluation-con-con-b3-d2" style={{color:'red', display:'none'}}>200자 까지 입력할 수 있습니다</div>

                    <button onClick={fetchEvaluation}>평가완료</button>
                </div>

            </div>
            <EvaluModal  pullEvaluData={pullEvaluData} evaluModalState={evaluModalState} evaluModal={evaluModal}></EvaluModal>
            <div className="Evaluation-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Evaluation

