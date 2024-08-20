import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import connectData from "../../../../utilData/UtilFunction";
import default_data from "../../../../utilData/defaultData";
import { useEffect } from "react";

function useMembershipEmailBusiness(data, states, refs, props){
    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // state //
    // const {} = states

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // id
        email:Yup.string()
        .required('아이디를 입력해 주세요.')
        .min(7, '아이디는 7글자 이상 입력해 주세요.')
        .max(12, '아이디는 12글자 이하 입력해 주세요.')
        .matches(/[a-zA-Z]/, '아이디는 영문으로 작성해 주세요.')
        .matches(/^[a-zA-Z0-9]+$/, '특수 문자는 사용하지 말아주세요.'),
    })

    // =================================================
    // state form //
    const {register, handleSubmit, formState:{errors, isValid}, watch} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })

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
    // id input value값 //
    const input_email = watch('email')


    // // =================================================
    // // 다음 회원가입 절차로 이동 //
    // useEffect(()=>{
    //     if(join_state){
    //         navigate('/Email_prove')
    //     }
    // },[join_state])

    return {register, handleSubmit, errors, isValid, submit, input_email}
}

export default useMembershipEmailBusiness