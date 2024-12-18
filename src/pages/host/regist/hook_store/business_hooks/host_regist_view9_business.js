import { useForm, useFormState } from "react-hook-form";
import { useEffect } from "react";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useParams } from "react-router-dom";

function useHostRegistView9Business(data, states, refs, props){

    // =================================================
    // context states //
    const {
        host_acc,
        setHost_acc
    } = data

    // =================================================
    // states //
    const {
        prev_data, 
        setPrev_data, 
        loading, 
        setLoading
    } = states

    // =================================================
    // params //
    const param = useParams()

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
    const {register, reset, control, watch} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })

    const {errors, isValid} = useFormState({control})

    // =================================================
    // price 초기값 설정 //
    useEffect(()=>{
        if(prev_data && prev_data.length){
            reset({
                summary : prev_data
            })
        }
    },[prev_data, reset])

    // =================================================
    // data fetch  //
    async function fetch_acc(data, index){
        setLoading(false)
        // prev_data와 current_data 같을 경우 api 요청 x
        if(prev_data && prev_data === data.summary){
            setLoading(true)
            return host_acc ? {
                accomodation : {
                    _id : host_acc._id
                }
            } : false
        }
        // prev_data와 current_data 다를 경우 패치 진행
        else{
            const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv9/${param.house}`, 'PUT', 
                {
                    acc_step : parseInt(index),
                    summary : data.summary
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
        watch, 
        register, 
        errors, 
        isValid
    }
}

export default useHostRegistView9Business