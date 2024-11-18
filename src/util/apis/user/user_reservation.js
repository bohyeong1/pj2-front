import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// =================================================
// get user reservation pending list //
export async function get_reservation_pending_list(){
    const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/reservation/get-pending-list`, 'GET')
    return response
}

// =================================================
// get user reservation success list //
export async function get_reservation_success_list(parameter){
    const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/reservation/get-success-list`, 'GET')
    return response
}

// =================================================
// get user reservation target //
export async function get_reservation_target(parameter){
    const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/reservation/get-target/${parameter}`, 'GET')
    return response
}

// =================================================
// get user reservation massage list//
export async function get_reservation_massage_list(parameter){
    const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/reservation/get-message-list/`, 'POST', parameter)
    return response
}

// =================================================
// get user reservation massage detail//
export async function get_reservation_massage_detail(parameter){
    const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/reservation/get-message-detail/${parameter}`, 'GET')
    return response
}

// =================================================
// update user reservation evaluation //
export function useUpdateUserReservationEvaluationApi(){
    const query_client = useQueryClient()
    return useMutation(
        {
            mutationFn : async({text, rating, total_average, accomodation_id, reservation_id}) => {
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/reservation/evaluation`, 'POST',
                    {
                        accomodation_id : accomodation_id,
                        reservation_id : reservation_id,
                        text : text,
                        rating : rating,
                        total_average : total_average
                    }
                )
                return response
            },    
            onSuccess : () => {
                query_client.invalidateQueries(['reservation_success_list'])
            },
            onError : (e) => {
                console.error(e)
                // error page redirection
            }
        }
    )
}


