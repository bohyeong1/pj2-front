import default_data from "@/util/default_data/default_data";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import connect_data from "@/util/function/util_function";
import query_key from "@/util/query_key/query_key";

// =================================================
// common list accomodation get //
export function useGetCommonListAccomodation(){
    const query_client = useQueryClient()
    const query_string = useLocation().search
    return useQuery(
        {
            queryKey : [query_key.common_list_data],
            queryFn : async() => {
                const response = await connect_data(`${default_data.d_base_url}/api/common/list${query_string}`, 'GET')
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