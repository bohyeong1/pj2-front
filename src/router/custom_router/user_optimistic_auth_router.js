import {useContext, useEffect} from "react"
import { Navigate } from "react-router-dom"
import { get_user } from "@/util/function/util_function"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Loading from "@/utilComponent/material/loading/loading"
import { UserContext } from "@/context/user_context/config/user_context"
import query_box from "@/util/query_key/query_key"
import { useUserOptimisticAuthCheck } from "@/util/apis/user/user_auth"

// =================================================
// 회원 / 비회원 둘다 접근 가능한 페이지 라우터 //
function UserOptimisticAuthRouter({element : Element, redirection_url = null}){
    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // react query //
    const query_client = useQueryClient()
    const {data, error, isLoading, refetch} = useUserOptimisticAuthCheck()

    // =================================================
    // 새로운 parent url 진입 시 재인증 //
    useEffect(() => {
        refetch()
    }, [refetch])

    // =================================================
    // user data 전역 관리 //
    useEffect(() => {
        if(data){
            if(!data.user_data){
                setUser_data(null)
                query_client.removeQueries(query_box.user)
                query_client.removeQueries(query_box.optimistic_user)
            }
            setUser_data(data.user_data)
        }
        if(error){
            setUser_data(null)
            query_client.removeQueries(query_box.user)
            query_client.removeQueries(query_box.optimistic_user)
            // redirection error page
        }
    }, [data, error])

    if(isLoading){
        return <Loading></Loading>
    }    

    if(data){
        return(
            <Element login_user = {data.user_data}/>
        )
    }

}

export default UserOptimisticAuthRouter