import {useEffect, useContext, useState} from "react"
import { Navigate, useParams, useLocation } from "react-router-dom"
import Loading from "@/utilComponent/material/loading/loading"
import default_data from "@/util/default_data/default_data"
import { connect_data_width_cookies } from "@/util/function/util_function"
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context"
import { UserContext } from "@/context/user_context/config/user_context"

// =================================================
// parameter의 값에 따른 fetch하는 라우터 //
function HostRegistCheckRouter({element : Element, redirection_url, host, footer}){

    // =================================================
    // context states //
    const {host_acc, setHost_acc} = useContext(HostAccContext)
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // location //
    const location = useLocation()

    // =================================================
    // states //
    const [acc_state, setAcc_state] = useState(null)
    const [user_state, setUser_state] = useState(null)
    
    // =================================================
    // const //
    const regist_step = default_data.regist_step
    const this_url = location.pathname.split('/')
    const this_step1 = regist_step.indexOf(this_url[this_url.length-2])

    // =================================================
    // parameter값 체크 //
    const param = useParams()

    useEffect(()=>{
        const house_id = param.house
        // 해당 숙소데이터값 없으면 가져오기
        if(!host_acc || house_id !== host_acc._id){
            connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/get/secret-one/${house_id}`, 'POST')
            .then((result) => {
                try{
                    if(result.server_state && result.log_state && result.acc_state){
                        setHost_acc(result.accomodation)
                        setUser_data(result.user_data)
                        setAcc_state(result.accomodation)
                        setUser_state(result.user_data)
                    }
                    else{
                        setUser_data(null)
                        setHost_acc(null)
                        setAcc_state(false)
                        setUser_state(false)
                    }
                }catch(e){
                    console.log(e)
                }
            })
        }
    }, [])

    // =================================================
    // loading //
    if(acc_state === null && user_state === null){
        return <Loading></Loading>
    }    

    // =================================================
    // render //
    return (
        acc_state && user_state ? 
        user_state.host_state ? 
        <Element 
            login_user = {user_state}
            footer = {footer}
            host = {host}/>
        : <Navigate to={`${redirection_url}?name=${user_state.userId}&host=none`}/>
        : <Navigate to="/Login"/>
    )
}

export default HostRegistCheckRouter