import { useImperativeHandle, useRef } from "react"
import gsap from "gsap"
import {useNavigate, useLocation} from 'react-router-dom'
import { close_target } from "../../../../redux/modules/overaySlice"
import { useDispatch } from "react-redux"
        

function useModalSubModalStyle(data, states, refs, props){

    // props => 부모컴포넌트에서 해당 컴포넌트 ref제어할 때 사용하는 ref
    const {handle_ref} = props

    // refs
    const {modal_ref} = refs

    // dispatch
    const dispatch = useDispatch()

    // url
    const navigate = useNavigate()
    const location = useLocation()
    const handle_url = `${decodeURIComponent(location.pathname)}${location.search}`

    // console.log(handle_url)


    // 메서드 정의
    useImperativeHandle(handle_ref, ()=>({
        // 등장
        appear_modal:()=>{
            navigate(`${handle_url}#modal`)
            gsap.to(modal_ref.current,{
                y:'-100%',
                duration:0.3,
                opacity:1
            })
        },
        // 사라짐
        disappear_modal:()=>{
            navigate(handle_url)
            gsap.to(modal_ref.current,{
                y:0,
                duration:0.3,
                opacity:0
            })
        }
    }))

    // 사라지는 함수 컴포넌ㅌ 안에서 쓰기쉽게 재정의
    function close_btn(){
        dispatch(close_target())
        handle_ref.current.disappear_modal()
    }

    return {close_btn}
}

export default useModalSubModalStyle 