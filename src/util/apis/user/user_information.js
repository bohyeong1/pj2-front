import { connect_data_width_cookies, file_data } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import query_key from "@/util/query_key/query_key";

// =======================================================================================================================================================================================
// get

// =================================================
// get user evaluations //
export function useGetUserEvaluations(user_id){
    const query_client = useQueryClient()
    return useQuery(
        {
            queryKey : [query_key.user_evaluations, user_id],
            queryFn : async({queryKey}) => {
                const [, parameter] = queryKey
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/get-evaluations`, 'POST', {
                    _id : parameter
                })
                return response
            },
            onError : (e) => {
                console.error(e)
                if(e.ui_action !== 'retry'){
                    query_client.removeQueries(query_key.user)
                    query_client.removeQueries(query_key.user_evaluations)
                    // redirection login page
                }
            },
            retry : false,
            refetchOnWindowFocus : false
        }
    )
}

// =================================================
// get user target wish list //
export function useGetUserTargetWishList(user_id, accomodation_id, start_state){
    const query_client = useQueryClient()
    return useQuery(
        {
            queryKey : [query_key.wish_list_target, user_id, accomodation_id],
            queryFn : async({queryKey}) => {
                const [, user_id, accomodation_id] = queryKey
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/get-wish-list-target`, 'POST', {
                    accomodation_id,
                    user_id
                })
                return response
            },
            onError : (e) => {
                console.error(e)
                if(e.ui_action !== 'retry'){
                    query_client.removeQueries(query_key.user)
                    query_client.removeQueries(query_key.optimistic_user)

                    // redirection login page
                }
            },
            enabled : start_state ? true : false,
            retry : false,
            refetchOnWindowFocus : false
        }
    )
}

// =================================================
// get all user wish list //
export function useGetAllUserWishList(user_id, start_state){
    const query_client = useQueryClient()
    return useQuery(
        {
            queryKey : [query_key.wish_list, user_id],
            queryFn : async({queryKey}) => {
                const [, user_id] = queryKey
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/get-all-wish-list`, 'POST', {
                    user_id
                })
                return response
            },
            onError : (e) => {
                console.error(e)
                if(e.ui_action !== 'retry'){
                    query_client.removeQueries(query_key.user)
                    query_client.removeQueries(query_key.optimistic_user)

                    // redirection login page
                }
            },
            enabled : start_state ? true : false,
            retry : false,
            refetchOnWindowFocus : false
        }
    )
}

// =======================================================================================================================================================================================
// update

// =================================================
// user wish list update //
export function useUpdateUserWishlist(){
    const query_client = useQueryClient()
    return useMutation(
        {
            mutationFn : async({user_id, accomodation_id}) => {
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/update-wishlist`, 'POST',
                    {
                        user_id : user_id,
                        accomodation_id : accomodation_id
                    }
                )
                return response
            },    
            onMutate : async({user_id, accomodation_id}) => {
                await query_client.cancelQueries([query_key.wish_list_target, user_id, accomodation_id])

                const prev_wishlist = query_client.getQueryData([query_key.wish_list_target, user_id, accomodation_id])

                query_client.setQueryData([query_key.wish_list_target, user_id, accomodation_id], {
                    ...prev_wishlist,
                    wishlist : !prev_wishlist.wishlist
                })
          
                return {prev_wishlist}
            },
            onSettled : (data, e, variable) => {
                const {user_id, accomodation_id} = variable
                query_client.invalidateQueries([query_key.wish_list_target, user_id, accomodation_id])
            },
            onError : (e, variable, context) => {
                console.error(e)
                const {user_id, accomodation_id} = variable
                query_client.setQueryData([query_key.wish_list_target, user_id, accomodation_id], context.prev_wishlist)
            }
        }
    )
}

// =================================================
// user wish list delete //
export function useDeleteUserWishlist(){
    const query_client = useQueryClient()
    return useMutation(
        {
            mutationFn : async({user_id, accomodation_id}) => {
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/delete-wishlist`, 'POST',
                    {
                        user_id : user_id,
                        accomodation_id : accomodation_id
                    }
                )
                return response
            },
            onSuccess : (data, {user_id, accomodation_id}) => {
                query_client.invalidateQueries([query_key.wish_list_target, user_id, accomodation_id])
                query_client.invalidateQueries([query_key.wish_list, user_id])
            },
            onError : (e, variable, context) => {
                console.error(e)
                const {user_id, accomodation_id} = variable
                query_client.setQueryData([query_key.wish_list_target, user_id, accomodation_id], context.prev_wishlist)
                // redirection error page
            }
        }
    )
}

// =================================================
// user password update //
export function useUpdateUserPassword(){
    const query_client = useQueryClient()
    return useMutation(
        {
            mutationFn : async({password, password_confirm, prev_password}) => {
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/update-password`, 'POST',
                    {
                        password : password,
                        password_confirm : password_confirm,
                        prev_password : prev_password
                    }
                )
                return response
            },    
            onSuccess : () => {
                query_client.invalidateQueries([query_key.user])
            },
            onError : (e) => {
                console.error(e)
                if(e.ui_action !== 'retry'){
                    // error page redirection
                }
            }
        }
    )
}

// =================================================
// user information update //
export function useUpdateUserInformation(){
    const query_client = useQueryClient()
    return useMutation(
        {
            mutationFn : async({file}) => {
                const response = await file_data(`${default_data.d_base_url}/api/users/update-information`, 'POST', file
                )
                return response
            },    
            onSuccess : () => {
                query_client.invalidateQueries([query_key.user])
            },
            onError : (e) => {
                console.error(e)
                if(e.ui_action !== 'retry'){
                    // error page redirection
                }
            }
        }
    )
}