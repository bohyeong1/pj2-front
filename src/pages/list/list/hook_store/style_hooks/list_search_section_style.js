import gsap from "gsap"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { close_search_modal } from "@/redux/modules/searchModalSlice"

function useListSearchSection(cons, states, refs, props){

    // =================================================
    // dispatch //
    const dispatch = useDispatch()

    // =================================================
    // redux state //
    const {search_modal_state} = cons

    useEffect(()=>{
        if(search_modal_state){
            gsap.to('.list-search-section__container',{
                y : 76,
                duration : 0.3
            })
            document.documentElement.style.overflow = 'hidden'
        }
        else{
            gsap.to('.list-search-section__container',{
                y : 0,
                duration : 0.3
            })
            document.documentElement.style.overflow = ''
        }
    },[search_modal_state])

    function control_modal(){
        dispatch(close_search_modal())
    }

    return {control_modal}

}

export default useListSearchSection