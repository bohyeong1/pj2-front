import { useForm, useFormState } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import session_storage from "@/sessionStorage/session_storage";
import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useEffect, useMemo } from "react";
import { button_state } from '@/util/function/util_function'

function useHostUpdateAccomodationView1Business(data, states, refs, props){
    // =================================================
    // states //
    const {title, 
           setTitle, 
           loading, 
           setLoading, 
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
        // title
        title:Yup.string()
        .required('숙소의 이름을 작성해 주세요!')
        .matches(/^\S(.*\S)?$/, '문장의 시작과 끝은 공백 사용이 불가능합니다!')
        .matches(/^[가-힣a-zA-Z0-9\s]{1,20}$/, '한글, 영어, 숫자만 사용하며, 완성된 문자를 1~20글자로 작성해 주세요!')
    })

    // =================================================
    // state form //
    const {register, reset, getValues, control} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })
    const {errors, isValid} = useFormState({control})
    
    // =================================================
    // title 초기값 설정 //
    useEffect(()=>{
        if(title){
            reset({title})
        }
    },[title, reset])

    // =================================================
    // data fetch  //
    async function fetch_acc(data){
        setLoading(false)
        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/modify/title/${param.house}`, 'PUT', 
            {
                title : data
            })
    
            if(acc_data && acc_data.acc_state && acc_data.server_state){
                setAcc_data(acc_data.accomodation)
                session_storage.save('house',acc_data.accomodation)
                setIs_button(false)
            }        
        setLoading(true)
    }

    return {fetch_acc, register, errors, getValues, isValid}

}

export default useHostUpdateAccomodationView1Business