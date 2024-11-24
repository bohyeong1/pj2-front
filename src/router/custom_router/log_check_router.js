// import {useEffect, useState} from "react"
// import { Navigate } from "react-router-dom"
// import { check_login } from "@/util/function/util_function"
// import Loading from "../../utilComponent/material/loading/loading"

// // =================================================
// // login check router //
// function LogCheckRouter({element : Element, redirection_url = null}){
//     const [user_data, setUser_data] = useState(null)

//     useEffect(()=>{
//         check_login()
//         .then(result => {
//             try{
//                 if(result.code === 200 && result.server_state && result.log_state){
//                     setUser_data(result)
//                 }else{
//                     console.log(result)
//                 }
//             }catch(e){
//                 console.log(e)
//             }            
//         })
//     }, [])

//     if(user_data === null){
//         return <Loading></Loading>
//     }    

//     if(user_data === false && redirection_url){
//         <Navigate to={redirection_url}></Navigate>
//     }

//     return(
//         <Element login_user = {user_data.user}/>
//     )
// }

// export default LogCheckRouter