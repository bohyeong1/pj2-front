import { useEffect } from "react"
import default_data from "@/util/default_data/default_data";
import { useGetCommonListAccomodation } from "@/util/apis/common/common_list";
import { useSearchParams } from "react-router-dom";

function useListBusiness(cons, states, refs, props){

    // =================================================
    // react query //
    const {data, isLoading, isError, refetch} = useGetCommonListAccomodation()

    // =================================================
    // query string //
    const [query_string] = useSearchParams()

    // =================================================
    // refetch //
    useEffect(()=>{
        refetch()

    }, [query_string.toString(), refetch])

    // =================================================
    // initialized scroll //
    useEffect(() => {
        window.scrollTo(0, 0)
    },[data])

    return {
        data, 
        isLoading, 
        isError, 
        refetch
    }
}

export default useListBusiness