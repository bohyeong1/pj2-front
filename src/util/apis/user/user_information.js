import { connect_data_width_cookies, file_data } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import query_key from "@/util/query_key/query_key";

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