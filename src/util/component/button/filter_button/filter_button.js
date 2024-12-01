import {useState} from "react";
import './filter_button.scss';
import { state_store } from "@/util/function/util_function";
import useButtonFilterbtnBusiness from "../hook-store/business-hooks/button-filterbtn-business";
import useButtonFilterbtnStyle from "../hook-store/style-hooks/button-filterbtn-style";

function FilterButton({text,keyValue, modal}){

    // =================================================
    // states //
    const [toggle, setToggle] = useState(false)

    // =================================================
    // hooks //
    // business
    const {
        filter_data_url, 
        filter_data_state
    } = useButtonFilterbtnBusiness(undefined, 
        state_store([
            {toggle, setToggle}
        ]),
        undefined,
        {
            keyValue,
            text
        }
    )

    // style
    const {} = useButtonFilterbtnStyle()


    return(
        <button 
            className={`filter-btn ${toggle ? 'fil_active' : ''}`} 
            onClick={!modal ? filter_data_url : filter_data_state}>
                {text}
        </button>
    )
}

export default FilterButton