import gsap from "gsap"
import { useEffect } from "react"
import ScrollTrigger from "gsap/ScrollTrigger"

function useMainStyle(data, states, refs, props){

    // =================================================
    // ref //    
    const {search_menu} = refs

    // =================================================
    // 검색창 에니메이션 //        
    useEffect(()=>{
        // main-menu 검색창 에니메이션
        if(search_menu.current){
            gsap.set(search_menu.current,{pointerEvents: 'none'})
            gsap.set('.main-search-modal-section__container',{pointerEvents: 'none'})
            gsap.fromTo(search_menu.current,
                {
                    opacity : 0
                },
                {
                    opacity : 1,
                    duration : 0.2,
                    onComplete : ()=>{
                        gsap.set(search_menu.current,{pointerEvents: 'auto'})
                        gsap.set('.search-menu__default',{pointerEvents: 'auto'})
                    },
                    scrollTrigger : {
                        trigger : '.main-search-board__content-search',
                        start : 'bottom top+=77',
                        endTrigger :'.main-main-layout__container',
                        end : 'bottom bottom',
                        toggleActions : 'play none none reverse',
                        onLeaveBack : ()=>{
                            gsap.set(search_menu.current, {pointerEvents: 'none'})
                            gsap.set('.main-search-modal-section__container', {pointerEvents: 'none'})
                        }
                    }
                })
        }
    },[])

    return {}
}

export default useMainStyle