import { useSearchParams } from "react-router-dom"

function useListContentsBusiness(cons, states, refs, props){

    // =================================================
    // query string //
    const [query_string, setQuery_string] = useSearchParams()

    // =================================================
    // click pagenation //
    function click_pagenation(target){
        setQuery_string((prev) => ({...Object.fromEntries(prev), page : target}))
    }
    
    return {click_pagenation}
}

export default useListContentsBusiness