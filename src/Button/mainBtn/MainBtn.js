import React,{useState} from "react";
import './MainBtn.css'
import default_data from "../../utilData/defaultData";


function MainBtn({keyword,total,drop_function, toggle}){
    return(
        <>
            {total ? <button className={`main-btn ${toggle.key === 'default' ? 'main_active' : ''}`} data-value = 'default'  onClick={drop_function}>전체</button>:null}
            {default_data[keyword].map((el,id)=>{
                return <button key={id} className={`main-btn ${toggle.key === el.name ? 'main_active' : ''}`} onClick={drop_function} data-value={el.name}>{el.name}</button>
            })}    
        </>
    )
}

export default MainBtn