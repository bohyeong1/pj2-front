import { useSearchParams } from "react-router-dom"

function useListSideBarBusiness(cons, states, refs, props){

    // =================================================
    // query string //
    const [query_string, setQuery_string] = useSearchParams()

    // =================================================
    // click initialized button //
    function click_initialized_button(){
        setQuery_string((prev) => {
            const filtering_query = ['category', 'keywords', 'service_facility']

            const filtered_query = Object.fromEntries(
                [...prev].filter(([key]) => !filtering_query.includes(key))
            )
                
            return {
                ...filtered_query, 
                page : 1,
                ['price-min'] : 0,
                ['price-max'] : 500000 
            }
        })

    }

    return {
        click_initialized_button
    }
}

export default useListSideBarBusiness