import default_data from "@/util/default_data/default_data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import connect_data from "@/util/function/util_function";
import query_key from "@/util/query_key/query_key";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";


// =======================================================================================================================================================================================
// get




// =======================================================================================================================================================================================
// update

// =================================================
// common update and validate search data //
export function useUpdateAndValidateSearchData(){
    const navigate = useNavigate()
    const query_client = useQueryClient()
    return useMutation(
        {
            mutationFn : async({location, date, capacity}) => {
                const response = await connect_data(`${default_data.d_base_url}/api/common/search-check`, 'POST', 
                    {
                        location : location,
                        date : date,
                        capacity : capacity
                    }
                )
                return response
            },    
            onSuccess : () => {
                // navigate list page
            },
            onError : (e) => {
                console.error(e)
                query_client.removeQueries(query_key.user)
                query_client.removeQueries(query_key.optimistic_user)
                
                // error page redirection
            }
        }
    )
}