import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import session_storage from "@/sessionStorage/session_storage";
import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import _ from 'lodash'
import { useEffect } from "react";

function useHostUpdateAccomodationView1Business(data, states, refs, props){
    // =================================================
    // states //
    const {title, setTitle, prev_data, setPrev_data, loading, setLoading} = states

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
    const {register, formState:{errors, isValid}, watch, reset, getValues} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })

    // =================================================
    // title 초기값 설정 //
    useEffect(()=>{
        if (title) {
            reset({ title })
        }
    },[title, reset])
    
    // =================================================
    // data fetch  //
    async function fetch_acc(data, index){
        setLoading(false)
        watch('title')
        // prev_data와 current_data 같을 경우 api 요청 x
        if(prev_data && _.isEqual(data, prev_data)){
            setLoading(true)
            return session_storage.load('house') && session_storage.load('house')._id ? {
                accomodation : {
                    _id : session_storage.load('house')._id
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
                    session_storage.save('house',acc_data.accomodation)
                }        
                console.log(acc_data)
                setLoading(true)
                return acc_data.acc_state ? acc_data : false
        }
    }

    // =================================================
    // get valid button state  //
    function get_valid(){
        if(watch('title')){
            return watch('title') !== title ? true : false
        }
        else{
            return getValues('title') !== title ? true : false
        }
    }

    return {fetch_acc, register, errors, isValid, get_valid}

}

export default useHostUpdateAccomodationView1Business