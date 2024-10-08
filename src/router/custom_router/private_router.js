import React, {useEffect, useState} from "react"
import { Navigate } from "react-router-dom"
import { get_user } from "../../utilData/UtilFunction"
import Loading from "../../utilComponent/material/loading/loading"


function Private_router({data_state, element : Element}){
    // data_state = ture(유저 데이터까지 획득 db 조회함) false(db조회 안하고 토큰 있나없나 로그인 상태만 빠르게 체크)
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
        user_data && user_data.log_state ? <Element login_user = {user_data.user}/> : <Navigate to="/Login"/>
    )
}

export default Private_router