import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import connectData from "../../../../utilData/UtilFunction";
import default_data from "../../../../utilData/defaultData";
import { user_login } from "../../../../utilData/UtilFunction";
import { useEffect } from "react";


function useMembershipJoinBusiness(data, states, refs, props){

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // state //
    const {duplicate, setDuplicate, join_state, setJoin_state} = states

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
        setJoin_state(false)

        const {id, password, password_confirm, name} = user

        // user data 생성
        const join_state = await connectData(`${default_data.d_base_url}/api/users/initailjoin`, 'POST',{
            userId:id,
            password:password,
            password_confirm:password_confirm,
            name:name
        })

        // user login
        if(join_state.join_state){
            const user_data = await user_login(id, password)
            // console.log(user_data)
            setJoin_state(true)
        }else{
            setJoin_state(true)
            alert('회원정보를 제대로 기입해 주세요')
        }
    }

    // =================================================
    // id input value값 //
    const input_id = watch('id')

    // =================================================
    // check_duplicate //
    async function check_duplicate(e,user){
        e.preventDefault()
        try{
            const data = await connectData(`${default_data.d_base_url}/api/users/duplicate`, 'POST',{
                userId:user
            })
            if(data.code === 200){
                setDuplicate(data)
            }else{
                console.log(data)
            }            
        }catch(e){
            console.log(e)
        }
    }

    // =================================================
    // 다음 회원가입 절차로 이동 //
    useEffect(()=>{
        if(join_state){
            navigate('/Email_prove')
        }
    },[join_state])


    return {register, handleSubmit, errors, isValid, submit, input_id, check_duplicate}
}

export default useMembershipJoinBusiness