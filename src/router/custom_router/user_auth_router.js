import {useContext, useEffect} from "react"
import { Navigate } from "react-router-dom"
import { get_user } from "@/util/function/util_function"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Loading from "@/utilComponent/material/loading/loading"
import { UserContext } from "@/context/user_context/config/user_context"

// =================================================
// user auth router //
function UserAuthRouter({element : Element, redirection_url = null}){
    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // react query //
    const query_client = useQueryClient()
    const {data, error, isLoading, refetch} = useQuery({
        queryKey : ['user_auth'], 
        queryFn : get_user, 
        onSuccess : (response) => {
            if(response.server_state && response.log_state){
                setUser_data(response.user_data)
            }
            else{
                setUser_data(null)
                query_client.removeQueries('user_auth')
            }
        },
        staleTime: 1000 * 60 * 15,
        cacheTime : 1000 * 60 * 30
    })

    // =================================================
    // 새로운 parent url 진입 시 재인증 //
    useEffect(() => {
        refetch()
    }, [refetch])

    if(isLoading){
        return <Loading></Loading>
    }    

    if(error){
        setUser_data(null)
        // error page redirection
    }

    return(
        data && data.server_state && data.log_state ?
        <Element login_user = {data.user_data}/> :
        <Navigate to={redirection_url}></Navigate>
    )
}

export default UserAuthRouter