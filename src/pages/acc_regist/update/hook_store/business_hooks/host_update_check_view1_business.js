import { useForm, useFormState } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import session_storage from "@/sessionStorage/session_storage";
import { connect_data_width_cookies, text_change } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useEffect, useMemo } from "react";
import _ from 'lodash'

function useHostUpdateCheckView1Business(data, states, refs, props){
    // =================================================
    // states //
    const {check_in,
           setCheck_in,
           check_in_method,
           setCheck_in_method,
           loading, 
           setLoading,
           line_error,
           setLine_error,  
           is_button, 
           setIs_button} = states

    // =================================================
    // refs //
    const {text_gurabox,
           row_alram_ref,
           text_alert} = refs

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
        // text
        text:Yup.string()
        .required('세부적인 체크인 방법을 설명해 주세요!')
        .test(
            'not_only_spaces',
            '공백으로만 구성된 글을 작성할 수 없습니다!',
            (text) => text && text.trim().length > 0
        )
    })

    // =================================================
    // state form //
    const {register, control, clearErrors, setError, watch, reset} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })
    const {errors, isValid} = useFormState({control})

    // =================================================
    // controll button //
    useEffect(()=>{
        if(is_button){
            if(!check_in_method || 
                // =====
                !isValid ||
                // =====
               (acc_data.check_method &&
                acc_data.check_method.check_in &&
                check_in_method.name === acc_data.check_method.check_in.name &&
                check_in_method.text === acc_data.check_method.check_in.text &&
                check_in.time === acc_data.check_time.check_in.time
               )
            ){
                setIs_button(false)
                return
            }
        }

        if(!is_button){
            if((check_in_method &&
                isValid &&
                check_in_method.text &&
               !acc_data.check_method) ||
                // =====
               (acc_data.check_method &&
                acc_data.check_method.check_in &&
                isValid &&
                check_in_method &&
                check_in_method.text &&
                (check_in_method.name !== acc_data.check_method.check_in.name ||
                check_in_method.text !== acc_data.check_method.check_in.text)) ||
                // =====
                (acc_data.check_method &&
                acc_data.check_method.check_in &&
                check_in.time !== acc_data.check_time.check_in.time
                )
            ){
                setIs_button(true)
                return
            }
        }
    },[check_in_method, check_in, isValid])

    // =================================================
    // title 초기값 설정 //
    useEffect(()=>{
        if(check_in_method && check_in_method.text){
            reset({
                text : check_in_method.text
            })
            text_change(check_in_method.text, 
                        text_gurabox.current, 
                        row_alram_ref.current, 
                        text_alert.current,
                        10, 
                        17,
                        setLine_error,
                        line_error)
        }
        if(check_in_method && !check_in_method.text){
            reset({
                text : null
            })
        }
    },[check_in_method, reset])

    // =================================================
    // data fetch  //
    async function fetch_acc(time, method){
        setLoading(false)
        const response_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/modify/check-in/${param.house}`, 'PUT', 
            {
                check_in : !_.isEqual(acc_data.check_time.check_in, time) ? time : null,
                check_in_method : !acc_data.check_time ||
                                  (acc_data.check_time && !acc_data.check_time.check_in) ||
                                  !_.isEqual(acc_data.check_method.check_in, method) ? method : null 
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
            isValid,
            clearErrors,
            setError}

}

export default useHostUpdateCheckView1Business