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
        staleTime: 1000 * 60 * 30,
        cacheTime : 1000 * 60 * 60
    })

    // =================================================
    // 새로운 parent url 진입 시 재인증 //
    useEffect(() => {
        refetch()
    }, [refetch])

    // =================================================
    // user data 전역 관리 //
    useEffect(() => {
        if(data && data.server_state && data.log_state){
            setUser_data(data.user_data)
        }
        if(error){
            setUser_data(null)
            query_client.removeQueries('user_auth')
            // redirection error page or login page
        }
    }, [data, error])

    if(isLoading){
        return <Loading></Loading>
    }    

    if(data && user_data){
        return(
            data.server_state && data.log_state ?
            <Element login_user = {data.user_data}/> :
            <Navigate to={redirection_url}/>
        )
    }

}

export default UserAuthRouter