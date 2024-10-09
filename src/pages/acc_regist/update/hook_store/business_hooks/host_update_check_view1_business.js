import { useForm, useFormState } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import session_storage from "@/sessionStorage/session_storage";
import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useEffect, useMemo } from "react";
import { button_state } from '@/util/function/util_function'

function useHostUpdateCheckView1Business(data, states, refs, props){
    // // =================================================
    // // states //
    // const {title, 
    //        setTitle, 
    //        loading, 
    //        setLoading, 
    //        is_button, 
    //        setIs_button} = states

    // // =================================================
    // // context states //
    // const {acc_data, 
    //        setAcc_data} = data

    // // =================================================
    // // params //
    // const param = useParams() 

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // text
        text:Yup.string()
        .required('숙소를 소개하는 글을 작성해 주세요!')
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
    
    // // =================================================
    // // title 초기값 설정 //
    // useEffect(()=>{
    //     if(title){
    //         reset({title})
    //     }
    // },[title, reset])

    // // =================================================
    // // data fetch  //
    // async function fetch_acc(data){
    //     setLoading(false)
    //     const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/modify/title/${param.house}`, 'PUT', 
    //         {
    //             title : data
    //         })
    
    //         if(acc_data && acc_data.acc_state && acc_data.server_state){
    //             setAcc_data(acc_data.accomodation)
    //             session_storage.save('house',acc_data.accomodation)
    //             setIs_button(false)
    //         }        
    //     setLoading(true)
    // }

    // return {fetch_acc, register, errors, getValues, isValid}
    return {register, 
            watch,
            errors}

}

export default useHostUpdateCheckView1Business