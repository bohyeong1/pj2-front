import React, {useEffect, useState, useContext} from "react"
import { Navigate, useParams } from "react-router-dom"
import Loading from "@/utilComponent/material/loading/loading"
import default_data from "@/util/default_data/default_data"
import { connect_data_width_cookies } from "@/util/function/util_function"
import { CommonAccContext } from "@/context/common_acc_context/config/common_acc_context"
import { UserContext } from "@/context/user_context/config/user_context"

// =================================================
// accomodation data, user 쿠키 검증 및 data get 라우터 //
function GetAccUserRouter({element : Element}){
    // =================================================
    // context states //
    const {common_acc, setCommon_acc} = useContext(CommonAccContext)
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // parameter값 체크 //
    const param = useParams()

    useEffect(()=>{
        const house_id = param.house

        connect_data_width_cookies(`${default_data.d_base_url}/api/common/private/accomodation-user/${house_id}`, 'POST')
        .then((result) => {
            if(!result.log_state){
                setUser_data(false)
            }
            if(result.log_state && result.server_state){
                setUser_data(result.user_data)
                setCommon_acc(result.accomodation)
            }
        })
        .catch((e) => {
            console.log(e)
        })

    }, [])

    // =================================================
    // loading //
    if(user_data === null){
        return <Loading></Loading>
    }    

    // =================================================
    // render //
    return (
        user_data && common_acc ? 
        <Element login_user = {user_data}/>
        : <Navigate to="/Login"/>
    )
}

export default GetAccUserRouter