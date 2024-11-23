import { useGetUserEvaluations } from "@/util/apis/user/user_information"
import { useEffect } from "react"

function useUserProfileMainBusiness(cons, states, refs, props){
    // =================================================
    // const //
    const {
        user_data,
        limit
    } = cons

    // =================================================
    // states //
    const {
        main_view,
        setMain_view,
        original_view,
        setOriginal_view,
        skip_level,
        setSkip_level
    } = states

    // =================================================
    // react query //
    const {data, isLoading, isError} = useGetUserEvaluations(user_data._id)

    // =================================================
    // set initial data //
    useEffect(()=>{
        if(data){
            setMain_view(data)
            setOriginal_view(data)
        }
    },[data])

    return {
        data,
        isLoading,
        isError
    }
}

export default useUserProfileMainBusiness