import React, {useEffect, useState, useContext} from "react"
import { Navigate, useParams } from "react-router-dom"
import Loading from "../../utilComponent/material/loading/loading"
import default_data from "../../utilData/defaultData"
import { connect_data_width_cookies } from "../../utilData/UtilFunction"

// =================================================
// accomodation data, user 쿠키 검증 및 data get 라우터 //
function GetAccUserRouter({data_state, element : Element, redirection_url}){
    // =================================================
    // context states //

    // =================================================
    // states //
    const [user_data, setUser_data] = useState(null)
    const [acc_data, setAcc_data] = useState(null)

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
                setAcc_data(result.accomodation)
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
    console.log(acc_data)
    // =================================================
    // render //
    return (
        user_data && acc_data ? 
        <Element 
            login_user = {user_data.user}
            acc_data = {acc_data ? acc_data : null}/>
        : <Navigate to="/Login"/>
    )
}

export default GetAccUserRouter