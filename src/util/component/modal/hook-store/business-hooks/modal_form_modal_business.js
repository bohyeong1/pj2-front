import { useForm, useFormState } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserPasswordAuthCheck } from "@/util/apis/user/user_auth";
import { useEffect } from "react";

function useModalFormModalBusiness(cons, states, refs, props){

    // =================================================
    // states //
    const {
        fetch_state, 
        setFetch_state
    } = states

    // =================================================
    // states //
    const {
        modal_state
    } = cons

    // =================================================
    // props //
    const {
        handle_function
    } = props

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // password
        password :Yup.string().required('비밀번호를 입력해 주세요.')
        .min(8, '8자 이상 입력해 주세요.')
        .max(15, '15자 이하로 입력해 주세요.')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, '비밀번호에 1개 이상의 특수 문자를 포함해 주세요.'),

        // password_confirm
        password_confirm : Yup.string()
        .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
        .required('비밀번호를 다시 입력해 주세요.'),
    })

    // =================================================
    // state form //
    const {register, control, watch, reset} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })
    const {errors, isValid} = useFormState({control})

    // =================================================
    // reset form //
    useEffect(()=>{
        if(!modal_state){
            reset()
        }
    },[modal_state])

    // =================================================
    // auth fetch //
    async function auth_fetch(){
        setFetch_state(true)
    }

    // =================================================
    // react query fetch //
    const {data, isLoading, isError, error} = useUserPasswordAuthCheck(
        {
            password : watch('password'),
            password_confirm : watch('password_confirm')
        },
        fetch_state
    )

    // =================================================
    // fetch success case //
    useEffect(()=>{
        if(data){
            setFetch_state(false)
            if(handle_function){
                handle_function()
            }
        }
    },[data])

    useEffect(()=>{
        if(error && error.code === 401 && error.ui_action === 'retry'){
            if(fetch_state){
                setFetch_state(false)
            }
        }
    },[isError])

    return {
        register,
        errors,
        error,
        isValid,
        auth_fetch,
        isLoading, 
        isError
    }
}

export default useModalFormModalBusiness