import React,{useState} from "react";
import './FilterBtn.css';

import { state_store, reference_store } from "../../../utilData/UtilFunction"; 
import useButtonFilterbtnBusiness from "../hook-store/business-hooks/button-filterbtn-business";
import useButtonFilterbtnStyle from "../hook-store/style-hooks/button-filterbtn-style";

function FilterBtn({text,keyValue, modal}){

    // state
    const [toggle, setToggle] = useState(false)

    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // business
    const {filter_data_url, filter_data_state} = useButtonFilterbtnBusiness(undefined, state_store([
            {'toggle':toggle,
            'setToggle':setToggle}
        ]),undefined,
            {
                'keyValue':keyValue,
                'text':text
            })

    // style
    const {} = useButtonFilterbtnStyle()


    return(
        <button className={`filter-btn ${toggle ? 'fil_active' : ''}`} onClick={!modal ? filter_data_url : filter_data_state}>{text}</button>
    )
}

export default FilterBtn