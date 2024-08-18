import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import connectData from "../../../../utilData/UtilFunction";
import default_data from "../../../../utilData/defaultData";
import util_hooks from "../../../../utilData/utilHook";


function useMembershipJoinBusiness(data, states, refs, props){
    // =================================================
    // state //

    const {dataState, setDataState, duplicate, setDuplicate} = states

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // id
        id:Yup.string()
        .required('아이디를 입력해 주세요.')
        .min(7, '아이디는 7글자 이상 입력해 주세요.')
        .max(12, '아이디는 12글자 이하 입력해 주세요.')
        .matches(/[a-zA-Z]/, '아이디는 영문으로 작성해 주세요.')
        .matches(/^[a-zA-Z0-9]+$/, '특수 문자는 사용하지 말아주세요.'),

        // password
        password:Yup.string().required('비밀번호를 입력해 주세요.')
        .min(8, '8자 이상 입력해 주세요.')
        .max(15, '15자 이하로 입력해 주세요.')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, '비밀번호에 1개 이상의 특수 문자를 포함해 주세요.'),

        // password_confirm
        password_confirm: Yup.string()
        .oneOf([Yup.ref('password'),null], '비밀번호가 일치하지 않습니다.')
        .required('비밀번호를 다시 입력해 주세요.'),

        // name
        name:Yup.string().required('이름을 입력해 주세요.')
        .min(1, '1자 이상 입력해 주세요.')
        .max(20, '20자 이하로 입력해 주세요.')
        .matches(/^[가-힣a-zA-Z]+$/, '이름은 한글 또는 영문자로 작성해 주세요.')
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
        const {id, password} = user

        // firebase connect
        const credential_user = await util_hooks.useFireConnect(id, password)
        const user_data = credential_user.user
        const user_token = await user_data.getIdToken()

        const data = await connectData(`${default_data.d_base_url}/api/users/login`, 'POST',null, user_token)

        if(data.code !== 200){
            alert(data.message)
        }else{
            console.log(data)            
            // navigate('/')
        }
    }

    // =================================================
    // id input value값 //
    const input_id = watch('id')

    // =================================================
    // check_duplicate //
    async function check_duplicate(e,user){
        e.preventDefault()
        // try{
        //     const data = await connectData(`${default_data.d_base_url}/api/users/duplicate`, 'POST',{
        //         userId:user
        //     })
        //     if(data.code === 200){
        //         setDuplicate(data)
        //     }else{
        //         console.log(data)
        //     }            
        // }catch(e){
        //     console.log(e)
        // }
        console.log('확인')
    }


    return {register, handleSubmit, errors, isValid, submit, input_id, check_duplicate}
}

export default useMembershipJoinBusiness