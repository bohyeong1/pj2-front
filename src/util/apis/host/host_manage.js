import { connect_data_width_cookies, file_data } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import query_key from "@/util/query_key/query_key";

// =================================================
// host reservation list get //
export function useGetHostReservationList(user_id, start_state){
    return useQuery(
        {
            queryKey : [query_key.host_reservation_list, user_id], 
            queryFn : async({queryKey}) => {
                const [, parameter] = queryKey
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/reservation/get-host-reservation-list`, 'POST', {
                    user_id : parameter
                })
                return response
            },
            enabled : start_state ? true : false,
            retry : false,
            refetchOnWindowFocus : false
        }
    )
}