import { useSearchParams } from "react-router-dom";

function useButtonFilterbtnBusiness(data, states, refs, props){
    // =================================================
    // query string //
    const [SearchParams,setSearchParams] = useSearchParams()

    // =================================================
    // props //
    const {
        value, 
        text
    } = props

    // =================================================
    // check button //
    function filter_data_url(){
        if(!SearchParams.getAll(value).includes(text)){
            SearchParams.append(value, text)
            setSearchParams(SearchParams)
        }else{
            const copied_query = SearchParams.getAll(value)
            const filtered_query = copied_query.filter((el)=>{
                return el !== text})
            SearchParams.delete(value)
            filtered_query.forEach((el)=>{SearchParams.append(value, el)})
            setSearchParams(SearchParams)
        }
    }

    return {
        filter_data_url,
        SearchParams
    }
}

export default useButtonFilterbtnBusiness