import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import query_key from "@/util/query_key/query_key";

// =================================================
// user password auth check //
export function useUserPasswordAuthCheck(input, start_state){
    const query_client = useQueryClient()
    return useQuery(
        {
            queryKey : [query_key.user, input],
            queryFn : async({queryKey}) => {
                const [, parameter] = queryKey
                const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/password-auth`, 'POST', parameter)
                return response
            },
            enabled : start_state,
            onSuccess : () => {
                query_client.invalidateQueries([query_key.user])
            },
            onError : (e) => {
                console.log(e)
                query_client.removeQueries(query_key.user)
                // redirection login page
            },
            retry : false,
            refetchOnWindowFocus : false
        }
    )
}
