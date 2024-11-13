import { useQuery, useQueryClient } from "@tanstack/react-query"
import { get_reservation_massage_list } from "@/util/apis/user/user_reservation"

function useUserReservationMessageBusiness(cons, states, refs, props){

    // =================================================
    // const //
    const {
        search_param
    } = cons

    // =================================================
    // react query //
    const query_client = useQueryClient()

    const {data, error, isLoading} = useQuery({
        queryKey : ['reservation_message_list', {type : search_param.get('role')}], 
        queryFn : ({queryKey}) => {
            const [, parameter] = queryKey
            return get_reservation_massage_list(parameter)
        }, 
        onError : (e) => {
            query_client.removeQueries('reservation_message_list')
        }
    })

    return {
        data,
        error,
        isLoading
    }
}

export default useUserReservationMessageBusiness