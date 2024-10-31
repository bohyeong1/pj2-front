import { useForm, useFormState } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import _ from 'lodash'

function useHostManageCalendarBusiness(data, states, refs, props){

    // =================================================
    // states //
    const {
        modal_state,
        setModal_state,
        possible_date_state,
        setPossible_date_state,
        impossible_reservation_state,
        setImpossible_reservation_state,
        before_date_state,
        setBefore_date_state,
        reservation_deadline_state,
        setReservation_deadline_state,
        loading,
        setLoading,
        host_data,
        setHost_data
    } = states

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // min_date
        min_date:Yup.number()
        .required('최소 숙박일수를 지정해 주세요')
        .typeError('숫자만 입력 가능합니다')
        .min(2, '당일 숙박은 허용되지 않습니다.')
        .max(host_data.max_reservation_date - 1, '최대 숙박일수 이상으로 설정할 수 없습니다.'),
        // max_date
        max_date:Yup.number()
        .required('최대 숙박일수를 지정해 주세요')
        .typeError('숫자만 입력 가능합니다')
        .min(host_data.min_reservation_date + 1, '최소 숙박일수 이하로 설정할 수 없습니다.')
        .max(30, '최대 30일까지 설정 가능합니다.')
    })

    // =================================================
    // state form //
    const {register, control, reset, watch} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })
    const {errors, isValid} = useFormState({control})

    // =================================================
    // min_date, max_date 초기값 설정 //
    useEffect(()=>{
        if(host_data.min_reservation_date && host_data.max_reservation_date){
            reset({
                min_date : host_data.min_reservation_date,
                max_date : host_data.max_reservation_date
            })
        }
    },[host_data, reset])

    // =================================================
    // 배열이 같은 지 검사 //
    function is_array_same(pre, cur){
        if(!pre.length){
            return pre.length === cur.length
        }
        else{
            const bool = _.every(pre, (el)=>{
                return _.some(cur, (ele)=>{
                    return _.isMatch(el, ele)
                })
            }) && pre.length === cur.length

            return bool
        }
    }

    // =================================================
    // 최소 숙박 일수 api 요청 //
    async function fetch_min_reservation_date(min, max){
        setLoading(false)

        const host_response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/min-reservation-date`, 'PUT', 
            {
                min_reservation_date : min,
                max_reservation_date : max
            })

        if(host_response && host_response.host_state && host_response.server_state){
            setHost_data(host_response.host)
        }        
        else{
            // error page redirection
        }
        setModal_state(null)
        setLoading(true)
    }

    // =================================================
    // 최대 숙박 일수 api 요청 //
    async function fetch_max_reservation_date(min, max){
        setLoading(false)

        const host_response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/max-reservation-date`, 'PUT', 
            {
                min_reservation_date : min,
                max_reservation_date : max
            })

        if(host_response && host_response.host_state && host_response.server_state){
            setHost_data(host_response.host)
        }        
        else{
            // error page redirection
        }
        setModal_state(null)
        setLoading(true)
    }

    // =================================================
    // 예약 가능 기간 api 요청 //
    async function fetch_possible_date(data){
        setLoading(false)

        const host_response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/possible-date`, 'PUT', 
            {
                possible_date : data
            })

        if(host_response && host_response.host_state && host_response.server_state){
            setHost_data(host_response.host)
        }        
        else{
            // error page redirection
        }
        setModal_state(null)
        setLoading(true)
    }

    // =================================================
    // 예약 마감 시한 api 요청 //
    async function fetch_reservation_deadline_date(data){
        setLoading(false)

        const host_response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/reservation-deadline`, 'PUT', 
            {
                reservation_deadline : data
            })

        if(host_response && host_response.host_state && host_response.server_state){
            setHost_data(host_response.host)
        }        
        else{
            // error page redirection
        }
        setModal_state(null)
        setLoading(true)
    }

    // =================================================
    // 준비 기간 api 요청 //
    async function fetch_before_date(data){
        setLoading(false)

        const host_response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/before-date`, 'PUT', 
            {
                before_date : data
            })

        if(host_response && host_response.host_state && host_response.server_state){
            setHost_data(host_response.host)
        }        
        else{
            // error page redirection
        }
        setModal_state(null)
        setLoading(true)
    }

    // =================================================
    // 예약 가능일 api 요청 //
    async function fetch_impossible_reservation(data){
        setLoading(false)

        const host_response = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/impossible-reservation`, 'PUT', 
            {
                impossible_reservation : data
            })

        if(host_response && host_response.host_state && host_response.server_state){
            setHost_data(host_response.host)
        }        
        else{
            // error page redirection
        }
        setModal_state(null)
        setLoading(true)
    }

    return {
        register,
        watch,
        errors,
        fetch_min_reservation_date,
        fetch_max_reservation_date,
        fetch_possible_date,
        fetch_reservation_deadline_date,
        fetch_before_date,
        fetch_impossible_reservation,
        is_array_same
    }
}

export default useHostManageCalendarBusiness