import React from "react";
import './Search-descripton.css'
import { useNavigate } from "react-router-dom";

function Search_descripton({data, title}){

    const navigator = useNavigate()

    return(
        <div className="Search_descripton-container">
            <div className="Search_descripton-title">{title}</div>
            <div className="Search_descripton-contents">
                {data?.map((el, id)=>{
                    return(
                        <span key={id} onClick={()=>{navigator(`/SubApp/${el.city}`)}}>{el.city}</span>
                    )
                })}
            </div>

        </div>
    )

}

export default Search_descripton