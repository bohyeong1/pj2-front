import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import connect_data from "@/util/function/util_function";
import query_key from "@/util/query_key/query_key";

// =================================================
// common detail accomodation get //
export function useGetCommonDetailAccomodation(accomodation_id){
    const query_client = useQueryClient()
    return useQuery(
        {
            queryKey : [query_key.common_accomodation, accomodation_id],
            queryFn : async({queryKey}) => {
                const [, parameter] = queryKey
                const response = await connect_data(`${default_data.d_base_url}/api/common/detail/${parameter}`, 'POST', {_id : parameter})
                return response
            },
            onError : (e) => {
                console.error(e)
                if(e.ui_action !== 'retry'){
                    query_client.removeQueries(query_key.user)
                    // redirection login page
                }
            },
            retry : false,
            refetchOnWindowFocus : false
        }
    )
}

