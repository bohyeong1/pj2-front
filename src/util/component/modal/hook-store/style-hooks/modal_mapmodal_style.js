import { useImperativeHandle } from "react"
import gsap from "gsap"
import {useNavigate, useLocation} from 'react-router-dom'
import { close_target } from "@/redux/modules/overaySlice"
import { useDispatch } from "react-redux"
        

function useModalSubModalStyle(data, states, refs, props){

    // refs
    const {
        filter_ref, 
        list_ref
    } = refs

    // // 메서드 정의
    // useImperativeHandle(handle_ref, ()=>({
    //     // 등장
    //     appear_modal:()=>{
    //         navigate(`${handle_url}#modal`)
    //         gsap.to(modal_ref.current,{
    //             y:'-100%',
    //             duration:0.3,
    //             opacity:1
    //         })
    //         // 스크롤 초기화
    //         filter_ref.current.scrollTop = 0
    //         list_ref.current.scrollTop = 0
    //     }
    // }))

    return {}
}

export default useModalSubModalStyle 