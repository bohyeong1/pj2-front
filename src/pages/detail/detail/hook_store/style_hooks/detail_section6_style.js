import { useDispatch } from "react-redux"
import { toggle_target } from "@/redux/modules/overaySlice"

function useDetailSection6Style(data, states, refs, props){
    
    // =================================================
    // dispatch //
    const dispatch = useDispatch()
    
    // =================================================
    // modal toggle
    function modal_toggle(key_name){
        dispatch(toggle_target({id:key_name}))
    }

    return {
        modal_toggle
    }
}

export default useDetailSection6Style