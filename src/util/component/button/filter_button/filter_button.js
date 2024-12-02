import './filter_button.scss';
import useButtonFilterbtnBusiness from "../hook-store/business-hooks/button-filterbtn-business";
import useButtonFilterbtnStyle from "../hook-store/style-hooks/button-filterbtn-style";

function FilterButton({text, value}){

    // =================================================
    // hooks //
    // business
    const {
        filter_data_url,
        SearchParams
    } = useButtonFilterbtnBusiness(undefined, 
        undefined,
        undefined,
        {
            value,
            text
        }
    )
    // style
    const {} = useButtonFilterbtnStyle()

    return(
        <button 
            className={`filter-btn ${SearchParams.getAll(value).includes(text) ? 'fil_active' : ''}`} 
            onClick={filter_data_url}>
                {text}
        </button>
    )
}

export default FilterButton