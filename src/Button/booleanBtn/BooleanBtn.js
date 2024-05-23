import React,{useState} from "react";
import { useSearchParams } from "react-router-dom";
import './BooleanBtn.css'

function BooleanBtn({keyValue, text}){

    const [SearchParams,setSearchParams] = useSearchParams()
    const [toggle, setToggle] = useState(false)
    function bool_filter_data(){
        setToggle(!toggle)
        if(!toggle){
            SearchParams.set(keyValue,'1')
            setSearchParams(SearchParams)
        }else{
            SearchParams.delete(keyValue)
            setSearchParams(SearchParams)
        }
    }

    return(
        <button className={`boolean_btn ${toggle ? 'active' : ''}`} onClick={bool_filter_data}>{text}</button>
    )
}

export default BooleanBtn