import React, {useEffect, useState} from "react"
import { Navigate } from "react-router-dom"
import { get_user } from "../../utilData/UtilFunction"
import Loading from "../../utilComponent/material/loading/loading"

// =================================================
// host page 첫 진입 시 host 등록 안되면 등록페이지 & 등록 됬으면 기존 호스트 페이지 //
function Conditional_router({data_state, element : Element, redirection_url}){
    // data_state = ture(유저 데이터까지 획득 db 조회함) false(db조회 안하고 토큰 있나없나 로그인 상태만 빠르게 체크)
    const [user_data, setUser_data] = useState(null)

    useEffect(()=>{
        get_user(data_state)
        .then(result => {
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
        user_data && user_data.log_state ? 
        user_data.user.host_state ? <Element login_user = {user_data.user}/> : 
        <Navigate to={`${redirection_url}?name=${user_data.user.userId}&host=${user_data.user.host_state ? user_data.user.host_state : 'none'}`}/>
        : <Navigate to="/Login"/>
    )
}

export default Conditional_router