import React, {useState} from "react";
import { useRef } from "react";
import './Evalu_star.css'
import default_data from "../../../../utilData/defaultData";

function Evalu_star({index,evaluData,pullFunction}){
    //state
    const [radioState, setRadioState] = useState()

    //ref
    const radioRef = useRef([])

    // 평점 클릭
    function clickRadio(e){
        const target = e.target.id
        // console.log(e.target.previousSibling.value)
        setRadioState(target)  
        
        const targetGrade = Number(e.target.previousSibling.value)

        pullFunction(index,evaluData,targetGrade)
    }

    // console.log(evaluData)

    return(
        <div className ='Evalu_star-container' onClick={clickRadio}>
            {default_data.star.map((el,id)=>{
                return(
                    <div key={id}>
                        <input type='radio' value={el.value} className='star'></input>
                        <label className={`star_display ${id <= radioState ? 'change_star' : ''}`} id={id}>★</label>
                    </div>
                    
                )
            })}
        </div>
    )
}

export default Evalu_star