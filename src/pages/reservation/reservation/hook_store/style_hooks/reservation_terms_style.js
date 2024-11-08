import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toggle_target } from "@/redux/modules/overaySlice"

function useReservationTermsStyle(data, states, refs, props){

    // =================================================
    // states //
    const {
        all_checked,
        setAll_checked,
        checkbox_state,
        setCheckbox_state,
        is_open,
        setIs_open
    } = states

    // =================================================
    // refs //
    const {toggle_button} = refs

    // =================================================
    // props //
    const {setIs_button} = props

    // =================================================
    // dispatch //
    const dispatch = useDispatch()

    // =================================================
    // check box style //
    useEffect(()=>{
        for(const key in checkbox_state){
            if(checkbox_state[key]){
                continue
            }else{
                if(all_checked){
                    setAll_checked(false)
                    setIs_button(false)
                }
                return
            }            
        }
        setIs_button(true)
        setAll_checked(true)
    },[checkbox_state])   
    
    // =================================================
    // modal toggle
    function modal_toggle(key_name){
        dispatch(toggle_target({id:key_name}))
    }

    // =================================================
    // 전체동의 //
    function all_check_box(e){
        const check = e.target.checked
        const copied_state = {...checkbox_state}

        for(const key in checkbox_state){
            copied_state[key] = check
        }

        setCheckbox_state(copied_state)
    }

    // =================================================    
    // 선택동의 //
    function sellect_check_box(e){
        const name = e.target.name
        setCheckbox_state({
            ...checkbox_state,
            [name] : !checkbox_state[name]
        })
    }

    // =================================================
    // 약관창 열기 //
    function open_terms(e){
        toggle_button.current.classList.toggle('reservation-button-toggle')
        setIs_open(!is_open)
    }

    return {
        all_check_box, 
        sellect_check_box, 
        open_terms,
        modal_toggle
    }
}

export default useReservationTermsStyle