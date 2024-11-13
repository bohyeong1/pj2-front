function useUserReservationPendingListStyle(cons, states, refs, props){

    // =================================================
    // get list state //
    function get_list_state(data){
        if(data === 'payment_success'){
            return '예약 완료'
        }
        else if(data === 'payment_pending'){
            return '예약 대기'
        }
        else if(data === 'refund_pending'){
            return '환불 대기'
        }
    }

    // =================================================
    // get list style //
    function get_list_style(data){
        if(data === 'payment_success'){
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
        get_list_style,
        get_list_state
    }
}

export default useUserReservationPendingListStyle