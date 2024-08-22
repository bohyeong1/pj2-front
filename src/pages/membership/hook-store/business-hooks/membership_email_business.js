import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import connectData from "../../../../utilData/UtilFunction";
import default_data from "../../../../utilData/defaultData";
import { start_count } from "../../../../utilData/UtilFunction";
import { useEffect } from "react";

function useMembershipEmailBusiness(data, states, refs, props){
    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // refs //
    const {timer} = refs

    // =================================================
    // states //
    const {verification_state, setVerification_state} = states

    // =================================================
    // props //
    const {login_user} = props

    // =================================================
    // interval //
    let interval_var

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // email
        email:Yup.string()
        .required('이메일을 입력해 주세요.')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, '기본적인 이메일 형식을 지켜주세요.'),
        // code
        code:Yup.string()
        .required('코드를 입력해 주세요.')
        .matches(/^.{6}$/, '코드는 6자리를 입력해 주세요.')
    })

    // =================================================
    // state form //
    const {register, handleSubmit, formState:{errors, isValid}, watch} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })

    // =================================================
    // 인증코드 발급 //
    async function verification_click(e, email){
        e.preventDefault()
        const verification_data = await connectData(`${default_data.d_base_url}/api/users/verification`, 'POST',{
            userId : login_user.userId,
            email : email
        })
        console.log(verification_data)
        setVerification_state(verification_data)
        // timer 실행
        if(interval_var){
            clearInterval(interval_var)
        }
        interval_var = start_count(600, timer, interval_var)
    }

    // =================================================
    // data submit //
    async function submit(user){       
        // setJoin_state(false)

        // const {id, password, password_confirm, name} = user

        // // user data 생성
        // const join_state = await connectData(`${default_data.d_base_url}/api/users/initailjoin`, 'POST',{
        //     userId:id,
        //     password:password,
        //     password_confirm:password_confirm,
        //     name:name
        // })

        // // user login
        // if(join_state.join_state){
        //     const user_data = await user_login(id, password)
        //     // console.log(user_data)
        //     setJoin_state(true)
        // }else{
        //     setJoin_state(true)
        //     alert('회원정보를 제대로 기입해 주세요')
        // }
    }

    // =================================================
    // email input value값 //
    const input_email = watch('email')

    // // =================================================
    // // 다음 회원가입 절차로 이동 //
    // useEffect(()=>{
    //     if(join_state){
    //         navigate('/Email_prove')
    //     }
    // },[join_state])

    

    return {register, handleSubmit, errors, isValid, submit, input_email, verification_click}
}

export default useMembershipEmailBusiness