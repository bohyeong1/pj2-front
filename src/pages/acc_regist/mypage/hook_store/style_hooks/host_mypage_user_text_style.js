import { useDispatch } from "react-redux"
import { toggle_target } from "@/redux/modules/overaySlice"

function useHostMypageUserTextStyle(data, states, refs, props){

    // =================================================
    // states
    const {
        host_summary, 
        setHost_summary,
        reservation_rule, 
        setReservation_rule,
        refund_rule, 
        setRefund_rule
    } = states

    // =================================================
    // props
    const {watch} = props

    // =================================================
    // dispatch //
    const dispatch = useDispatch()
    
    // =================================================
    // modal toggle
    function modal_toggle(key_name){
        dispatch(toggle_target({id:key_name}))
    }

    // =================================================
    // click modify text
    function click_modify_text(handle_element, wrapper){
        handle_element.current.focus()
        handle_element.current.style.pointerEvents = 'auto'
        wrapper.current.style.transform = 'rotateY(180deg)'
    }

    // =================================================
    // save text
    function save_text(handle_element, wrapper, handle_function, keyword){
        handle_function(watch(keyword))
        handle_element.current.style.pointerEvents = 'none'
        wrapper.current.style.transform = 'rotateY(0)'
    }

    // =================================================
    // click reservation rule
    function click_reservation_rule(key_name){
        if(reservation_rule){
            modal_toggle(key_name)
        }
        if(!reservation_rule){
            setReservation_rule(!reservation_rule)
        }
    }

    // =================================================
    // click refund rule
    function click_refund_rule(data){
        setRefund_rule(data)
    }

    // =================================================
    // set reservation rule false
    function set_reservation_rule_false(key_name){
        setReservation_rule(false)
        modal_toggle(key_name)
    }

    return {
        save_text,
        click_modify_text,
        modal_toggle,
        click_reservation_rule,
        set_reservation_rule_false,
        click_refund_rule
    }
}

export default useHostMypageUserTextStyle