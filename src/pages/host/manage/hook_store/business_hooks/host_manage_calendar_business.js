import { useForm, useFormState } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import _ from 'lodash'
import { useGetHostReservationList } from "@/util/apis/host/host_manage";
import { 
    useUpdateUserMinReservationDate,
    useUpdateUserMaxReservationDate,
    useUpdateUserPossibleDate,
    useUpdateUserReservationDeadlineDate,
    useUpdateUserBeforeDate,
    useUpdateUserImpossibleReservation
} from "@/util/apis/user/user_reservation";

function useHostManageCalendarBusiness(cons, states, refs, props){

    // =================================================
    // const //
    const {
        user_data,
        setUser_data
    } = cons

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
    // react query //
    const {data, isLoading, error} = useGetHostReservationList(user_data._id, user_data)

    // =================================================
    // mutation //
    const min_reservation_date_mutation = useUpdateUserMinReservationDate()
    const max_reservation_date_mutation = useUpdateUserMaxReservationDate()
    const possible_date_mutation = useUpdateUserPossibleDate()
    const reservation_deadline_date_mutation = useUpdateUserReservationDeadlineDate()
    const before_date_mutation = useUpdateUserBeforeDate()
    const impossible_reservation_mutation = useUpdateUserImpossibleReservation()   

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
    // data synchronization //
    useEffect(()=>{
        if(user_data){
            setHost_data(user_data.host_text)
        }
    },[user_data])

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
        min_reservation_date_mutation.mutate(
            {
                min_reservation_date : min,
                max_reservation_date : max
            }
        )
        setModal_state(null)
    }

    // =================================================
    // 최대 숙박 일수 api 요청 //
    async function fetch_max_reservation_date(min, max){
        max_reservation_date_mutation.mutate(
            {
                min_reservation_date : min,
                max_reservation_date : max
            }
        )
        setModal_state(null)
    }

    // =================================================
    // 예약 가능 기간 api 요청 //
    async function fetch_possible_date(data){
        possible_date_mutation.mutate(
            {
                possible_date : data
            }
        )
        setModal_state(null)
    }

    // =================================================
    // 예약 마감 시한 api 요청 //
    async function fetch_reservation_deadline_date(data){
        reservation_deadline_date_mutation.mutate(
            {
                reservation_deadline : data
            }
        )
        setModal_state(null)
    }

    // =================================================
    // 준비 기간 api 요청 //
    async function fetch_before_date(data){
        before_date_mutation.mutate(
            {
                before_date : data
            }
        )
        setModal_state(null)
    }

    // =================================================
    // 예약 가능일 api 요청 //
    async function fetch_impossible_reservation(data){
        impossible_reservation_mutation.mutate(
            {
                impossible_reservation : data
            }
        )
        setModal_state(null)
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
        is_array_same,
        data, 
        isLoading, 
        error,
        min_reservation_date_mutation,
        max_reservation_date_mutation,
        possible_date_mutation,
        reservation_deadline_date_mutation,
        before_date_mutation,
        impossible_reservation_mutation
    }
}

export default useHostManageCalendarBusiness