import { useForm, useFormState } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { connect_data_width_cookies, text_change } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";

function useHostMypageUserTextBusiness(data, states, refs, props){

    // =================================================
    // states //
    const {
        host_data,
        setHost_data,
        loading,
        setLoading,
        is_button,
        setIs_button
    } = states

    // =================================================
    // data //
    const {
        user_data, 
        setUser_data
    } = data

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // summary
        summary:Yup.string()
        .required('호스트를 소개하는 글을 작성해 주세요!')
        .test(
            'not_only_spaces',
            '공백으로만 구성된 글을 작성할 수 없습니다!',
            (text) => text && text.trim().length > 0
        )
        .max(300, '최대 400자까지만 입력할 수 있습니다!'),

        // message
        message:Yup.string()
        .required('게스트에게 자동으로 보내지는 메세지를 작성해 주세요!')
        .test(
            'not_only_spaces',
            '공백으로만 구성된 글을 작성할 수 없습니다!',
            (text) => text && text.trim().length > 0
        )
        .max(400, '최대 400자까지만 입력할 수 있습니다!')
    })

    // =================================================
    // state form //
    const {register, control, watch, reset} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })
    const {errors, isValid} = useFormState({control})

    // =================================================
    // summary 초기값 설정 //
    useEffect(()=>{
        if(host_data.host_text && host_data.initial_message){

            reset({
                summary : host_data.host_text,
                message : host_data.initial_message
            })
        }
    },[host_data])
    
    return {
        watch, 
        register, 
        errors,
        isValid
    }
}

export default useHostMypageUserTextBusiness