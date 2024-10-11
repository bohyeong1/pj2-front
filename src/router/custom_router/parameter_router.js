import React, {useEffect, useState, useContext} from "react"
import { Navigate, useParams, useLocation } from "react-router-dom"
import { get_user } from "../../utilData/UtilFunction"
import Loading from "../../utilComponent/material/loading/loading"
import session_storage from "../../sessionStorage/session_storage"
import default_data from "../../utilData/defaultData"
import { connect_data_width_cookies } from "../../utilData/UtilFunction"
import { AccDataContext } from "@/context/acc_data_context/config/acc_data_context"
import _ from 'lodash'

// =================================================
// parameter의 값에 따른 fetch하는 라우터 //
function Parameter_router({data_state, element : Element, redirection_url, provider : Provider}){
    // data_state = ture(유저 데이터까지 획득 db 조회함) false(db조회 안하고 토큰 있나없나 로그인 상태만 빠르게 체크)

    // =================================================
    // context states //
    const {acc_data, setAcc_data} = useContext(AccDataContext)

    // =================================================
    // states //
    const [user_data1, setUser_data1] = useState(null)
    const [acc_data1, setAcc_data1] = useState(null)

    // =================================================
    // location //
    const location = useLocation()
    
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
        const current_home = session_storage.load('house')

        // 해당 숙소데이터값 없으면 가져오기
        if(house_id && (!current_home || house_id !== current_home._id)){
            connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/get/secret-one/${house_id}`, 'POST')
            .then((result) => {
                try{
                    if(result.user_data && result && result.server_state === true){
                        if(!_.isEqual(result.user_data, user_data1)){
                            setUser_data1(result.user_data)
                        }
                        if(!_.isEqual(result.accomodation, acc_data1)){
                            setAcc_data1(result.accomodation)
                        }
                        if(!_.isEqual(result.accomodation, acc_data)){
                            setAcc_data(result.accomodation)
                        }
                        session_storage.save('house', result.accomodation)
                    }else{
                        throw new Error('api 요청 중 에러 발생')
                    }
                }catch(e){
                    console.log(e)
                }
            })
        }else{
            get_user(data_state)
            .then((result) => {
                try{
                    if(result && result.code === 200){

                        if(!_.isEqual(result, user_data1)){
                            setUser_data1(result)
                        }
                        if(!_.isEqual(current_home, acc_data1)){
                            setAcc_data1(current_home)
                        }
                        if(!_.isEqual(current_home, acc_data)){
                            setAcc_data(current_home)
                        }
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
    if(user_data1 === null){
        return <Loading></Loading>
    }    

    // =================================================
    // render //
    return (
        user_data1 && user_data1.log_state ? 
        user_data1.user.host_state ? 
        <Element login_user = {user_data1.user} this_step={this_step1} acc_data = {acc_data1 ? acc_data1 : null}/>
        : <Navigate to={`${redirection_url}?name=${user_data1.user.userId}&host=${user_data1.user.host_state ? user_data1.user.host_state : 'none'}`}/>
        : <Navigate to="/Login"/>
    )
}

export default Parameter_router