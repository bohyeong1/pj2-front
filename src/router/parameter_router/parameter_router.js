import React, {useEffect, useState} from "react"
import { Navigate, useParams, useLocation } from "react-router-dom"
import { get_user } from "../../utilData/UtilFunction"
import Loading from "../../utilComponent/material/loading/loading"
import session_storage from "../../sessionStorage/session_storage"
import default_data from "../../utilData/defaultData"

// =================================================
// parameter의 값에 따른 fetch하는 라우터 //
function Parameter_router({data_state, element : Element, redirection_url, provider : Provider}){
    // data_state = ture(유저 데이터까지 획득 db 조회함) false(db조회 안하고 토큰 있나없나 로그인 상태만 빠르게 체크)

    // =================================================
    // states //
    const [user_data, setUser_data] = useState(null)
    const [acc_data, setAcc_data] = useState(null)

    // =================================================
    // location //
    const location = useLocation()
    
    // =================================================
    // const //
    const regist_step = default_data.regist_step
    const this_url = location.pathname.split('/')
    const this_step = regist_step.indexOf(this_url[this_url.length-2])

    // =================================================
    // parameter값 체크 //
    const param = useParams()

    useEffect(()=>{
        const house_id = param.house
        const current_home = session_storage.load('house')
        
        // 해당 숙소데이터값 없으면 가져오기
        if(house_id && (!current_home || house_id !== current_home._id)){
            // fetch logic
            console.log('session 없음')
        }else{
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
        }

    }, [])

    // =================================================
    // loading //
    if(user_data === null){
        return <Loading></Loading>
    }    

    // =================================================
    // render //
    // provider로 감싼 리엑트 타입
    if(Provider){
        return (
            user_data && user_data.log_state ? 
            user_data.user.host_state ? <Provider><Element login_user = {user_data.user} this_step={this_step}/></Provider> : 
            <Navigate to={`${redirection_url}?name=${user_data.user.userId}&host=${user_data.user.host_state ? user_data.user.host_state : 'none'}`}/>
            : <Navigate to="/Login"/>
        )
    }
    // 컴포넌트 타입
    else{
        return (
            user_data && user_data.log_state ? 
            user_data.user.host_state ? <Element login_user = {user_data.user} this_step={this_step}/> : 
            <Navigate to={`${redirection_url}?name=${user_data.user.userId}&host=${user_data.user.host_state ? user_data.user.host_state : 'none'}`}/>
            : <Navigate to="/Login"/>)
    }
}

export default Parameter_router