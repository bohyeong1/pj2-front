import { useDispatch } from "react-redux"
import { toggle_target } from "@/redux/modules/overaySlice"
import { set_target_class } from "@/redux/modules/targetClassSlice"
import { useNavigate } from "react-router-dom"
import { differenceInDays, differenceInHours } from "date-fns"

function useReservationDetailSection1Style(cons, states, refs, props){

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // dispatch //
    const dispatch = useDispatch()

    // =================================================
    // get rule text //
    function get_rule_text(data){
        if (data.name === 'aniaml'){
            if(data.state){
                return `반려동물 동반 가능, ${data.count}마리 까지 허용`
            }
            else{
                return `반려동물 동반 불가능`
            }
        }
        else if(data.name === 'event'){
            if(data.state){
                return `이벤트 허용`
            }
            else{
                return `이벤트 비허용`
            }
        }
        else if(data.name === 'vaping'){
            if(data.state){
                return `흡연, 전자담배, 베이핑 허용`
            }
            else{
                return `흡연, 전자담배, 베이핑 비허용`
            }
        }
        else if(data.name === 'recoding'){
            if(data.state){
                return `상업적 사진 및 동영상 촬영 허용`
            }
            else{
                return `상업적 사진 및 동영상 촬영 비허용`
            }
        }
        else if(data.name === 'addrule'){
            return '추가 확인사항이 있습니다 꼭 확인해 주세요!'
        }
        else{
           return `유효하지 않은 데이터입니다.`
        }
    }

    // =================================================
    // modal toggle
    function modal_toggle(key_name){
        dispatch(toggle_target({id:key_name}))
    }

    // =================================================
    // click prev url
    function click_prev_url(){
        navigate('/user/reservation/pending-list')
    }

    // =================================================
    // visiblity target path
    function visiblity_target_path(data){
        dispatch(set_target_class(data))
    }

    // =================================================
    // check reservation price result
    function check_reservation_category(category, checkin, total_price, stay_day){

        const today_date = new Date()
    
        if(category === '유연'){
            if(differenceInHours(checkin, today_date) < 24){
                const difference_in_days = differenceInDays(checkin, today_date) - 1
                const result_price = difference_in_days * (total_price / stay_day)
    
                return {
                    result : total_price + result_price
                }
            }
    
            return {
                result : total_price
            }
        }
        else if(category === '일반'){
            if(differenceInDays(checkin, today_date) <= 5){
                const difference_in_days = differenceInDays(checkin, today_date) > 0 ? 0 : differenceInDays(checkin, today_date)
                const result_price = (difference_in_days - 1) * (total_price / stay_day)
    
                return {
                    result : total_price + result_price
                }
            }
    
            return {
                result : total_price
            }
        }
        else if(category === '비교적 엄격'){
            if(differenceInDays(checkin, today_date) <= 14 && differenceInDays(checkin, today_date) > 7){
                return {
                    result : total_price +  - (total_price / 2)
                }
            }
    
            if(differenceInDays(checkin, today_date) < 7){
                return {
                    result : 0
                }
            }
    
            return {
                result : total_price
            }
        }
        else if(category === '엄격'){
            if(differenceInDays(checkin, today_date) > 14 && differenceInHours(checkin, today_date) > 48){
                return {
                    result : total_price
                }
    
            }
    
            if(differenceInDays(checkin, today_date) < 7){
                return {
                    result : 0
                }
            }
    
            return {
                result : total_price - (total_price / 2)
            }
        }
        else{
            return false
        }
    }

    return {
        get_rule_text,
        modal_toggle,
        click_prev_url,
        visiblity_target_path,
        check_reservation_category
    }
}

export default useReservationDetailSection1Style