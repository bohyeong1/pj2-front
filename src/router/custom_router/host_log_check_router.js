import {useEffect, useState, useContext} from "react"
import { Navigate } from "react-router-dom"
import { get_user } from "@/util/function/util_function"
import Loading from "@/utilComponent/material/loading/loading"
import { UserContext } from "@/context/user_context/config/user_context"

function HostLogCheckRouter({element : Element, redirection_url, host, footer}){
    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // states //
    const [user_state, setUser_state] = useState(null)

    useEffect(()=>{
        get_user()
        .then(result => {
            try{
                if(result.server_state && result.log_state){
                    console.log(result.user_data)
                    setUser_data(result.user_data)
                    setUser_state(result.user_data)
                }else{
                    setUser_data(null)
                    setUser_state(false)
                }
            }catch(e){
                console.log(e)
            }            
        })
    }, [])

    if(user_state === null){
        return <Loading></Loading>
    }    

    return(
        user_state ? 
        user_state.host_state ? 
        <Element 
            login_user = {user_state}
            footer = {footer}
            host = {host}/>
        : <Navigate to={`${redirection_url}?name=${user_state.userId}&host=none`}/>
        : <Navigate to="/Login"/>
    )
}

export default HostLogCheckRouter