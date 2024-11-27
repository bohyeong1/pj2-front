import React,{useState} from "react";
import { useSearchParams } from "react-router-dom";
import './boolean_button.scss'

function BooleanButton({keyValue, text}){

    const [SearchParams,setSearchParams] = useSearchParams()
    const [toggle, setToggle] = useState(false)
    function bool_filter_data(){
        alert('할인 데이터 베이스 개발 준비중에 있습니다...')
        // setToggle(!toggle)
        // if(!toggle){
        //     SearchParams.set(keyValue,'1')
        //     setSearchParams(SearchParams)
        // }else{
        //     SearchParams.delete(keyValue)
        //     setSearchParams(SearchParams)
        // }
    }

    return(
        <button className={`boolean_btn ${toggle ? 'active' : ''}`} onClick={bool_filter_data}>{text}</button>
    )
}

export default BooleanButton