import { useForm, useFormState } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import session_storage from "@/sessionStorage/session_storage";
import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useParams } from "react-router-dom";

function useHostUpdateAccomodationView8Business(data, states, refs, props){

    // =================================================
    // states //
    const {is_button, 
           setIs_button, 
           loading, 
           setLoading,
           summary,
           setSummary} = states

    // =================================================
    // params //
    const param = useParams()

    // =================================================
    // data //
    const {acc_data, 
           setAcc_data} = data

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // summary
        summary:Yup.string()
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

    // =================================================
    // summary 초기값 설정 //
    useEffect(()=>{
        if(summary){
            reset({
                summary : summary
            })
        }
    },[summary])  

    // =================================================
    // controll button //
    useEffect(()=>{
        if(is_button){
            if(!isValid || acc_data.summary === watch('summary')){
                setIs_button(false)
                return
            }
        }

        if(!is_button){
            if(isValid && acc_data.summary !== watch('summary')){
                setIs_button(true)
                return
            }
        }
    },[watch('summary'), isValid, is_button])

    // =================================================
    // data fetch  //
    async function fetch_acc(summary){
        setLoading(false)
        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/modify/summary/${param.house}`, 'PUT', 
            {
                summary : summary
            })
    
            if(acc_data && acc_data.acc_state && acc_data.server_state){
                setAcc_data(acc_data.accomodation)
                session_storage.save('house',acc_data.accomodation)
                setIs_button(false)
            }        
        setLoading(true)
    }
    return {fetch_acc, watch, register, errors, isValid}
}

export default useHostUpdateAccomodationView8Business