import useSwiperButtonContoll from "@/util/hooks/util_hook"
import { useDispatch } from "react-redux"
import { toggle_target } from "@/redux/modules/overaySlice"

function useUserProfileMainStlye(cons, states, refs, props){

    // =================================================
    // dispatch //
    const dispatch = useDispatch()

    // =================================================
    // swiper //
    const {
        RbtnState, 
        LbtnState, 
        swiper_ref, 
        moveRSlide, 
        moveLslide, 
        swiper_change
    } = useSwiperButtonContoll(2)

    // =================================================
    // modal toggle
    function modal_toggle(key_name){
        dispatch(toggle_target({id:key_name}))
    }

    return {
        RbtnState, 
        LbtnState, 
        swiper_ref, 
        moveRSlide, 
        moveLslide, 
        swiper_change,
        modal_toggle
    }
}

export default useUserProfileMainStlye