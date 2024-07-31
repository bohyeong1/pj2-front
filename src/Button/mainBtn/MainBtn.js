import React,{useState} from "react";
import './MainBtn.css'
import default_data from "../../utilData/defaultData";


function MainBtn({keyword,total,drop_function}){
    const [toggle, setToggle] = useState({key:'default'})

    function main_click(){
        
    }

    return(
        <>
            {total ? <button className={`main-btn ${toggle.key === 'default' ? 'main_active' : ''}`}>전체</button>:null}
            {default_data[keyword].map((el,id)=>{
                return <button key={id} className={`main-btn ${toggle.key === el.name ? 'main_active' : ''}`} onClick={main_click}>{el.name}</button>
            })}    
        </>
    )
}

export default MainBtn