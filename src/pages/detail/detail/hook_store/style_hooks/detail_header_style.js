import { useDispatch } from "react-redux"
import { toggle_target } from "@/redux/modules/overaySlice"
import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"

function useDetailHeaderStyle(data, states, refs, props){

    // =================================================
    // dispatch //
    const dispatch = useDispatch()
    
    // =================================================
    // modal toggle
    function modal_toggle(key_name){
        dispatch(toggle_target({id:key_name}))
    }

    // =================================================
    // click map target
    function click_map_target(){
        gsap.to(window, {
            duration : 0.6,
            scrollTo : {
                y : '.detail-detail-layout__section2',
                offsetY : 120
            }
        })
    }

    return {
        modal_toggle,
        click_map_target
    }
}

export default useDetailHeaderStyle