import { isSameYear, format } from "date-fns"
import { useNavigate } from "react-router-dom"

function useUserReservationMessageStyle(cons, states, refs, props){

    // =================================================
    // const //
    const {
        search_param,
        setSearch_param
    } = cons

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // click category button //
    function click_category_button(data){
        search_param.set('role', data)
        setSearch_param(search_param)
    }

    // =================================================
    // click message //
    function click_message(data){
        navigate(`/user/reservation/message/detail/${data}`)
    }

    // =================================================
    // get date text //
    function get_date_text(data){
        if(isSameYear(data, new Date())){
            return format(data, 'MM. dd')
        }
        else{
            return format(data, 'yyyy. MM. dd')
        }
    }

    // =================================================
    // get list state //
    function get_list_state(data, type){
        if(data === 'payment_success'){
            if(type === 'guest'){
                return '예약 완료'
            }
            if(type === 'host'){
                return '현재 호스팅 중'
            }
        }
        else if(data === 'payment_pending'){
            return '예약 요청'
        }
        else if(data === 'refund_pending'){
            return '환불 대기'
        }
        else if(data === 'refund_success'){
            return '환불 완료'
        }
    }

    // =================================================
    // get list style //
    function get_list_style(data){
        if(data === 'payment_success' || data === 'refund_success'){
            return '#228B22'
        }
        else if(data === 'payment_pending'){
            return '#E9CD6A'
        }
        else if(data === 'refund_pending'){
            return '#E9CD6A'
        }
    }

    return {
        click_category_button,
        get_list_state,
        get_list_style,
        get_date_text,
        click_message
    }
}

export default useUserReservationMessageStyle