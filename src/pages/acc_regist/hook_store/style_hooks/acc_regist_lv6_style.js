import { useDispatch } from "react-redux"
import { toggle_target } from "../../../../redux/modules/overaySlice"
import { useEffect } from "react"
import gsap from "gsap"

function useAccRegistLv6Style(data, states, refs, props){
    // =================================================
    // dispatch //
    const dispatch = useDispatch()

    // =================================================
    // context states //
    const {main_img_state, setMain_img_state} = data

    // =================================================
    // main img modal toggle //
    function img_modal_toggle(target_id){
        dispatch(toggle_target({id:target_id}))
    }

    // =================================================
    // img delete //
    function img_delete(callback){
        callback(null)
    }

    // =================================================
    // 모달로 부터 받아온 이미지에 따라 스크롤 생성 //
    useEffect(()=>{
        // main
        if(main_img_state){         
            gsap.to(window, { 
                duration: 0.8, 
                scrollTo: { y: "max" }, 
                ease: "power2.out" 
            })
        }else{
            gsap.to(window, { 
                duration: 0.8, 
                scrollTo: { y: "min" }, 
                ease: "power2.out" 
            })
        }
    },[main_img_state])

    return {img_modal_toggle, img_delete}
}

export default useAccRegistLv6Style