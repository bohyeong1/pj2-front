
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { get_reservation_pending_list } from "@/util/apis/user/user_reservation"
import { useNavigate } from "react-router-dom"

function useUserReservationPendingList(cons, states, refs, props){
    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // react query //
    const query_client = useQueryClient()

    const {data, error, isLoading} = useQuery({
        queryKey : ['reservation_pending_list'], 
        queryFn : get_reservation_pending_list, 
        onError : (e) => {
            query_client.removeQueries('reservation_pending_list')
        },
        staleTime: 1000 * 60 * 30,
        cacheTime : 1000 * 60 * 60
    })

    // =================================================
    // click box //
    function click_box(data){
        navigate(`/reservation/detail/${data._id}`)
    }

    return {
        data, 
        error, 
        isLoading,
        click_box
    }
}

export default useUserReservationPendingList