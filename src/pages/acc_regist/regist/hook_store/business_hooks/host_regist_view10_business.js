import { useForm, useFormState } from "react-hook-form"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import _ from 'lodash'
import { useEffect } from "react";
import default_data from "@/util/default_data/default_data";
import { useParams } from "react-router-dom";
import { connect_data_width_cookies } from "@/util/function/util_function";

function useHostRegistView10Business(data, states, refs, props){

    // =================================================
    // context states //
    const {
        host_acc,
        setHost_acc
    } = data

    // =================================================
    // state //
    const {
        sellect_state, 
        setSellect_state, 
        current_data, 
        setCurrent_data, 
        prev_data, 
        setPrev_data,
        data_ready, 
        setData_ready, 
        loading, 
        setLoading
    } = states

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // rule
        rule:Yup.string()
        .required('추가 규칙을 작성해 주세요!')
        .test(
            'not_only_spaces',
            '공백으로만 구성된 글을 작성할 수 없습니다!',
            (text) => text && text.trim().length > 0
        )
    })

    // =================================================
    // params //
    const param = useParams()

    // =================================================
    // state form //
    const { register, setValue, watch, reset, control } = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all',
        defaultValues: {
            count: 0,
        }
    })
    const {errors, isValid} = useFormState({control})

    // =================================================
    // price 초기값 설정 //
    useEffect(()=>{
        if(prev_data){
            reset({
                rule : prev_data[4]?.summary || "",
                count : prev_data[0]?.count || 0
            })
        }
    },[prev_data, reset])

    // =================================================
    // button state 및 drop data 업데이트 //
    useEffect(()=>{
        function isvalid_input(){
            return watch('count') >= 0 && 
                   watch('count') < 6 && 
                   sellect_state.case1 !== null && 
                   sellect_state.case2 !== null && 
                   sellect_state.case3 !== null && 
                   isValid
        }
        if(isvalid_input()){
            const data_structure = default_data.home_rules
            const update_data = data_structure.map((el, index)=>{
                if(index === 0){
                    return {
                        ...el,
                        state : watch('count') ? true : false,
                        count : watch('count')
                    }
                }
                else if(index === data_structure.length - 1){
                    return {
                        ...el,
                        state : watch('rule') ? true : false,
                        summary : watch('rule')
                    }
                }
                else{
                    return {
                        ...el,
                        state : sellect_state[`case${index}`]
                    }
                }
            })
            setCurrent_data(update_data)
            setData_ready(true)
        }else if(!isvalid_input() && data_ready){
            setData_ready(false)
        }
    },[watch('count'), watch('rule'), sellect_state, isValid])

    // =================================================
    // data fetch //
    async function fetch_acc(data, index){
        setLoading(false)
        // prev_data와 current_data 같을 경우 api 요청 x

        if(_.isEqual(prev_data, data)){
            setLoading(true)
            return host_acc ? {
                accomodation : {
                    _id : host_acc._id
                }
            } : false
        }
        // prev_data와 current_data 다를 경우 패치 진행
        else{
            const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv10/${param.house}`, 'PUT', 
                {
                    acc_step : parseInt(index),
                    rules : data
                })
        
                if(acc_data && acc_data.acc_state){
                    setHost_acc(acc_data.accomodation)
                }        

                setLoading(true)
                return acc_data.acc_state ? acc_data : false
        }       
    } 

    return {
        register, 
        setValue, 
        watch, 
        fetch_acc, 
        errors
    }
}

export default useHostRegistView10Business