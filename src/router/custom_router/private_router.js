import {useEffect, useState} from "react"
import { Navigate } from "react-router-dom"
import { get_user } from "../../utilData/UtilFunction"
import Loading from "../../utilComponent/material/loading/loading"

function Private_router({data_state, element : Element}){
    const [user_data, setUser_data] = useState(null)

    useEffect(()=>{
        get_user(data_state)
        .then(result => {
            // console.log(result)
            try{
                if(result.code === 200){
                    setUser_data(result)
                }else{
                    console.log(result)
                }
            }catch(e){
                console.log(e)
            }            
        })
        }, [])

    if(user_data === null){
        return <Loading></Loading>
    }    

    return(
        user_data && user_data.log_state ? <Element login_user = {user_data.user_data}/> : <Navigate to="/Login"/>
    )
}

export default Private_router