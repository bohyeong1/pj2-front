import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import query_key from "@/util/query_key/query_key";

// =======================================================================================================================================================================================
// get

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



// =======================================================================================================================================================================================
// update

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

// =================================================
// update user min reservation date //
export function useUpdateUserMinReservationDate(){
    const query_client = useQueryClient()
    return useMutation (
        {
            mutationFn : async({min_reservation_date, max_reservation_date}) => {
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/min-reservation-date`, 'PUT', 
                    {
                        min_reservation_date : min_reservation_date,
                        max_reservation_date : max_reservation_date
                    })
                return response
            },    
            onSuccess : () => {
                query_client.invalidateQueries([query_key.user])
            },
            onError : (e) => {
                console.error(e)
                // error page redirection
            }
        }
    )
}

// =================================================
// update user max reservation date //
export function useUpdateUserMaxReservationDate(){
    const query_client = useQueryClient()
    return useMutation (
        {
            mutationFn : async({min_reservation_date, max_reservation_date}) => {
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/max-reservation-date`, 'PUT', 
                    {
                        min_reservation_date : min_reservation_date,
                        max_reservation_date : max_reservation_date
                    })
                return response
            },    
            onSuccess : () => {
                query_client.invalidateQueries([query_key.user])
            },
            onError : (e) => {
                console.error(e)
                // error page redirection
            }
        }
    )
}

// =================================================
// update user possible date //
export function useUpdateUserPossibleDate(){
    const query_client = useQueryClient()
    return useMutation (
        {
            mutationFn : async({possible_date}) => {
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/possible-date`, 'PUT', 
                    {
                        possible_date : possible_date
                    })
                return response
            },    
            onSuccess : () => {
                query_client.invalidateQueries([query_key.user])
            },
            onError : (e) => {
                console.error(e)
                // error page redirection
            }
        }
    )
}

// =================================================
// update user resrvation deadline date //
export function useUpdateUserReservationDeadlineDate(){
    const query_client = useQueryClient()
    return useMutation (
        {
            mutationFn : async({reservation_deadline}) => {
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/reservation-deadline`, 'PUT', 
                    {
                        reservation_deadline : reservation_deadline
                    })
                return response
            },    
            onSuccess : () => {
                query_client.invalidateQueries([query_key.user])
            },
            onError : (e) => {
                console.error(e)
                // error page redirection
            }
        }
    )
}

// =================================================
// update user before date //
export function useUpdateUserBeforeDate(){
    const query_client = useQueryClient()
    return useMutation (
        {
            mutationFn : async({before_date}) => {
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/before-date`, 'PUT', 
                    {
                        before_date : before_date
                    })
                return response
            },    
            onSuccess : () => {
                query_client.invalidateQueries([query_key.user])
            },
            onError : (e) => {
                console.error(e)
                // error page redirection
            }
        }
    )
}

// =================================================
// update user impossible reservation //
export function useUpdateUserImpossibleReservation(){
    const query_client = useQueryClient()
    return useMutation (
        {
            mutationFn : async({impossible_reservation}) => {
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/impossible-reservation`, 'PUT', 
                    {
                        impossible_reservation : impossible_reservation
                    })
                return response
            },    
            onSuccess : () => {
                query_client.invalidateQueries([query_key.user])
            },
            onError : (e) => {
                console.error(e)
                // error page redirection
            }
        }
    )
}
