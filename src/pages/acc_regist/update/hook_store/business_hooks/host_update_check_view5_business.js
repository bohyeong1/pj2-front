import { useForm, useFormState } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import session_storage from "@/sessionStorage/session_storage";
import { connect_data_width_cookies, text_change } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useEffect, useMemo } from "react";
import _ from 'lodash'

function useHostUpdateCheckView5Business(data, states, refs, props){
    // =================================================
    // states //
    const {check_out,
           setCheck_out,
           check_out_method,
           setCheck_out_method,
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
        text:Yup.array()
        .of(
            Yup.string()
            .required('세부적인 체크아웃 방법을 설명해 주세요!')
            .test(
                'not_only_spaces',
                '공백으로만 구성된 글을 작성할 수 없습니다!',
                (text) => text && text.trim().length > 0
            )
        )
        .min(1, '최소 1개의 항목을 입력해야 합니다.')
        .max(6, '최대 6개의 항목까지만 입력할 수 있습니다.')
    })

    // =================================================
    // state form //
    const {register, setError, clearErrors, control, watch, reset} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })
    const {errors, isValid} = useFormState({control})

    // =================================================
    // controll button //
    useEffect(()=>{
        if(is_button){
            if(!check_out_method.length || 
                // =====
                !isValid ||
                // =====
               (acc_data.check_method &&
                acc_data.check_method.check_out &&
                _.every(check_out_method,(el)=>{
                    return _.some(acc_data.check_method.check_out, (ele)=>{
                        return _.isEqual(el, ele)
                    })
                }) &&
                check_out.time === acc_data.check_time.check_out.time
               )
            ){
                setIs_button(false)
                return
            }
        }

        if(!is_button){
            if((check_out_method.length &&
                isValid &&
                _.every(check_out_method,(el)=>{
                    return el.text
                }) &&
                (!acc_data.check_method ||
                !acc_data.check_method.check_out)) ||
                // =====
               (acc_data.check_method &&
                acc_data.check_method.check_out &&
                isValid &&
                check_out_method.length &&
                _.every(check_out_method,(el)=>{
                    return el.text
                }) &&
                (!_.every(acc_data.check_method.check_out, (el)=>{
                    return _.some(check_out_method,(ele)=>{
                        return _.isEqual(el, ele)
                    })
                }))) ||
                // =====
                (acc_data.check_method &&
                acc_data.check_method.check_out &&
                check_out.time !== acc_data.check_time.check_out.time
                )
            ){
                setIs_button(true)
                return
            }
        }
    },[check_out_method, check_out, isValid])

    // =================================================
    // title 초기값 설정 //
    useEffect(()=>{
        if(check_out_method && check_out_method.length){
            check_out_method.forEach((el, index)=>{
                reset({
                    [`text[${index}]`] : el.text
                })
                text_change(el.text, 
                            text_gurabox.current[index], 
                            row_alram_ref.current[index], 
                            text_alert.current[index],
                            10, 
                            17,
                            setLine_error,
                            line_error)
            })
        }
    },[check_out_method, reset])

    // =================================================
    // data fetch  //
    async function fetch_acc(time, method){
        setLoading(false)
        const response_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/modify/check-out/${param.house}`, 'PUT', 
            {
                check_out : !_.isEqual(acc_data.check_time.check_out, time) ? time : null,
                check_out_method : !acc_data.check_time ||
                                   (acc_data.check_time && !acc_data.check_time.check_out) ||
                                   !_.every(acc_data.check_method.check_out, (el)=>{
                                        return _.some(method,(ele)=>{
                                            return _.isEqual(el, ele)
                                        })
                                    }) ? method : null
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

export default useHostUpdateCheckView5Business