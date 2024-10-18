import gsap from "gsap"
import { useEffect } from "react"
import ScrollTrigger from "gsap/ScrollTrigger"

function useMainStyle(data, states, refs, props){

    // =================================================
    // ref //    
    const {search_component,
           main_app_ref,
           search_menu} = refs

    // =================================================
    // 검색창 에니메이션 //        
    useEffect(()=>{
        // main-board 에니메이션
        gsap.to(search_component.current,{
            opacity : 0,
            duration : 0.2,
            onComplete : ()=>{
                if(search_component.current){
                    gsap.set(search_component.current,{pointerEvents:'none'})
                }
            },
            onReverseComplete : ()=>{
                gsap.set(search_component.current,{pointerEvents:'auto'})
            },
            scrollTrigger : {
                trigger : search_component.current,
                start : 'top top+=77',
                endTrigger : main_app_ref.current,
                end : 'bottom bottom',
                toggleActions : 'play none none reverse'
            }
        })

        // main-menu 검색창 에니메이션
        gsap.to(search_menu.current,{
            opacity : 1,
            duration : 0.2,
            onComplete : ()=>{
                if(search_menu.current){
                    gsap.set(search_menu.current,{pointerEvents:'auto'})
                }

            },
            onReverseComplete:()=>{
                gsap.set(search_menu.current,{pointerEvents:'none'})
            },
            scrollTrigger : {
                trigger : search_component.current,
                start : 'top top+=77',
                endTrigger : main_app_ref.current,
                end : 'bottom bottom',
                toggleActions : 'play none none reverse'
            }
        })
    },[])

    return {}
}

export default useMainStyle