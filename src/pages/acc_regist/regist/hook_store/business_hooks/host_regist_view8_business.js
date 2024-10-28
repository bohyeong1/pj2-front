import { useForm, useFormState } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import _ from 'lodash'

function useHostRegistView8Business(data, states, refs, props){
    // =================================================
    // states //
    const {
        title, 
        setTitle, 
        prev_data, 
        setPrev_data, 
        loading, 
        setLoading
    } = states

    // =================================================
    // data //
    const {
        host_acc,
        setHost_acc
    } = data

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
    const {register, control, reset, watch} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all',
        defaultValues : title ? title : null
    })
    const {errors, isValid} = useFormState({control})

    // =================================================
    // price 초기값 설정 //
    useEffect(()=>{
        if(prev_data && prev_data.title){
            reset({
                title : prev_data.title
            })
        }
    },[prev_data, reset])

    // =================================================
    // data fetch  //
    async function fetch_acc(data, index){
        setLoading(false)
        // prev_data와 current_data 같을 경우 api 요청 x
        if(prev_data && _.isEqual(data, prev_data)){
            setLoading(true)
            return host_acc ? {
                accomodation : {
                    _id : host_acc._id
                }
            } : false
        }
        // prev_data와 current_data 다를 경우 패치 진행
        else{
            const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv8/${param.house}`, 'PUT', 
                {
                    acc_step : parseInt(index),
                    title : data['title'],
                    capacity : data['capacity']
                })
        
                if(acc_data && acc_data.acc_state){
                    setHost_acc(acc_data.accomodation)
                }        
                setLoading(true)
                return acc_data.acc_state ? acc_data : false
        }
    }
    return {
        fetch_acc, 
        register, 
        errors, 
        watch, 
        isValid
    }
}

export default useHostRegistView8Business