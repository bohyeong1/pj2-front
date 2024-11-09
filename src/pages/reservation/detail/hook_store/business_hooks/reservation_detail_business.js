import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { get_reservation_target } from "@/util/apis/user/user_reservation"

function useReservationDetailBusiness(cons, states, refs, props){

    // =================================================
    // parameter //
    const param = useParams()

    // =================================================
    // react query //
    const query_client = useQueryClient()

    const {data, error, isLoading} = useQuery({
        queryKey : ['reservation_target', param.house], 
        queryFn : ({queryKey}) => {
            const [, parameter] = queryKey
            return get_reservation_target(parameter)
        }, 
        onError : (e) => {
            query_client.removeQueries('reservation_target')
        },
        staleTime: 1000 * 60 * 30,
        cacheTime : 1000 * 60 * 60
    })

    return {
        data, 
        error, 
        isLoading
    }
}

export default useReservationDetailBusiness