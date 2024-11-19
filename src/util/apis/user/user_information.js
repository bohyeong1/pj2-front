import { connect_data_width_cookies, file_data } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import query_key from "@/util/query_key/query_key";

// =================================================
// user password update //
export function useUpdateUserPassword(){
    const query_client = useQueryClient()
    return useMutation(
        {
            mutationFn : async({password, password_confirm, prev_password}) => {
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/reservation/evaluation`, 'POST',
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
                // error page redirection
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
                const response = await file_data(`${default_data.d_base_url}/api/reservation/evaluation`, 'POST',file
                )
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