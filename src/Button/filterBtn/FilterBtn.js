import React,{useState} from "react";
import { useSearchParams } from "react-router-dom";
import './FilterBtn.css'



function FilterBtn({text,keyValue}){

    const [toggle, setToggle] = useState(false)
    const [SearchParams,setSearchParams] = useSearchParams()

    function filterData(){
        setToggle(!toggle)

        if(!toggle){
            SearchParams.append(keyValue, text)
            setSearchParams(SearchParams)
        }else{
            const copiedParams = SearchParams.getAll(keyValue)
            const filterParams = copiedParams.filter((ele)=>{
                return ele !== text})
            SearchParams.delete(keyValue)
            filterParams.map((ele)=>{SearchParams.append(keyValue,ele)})
            setSearchParams(SearchParams)
        }
    }


    return(
        <button className={`filter-btn ${toggle ? 'active' : ''}`} onClick={filterData}>{text}</button>
    )
}

export default FilterBtn