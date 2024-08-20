import React, {useEffect, useState} from "react"
import { Route, Navigate } from "react-router-dom"
import { get_user } from "../utilData/UtilFunction"
import Loading from "../utilComponent/material/loading/loading"


function Private_router({data_state, element : Element, ...rest}){
    // data_state = ture(유저 데이터까지 획득 db 조회함) false(db조회 안하고 토큰 있나없나 로그인 상태만 빠르게 체크)
    const [auth_state, setAuth_state] = useState(null)

    useEffect(()=>{
        get_user(data_state)
        .then(result => {
            console.log(result)
            try{
                if(result.code === 200){
                    setAuth_state(result.log_state)
                }else{
                    console.log(result)
                }
            }catch(e){
                console.log(e)
            }            
        })
        }, [])

    if(auth_state === null){
        return <Loading></Loading>
    }    

    return(
        // auth_state ? <Element/> : <Navigate to="/Login"/>
        <Element></Element>
    )

}

export default Private_router