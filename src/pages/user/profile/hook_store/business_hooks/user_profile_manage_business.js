import { useForm, useFormState } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useUpdateUserPassword, useUpdateUserInformation } from "@/util/apis/user/user_information";


function useUserProfileManageBusiness(cons, states, refs, props){

    // =================================================
    // cons //
    const {
        user_data,
        setUser_data
    } = cons

    // =================================================
    // states //
    const {
        modify_state,
        setModify_state,
        fetch_state, 
        setFetch_state,
        password_fetch_state, 
        setPassword_fetch_state,
        profile_img, 
        setProfile_img
    } = states

    // =================================================
    // update react query //
    const information_mutation = useUpdateUserInformation()
    const password_mutation = useUpdateUserPassword()

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // prev password
        prev_password :Yup.string()
        .required('현재 비밀번호를 입력해 주세요.')
        .min(8, '8자 이상 입력해 주세요.')
        .max(15, '15자 이하로 입력해 주세요.')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, '비밀번호에 1개 이상의 특수 문자를 포함해 주세요.'),

        // password
        password :Yup.string()
        .required('새 비밀번호를 입력해 주세요.')
        .min(8, '8자 이상 입력해 주세요.')
        .max(15, '15자 이하로 입력해 주세요.')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, '비밀번호에 1개 이상의 특수 문자를 포함해 주세요.')
        .test(
            'not-equal',
            '현재 비밀번호와 같은 비밀번호를 설정할 수 없습니다.',
            function(value){
                const {prev_password} = this.parent
                return value !== prev_password
            }
        ),

        // password_confirm
        password_confirm : Yup.string()
        .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
        .required('새 비밀번호를 다시 입력해 주세요.'),

        // name
        name : Yup.string()
        .required('이름을 입력해 주세요.')
        .min(1, '1자 이상 입력해 주세요.')
        .max(20, '20자 이하로 입력해 주세요.')
        .matches(/^[가-힣a-zA-Z]+$/, '이름은 한글 또는 영문자로 작성해 주세요.'),

        // nickname
        nickname:Yup.string()
        .required('닉네임을 입력해 주세요.')
        .max(15, '닉네임은 15글자 이하로 입력해 주세요.')
        .matches(/^[a-zA-Z0-9가-힣]+$/, '닉네임은 한글, 영어, 숫자로 작성해 주세요!'),
    })

    // =================================================
    // state form //
    const {control, register, watch, reset} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })
    const {errors, isValid} = useFormState({control})

    // =================================================
    // user data 초기값 설정 //
    useEffect(()=>{
        if(user_data){
            reset({
                name : user_data.name,
                nickname : user_data.nickname ? user_data.nickname : ''
            })
        }
    },[user_data, reset])

    // =================================================
    // check information data //
    function check_fetch_information_data(user, data1, data2, data3){
        if(
            (user?.name === data1 &&
            user?.nickname === data2 &&
            user?.profileImg === data3) ||
            (errors.name || errors.nickname)
        ){
            return false
        }
        else{
            return true
        }
    }

    // =================================================
    // fetch button controll //
    useEffect(()=>{
        if(check_fetch_information_data(user_data, watch('name'), watch('nickname'), profile_img.img_display_url) && !fetch_state){
            setFetch_state(true)
        }
        
        if(!check_fetch_information_data(user_data, watch('name'), watch('nickname'), profile_img.img_display_url) && fetch_state){
            setFetch_state(false)
        }
    },[user_data, watch('name'), watch('nickname'), profile_img.img_display_url, errors.name, errors.nickname])

    // =================================================
    // check password data //
    function check_fetch_password_data(data1, data2, data3){        
        if((errors.password || errors.password_confirm || errors.prev_password || !data1 || !data2 || !data3)){
            return false
        }
        else{
            return true
        }
    }

    // =================================================
    // fetch password button controll //
    useEffect(()=>{
        if(check_fetch_password_data(watch('password'), watch('password_confirm'), watch('prev_password')) && !password_fetch_state){
            setPassword_fetch_state(true)
        }
        
        if(!check_fetch_password_data() && password_fetch_state){
            setPassword_fetch_state(false)
        }
    },[user_data, watch('password'), watch('password_confirm'), watch('prev_password'), errors.password, errors.password_confirm, errors.prev_password])

    // =================================================
    // fetch password data //
    function fetch_password_data(){
        password_mutation.mutate({
            password : watch('password'),
            password_confirm : watch('password_confirm'),
            prev_password : watch('prev_password')
        })
    }

    // =================================================
    // fetch information data //
    function fetch_information_data(){
        const form_data = new FormData()
        if(profile_img.img_file) form_data.append('userImg', profile_img.img_file)        
        if(profile_img.delete_prev_img) form_data.append('delete_prev_img', profile_img.delete_prev_img)        
        if(watch('name') !== user_data.name) form_data.append('name', watch('name'))        
        if(watch('nickname') !== user_data.nickname) form_data.append('nickname', watch('nickname'))

        information_mutation.mutate(
            {
                file : form_data
            }
        )
    }

    // =================================================
    // update password fetch state controll //
    useEffect(()=>{
        if(password_mutation.data || password_mutation.error){
            reset(
                {
                    prev_password : '',
                    password : '',
                    password_confirm : ''
                }
            )
        }
    },[password_mutation.data, password_mutation.error])

    // =================================================
    // update information fetch state controll //
    useEffect(()=>{
        if(information_mutation.data && profile_img.delete_prev_img){
            setProfile_img({
                img : information_mutation.data.user_data.profileImg,
                delete_prev_img : null,
                img_file : null,
                img_display_url : information_mutation.data.user_data.profileImg
            })
        }
    },[information_mutation.data])


    return {
        register, 
        watch,
        errors,
        isValid,
        fetch_password_data,
        fetch_information_data,
        password_mutation,
        information_mutation
    }
}

export default useUserProfileManageBusiness