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
    // refs //
    const {lv6_main_img} = refs

    // =================================================
    // 이미지 모달 껏다 키기 //
    function img_modal_toggle(){
        dispatch(toggle_target({id:'img-regist-modal'}))
    }

    // =================================================
    // 이미지 delete //
    function img_delete(){
        setMain_img_state(null)
    }

    // =================================================
    // 모달로 부터 받아온 이미지 display //
    useEffect(()=>{
        // main
        if(main_img_state){         
            lv6_main_img.current.src  = URL.createObjectURL(main_img_state)
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
        // sub
        // if(subImgFile.length != 0){
        //     for(let file of subImgFile){
        //         const index = subImgFile.indexOf(file)
        //         const blob = new Blob([file], { type: 'image/jpeg' })  
        //         lv6_subImg.current[index].src = URL.createObjectURL(blob)
        //     }
        // }
    },[main_img_state])

    return {img_modal_toggle, img_delete}
}

export default useAccRegistLv6Style