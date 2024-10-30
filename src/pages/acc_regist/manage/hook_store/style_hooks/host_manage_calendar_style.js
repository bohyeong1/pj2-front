import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import { max } from "lodash"

function useHostManageCalendarStyle(data, states, refs, props){

    // =================================================
    // states //
    const {
        modal_state,
        setModal_state
    } = states

    // =================================================
    // click box //
    function click_box(target_modal, scroll = false){
        if(!modal_state || modal_state !== target_modal){
            if(scroll){
                gsap.to('.host-manage-calendar__input-wrapper',
                    {
                        duration : 0.3,
                        scrollTo : 'max'
                    }
                )
            }
            setModal_state(target_modal)
        }
        else{
            setModal_state(null)
        }

    }

    return {click_box}
}

export default useHostManageCalendarStyle