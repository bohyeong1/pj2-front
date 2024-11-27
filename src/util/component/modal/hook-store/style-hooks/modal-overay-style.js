import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { close_target } from "../../../../redux/modules/overaySlice"
function useModalOverayStyle(data, states, refs, props){

    // redux state
    const {overay_state} = data

    // refs
    const {overay_container} = refs

    // dispatch
    const dispatch = useDispatch()

    // overlay click
    function overlay_click(e){
        if(e.target === overay_container.current){
            dispatch((close_target()))
        }
    }

    // overlay 생성 시 스크롤바 x
    useEffect(()=>{
        if(overay_state){
            document.documentElement.style.overflow = 'hidden'
        }else{
            document.documentElement.style.overflow = ''
        }
    },[overay_state])

    return {overlay_click}
}

export default useModalOverayStyle