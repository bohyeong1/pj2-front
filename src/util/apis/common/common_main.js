import default_data from "@/util/default_data/default_data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import connect_data from "@/util/function/util_function";
import query_key from "@/util/query_key/query_key";

// =======================================================================================================================================================================================
// get

// =================================================
// common main data get //
export function useGetCommonMainData(filter, counts, keyword = null){
    const query_client = useQueryClient()
    return useQuery(
        {
            queryKey : [query_key.common_main_data, filter, counts, keyword].filter((el) => el !== null),
            queryFn : async({queryKey}) => {
                const [, filter, counts, keyword] = queryKey
                const response = await connect_data(`${default_data.d_base_url}/api/common`, 'POST', 
                    {
                        filter : filter,
                        counts : counts,
                        keyword : keyword
                    }
                )
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

// =======================================================================================================================================================================================
// update

// =================================================
// common update category data //
export function useUpdateCommonCategoryData(){
    const query_client = useQueryClient()
    return useMutation(
        {
            mutationFn : async({filter, keyword}) => {
                const response = await connect_data(`${default_data.d_base_url}/api/common`, 'POST', 
                    {
                        filter: filter,
                        counts: 12,
                        keyword: keyword || null,
                    }
                )
                return response
            },    
            onSuccess : (data) => {
                query_client.setQueryData([query_key.common_main_data, 'all', 12], (prev) => {
                    return {
                        ...prev,
                        ...data
                    }
                })
            },
            onError : (e) => {
                console.error(e)
                // error page redirection
            }
        }
    )
}
