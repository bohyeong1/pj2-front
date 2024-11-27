import { useDispatch } from "react-redux"
import { set_target_class } from "@/redux/modules/targetClassSlice"

function useMaterialCustomMapOverlayStyle(cons, states, refs, props){

    // =================================================
    // dispatch //   
    const dispatch = useDispatch()

    // =================================================
    // mouse enter custom overlay //   
    function mouse_enter_overlay(target){
        dispatch(set_target_class(target))
    }

    return {mouse_enter_overlay}
}

export default useMaterialCustomMapOverlayStyle