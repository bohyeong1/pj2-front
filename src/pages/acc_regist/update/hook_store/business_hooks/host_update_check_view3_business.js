import { useForm, useFormState } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import session_storage from "@/sessionStorage/session_storage";
import { connect_data_width_cookies, text_change } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useEffect, useMemo } from "react";
import _ from 'lodash'

function useHostUpdateCheckView3Business(data, states, refs, props){
    // =================================================
    // states //
    const {loading, 
           setLoading,
           wifi_id,
           setWifi_id,
           wifi_password,
           setWifi_password,
           is_button, 
           setIs_button} = states

    // =================================================
    // context states //
    const {acc_data, 
           setAcc_data} = data

    // =================================================
    // params //
    const param = useParams() 

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // id
        id:Yup.string()
        .required('무선 SSID 이름을 입력해 주세요!')
        .matches(/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-]*$/, '무선 SSID 이름에는 영어, 숫자, 특수문자만 허용됩니다.')
        .max(32, '무선 SSID 이름은 32자 이하로 작성해 주세요.')
        .test(
            'not_only_spaces',
            '공백으로만 구성된 글을 작성할 수 없습니다!',
            (text) => text && text.trim().length > 0
        ),

        // password
        password:Yup.string()
        .required('무선 SSID 비밀번호를 입력해 주세요!')
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?\/\\|-]).*$/, '무선 SSID 비밀번호에는 영어, 숫자, 특수문자를 각 1개 이상 포함하여 작성해 주세요.')
        .min(8, '무선 SSID 비밀번호에는 8자리 이상 작성해 주세요.')
        .max(32, '무선 SSID 비밀번호에는 32자리 이하로 작성해 주세요.')
        .test(
            'not_only_spaces',
            '공백으로만 구성된 글을 작성할 수 없습니다!',
            (text) => text && text.trim().length > 0
        )
    })

    // =================================================
    // state form //
    const {register, control, watch, reset} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })
    const {errors, isValid} = useFormState({control})

    // =================================================
    // controll button //
    useEffect(()=>{
        if(is_button){
            if(!isValid || 
               (wifi_id === watch('id') && wifi_password === watch('password'))){
                    setIs_button(false)
                    return
            }
        }

        if(!is_button){
            if(isValid && 
               (wifi_id !== watch('id') || wifi_password !== watch('password'))){
                    setIs_button(true)
                    return
            }
        }
    },[isValid, watch('password'), watch('id')])

    // =================================================
    // wifi 초기값 설정 //
    useEffect(()=>{
        if(wifi_id && wifi_password){
            reset({
                id : wifi_id,
                password : wifi_password
            })
        }
    },[wifi_id, wifi_password, reset])

    // =================================================
    // data fetch  //
    async function fetch_acc(id, password){
        setLoading(false)
        const response_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/modify/wifi/${param.house}`, 'PUT', 
            {
                wifi_id : id,
                wifi_password : password
            })
    
            if(response_data && response_data.acc_state && response_data.server_state){
                setAcc_data(response_data.accomodation)
                session_storage.save('house',response_data.accomodation)
                setIs_button(false)
            }        
        setLoading(true)
    }

    return {register, 
            fetch_acc,
            watch,
            errors,
            isValid}

}

export default useHostUpdateCheckView3Business