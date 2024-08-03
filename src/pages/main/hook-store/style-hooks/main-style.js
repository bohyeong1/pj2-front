import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react"

function useMainStyle(data, states, refs){

    useEffect(()=>{
        // main-board 에니메이션
        gsap.to(refs.search_component.current,{
            opacity:0,
            duration:0.2,
            onComplete:()=>{
                gsap.set(refs.search_component.current,{pointerEvents:'none'})
            },
            onReverseComplete:()=>{
                gsap.set(refs.search_component.current,{pointerEvents:'auto'})
            },
            scrollTrigger : {
                trigger:refs.search_component.current,
                start:'top top+=77',
                endTrigger:refs.main_app_ref.current,
                end:'bottom bottom',
                toggleActions:'play none none reverse'
            }
        })
    },[])



    return {}
}

export default useMainStyle