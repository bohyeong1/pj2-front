import {useContext, useEffect} from "react"
import { Navigate } from "react-router-dom"
import { get_user } from "@/util/function/util_function"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Loading from "@/utilComponent/material/loading/loading"
import { UserContext } from "@/context/user_context/config/user_context"

// =================================================
// host auth router //
function HostAuthRouter({element : Element, redirection_url = null, host, footer}){
    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // react query //
    const query_client = useQueryClient()
    const {data, error, isLoading, refetch} = useQuery({
        queryKey : ['user_auth'], 
        queryFn : get_user,
        staleTime: 1000 * 60 * 20,
        cacheTime : 1000 * 60 * 30
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
            user_data ? 
            user_data.host_state ? 
            <Element 
                login_user = {user_data}
                footer = {footer}
                host = {host}/>
            : <Navigate to={`${redirection_url}?name=${user_data.userId}&host=none`}/>
            : <Navigate to="/Login"/>
        )
    }

}

export default HostAuthRouter