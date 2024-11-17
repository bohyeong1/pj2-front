import { useDispatch } from "react-redux"
import { toggle_target } from "@/redux/modules/overaySlice"

function useUserReservationSuccessListStyle(cons, states, refs, props){

    // =================================================
    // states //
    const {
        target_accomodation, 
        setTarget_accomodation,
        target_reservation, 
        setTarget_reservation
    } = states

    // =================================================
    // dispatch //
    const dispatch = useDispatch()

    // =================================================
    // get list state //
    function get_list_state(data){
        if(data === 'payment_success'){
            return '예약 완료'
        }
        else if(data === 'refund_success'){
            return '환불 완료'
        }
    }

    // =================================================
    // modal toggle
    function modal_toggle(key_name, target = null){
        if(target){
            setTarget_accomodation(target.accomodation)
            setTarget_reservation(target)
        }

        dispatch(toggle_target({id:key_name}))
    }

    return {
        get_list_state,
        modal_toggle
    }
}

export default useUserReservationSuccessListStyle