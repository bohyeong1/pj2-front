import { useForm, useFormState } from "react-hook-form";
import { useEffect } from "react";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateUserReservationEvaluationApi } from "@/util/apis/user/user_reservation";
import default_data from '@/util/default_data/default_data'

function useUserReservationSuccessEvaluationModalBusiness(cons, states, refs, props){

    // =================================================
    // states //
    const {
        rating,
        setRating,
        is_button, 
        setIs_button
    } = states

    // =================================================
    // cons //
    const {
        accomodation,
        reservation
    } = cons

    // =================================================
    // props //
    const {modal_toggle} = props

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // evaluation
        evaluation:Yup.string()
        .required('숙소를 평가하는 글을 작성해 주세요!')
        .test(
            'not_only_spaces',
            '공백으로만 구성된 글을 작성할 수 없습니다!',
            (text) => text && text.trim().length > 0
        )
    })

    // =================================================
    // state form //
    const {register, control, watch} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })

    const {errors, isValid} = useFormState({control})

    // =================================================
    // update react query //
    const evaluation_mutation = useUpdateUserReservationEvaluationApi()

    // =================================================
    // modal 끄기 //
    useEffect(()=>{
        if(evaluation_mutation.isSuccess){
            modal_toggle(null)
        }
    },[evaluation_mutation.isSuccess])

    // =================================================
    // error 처리 //
    useEffect(()=>{
        if(evaluation_mutation.isError){
            // error 처리
        }
    },[evaluation_mutation.isError])

    // =================================================
    // check rating state //
    function check_rating_state(){
        if(rating){
            return Object.values(rating).every((el) => {
                return el > 0
            })
        }
        return false
    }

    // =================================================
    // check button state //
    useEffect(()=>{
        if(check_rating_state() && isValid && !is_button){
            setIs_button(true)
        }

        if((!check_rating_state() || !isValid) && is_button){
            setIs_button(false)
        }
    },[rating, isValid])

    // =================================================
    // fetch evaluation //
    async function fetch_evaluation(){
        const evaluation_text = watch('evaluation')
        const result_evaluation = default_data.d_evaluation.map((el, index) => {
            return {
                ...el,
                grade : rating[index]
            }
        })

        let total_rating = 0

        for(const rating of result_evaluation){
            total_rating += rating.grade
        }

        const total_average = total_rating / result_evaluation.length
        const result_average = {
            name : 'avgGrade',
            title : '전체 평점',
            grade : total_average,
            url : ''
        }

        evaluation_mutation.mutate({
            accomodation_id : accomodation._id,
            reservation_id : reservation._id,
            text : evaluation_text,
            rating : result_evaluation,
            total_average : result_average
        })
    }

    return {
        register,
        errors,
        isValid,
        watch,
        fetch_evaluation,
        evaluation_mutation 
    }
}

export default useUserReservationSuccessEvaluationModalBusiness