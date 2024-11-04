import { useForm, useFormState } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import _ from 'lodash'
import { file_data } from "@/util/function/util_function";
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
        setIs_button,
        initial_message, 
        setInitial_message,
        host_summary, 
        setHost_summary,
        reservation_rule, 
        setReservation_rule,
        refund_rule, 
        setRefund_rule,
        profile_img, 
        setProfile_img
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

    // =================================================
    // check data //
    function check_data(original, user, data1, data2, data3, data4, data5){

        if(
            original.host_text === data1 &&
            original.reservation_rule === data2 &&
            original.initial_message === data3 &&
            user.profileImg === data4 &&
            _.isEqual(original.refund_rule, data5)
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
        if(check_data(host_data, user_data, host_summary, reservation_rule, initial_message, profile_img.img_display_url, refund_rule) && !is_button){
            setIs_button(true)
        }
        
        if(!check_data(host_data, user_data, host_summary, reservation_rule, initial_message, profile_img.img_display_url, refund_rule) && is_button){
            setIs_button(false)
        }
    },[host_data, initial_message, host_summary, reservation_rule, refund_rule, profile_img])

    // =================================================
    // fetch data //
    async function fetch_data(){
        setLoading(false)

        const form_data = new FormData()
        if(profile_img.img_file) form_data.append('userImg', profile_img.img_file)
        
        if(profile_img.delete_prev_img) form_data.append('delete_prev_img', profile_img.delete_prev_img)
        
        if(host_data.host_text !== host_summary) form_data.append('host_text', host_summary)
        
        if(host_data.initial_message !== initial_message) form_data.append('initial_message', initial_message)
        
        if(host_data.reservation_rule !== reservation_rule) form_data.append('reservation_rule', JSON.stringify(reservation_rule))
        
        if(!_.isEqual(host_data.refund_rule, refund_rule)) form_data.append('refund_rule', JSON.stringify(refund_rule)) 
        
        const host_responese = await file_data(`${default_data.d_base_url}/api/users/host-mypage`, 'PUT', form_data)
        
        if(host_responese && host_responese.host_state && host_responese.server_state){
            if(profile_img.img_display_url !== host_responese.user.profileImg){
                setProfile_img({
                    ...profile_img,
                    img_display_url : host_responese.user.profileImg
                })
                setUser_data(host_responese.user)
            }
            setHost_data(host_responese.host)
            setLoading(true)
        }      
        else{
            // redirection error page
        }
    }
    console.log(profile_img)
    return {
        watch, 
        register, 
        errors,
        isValid,
        fetch_data
    }
}

export default useHostMypageUserTextBusiness