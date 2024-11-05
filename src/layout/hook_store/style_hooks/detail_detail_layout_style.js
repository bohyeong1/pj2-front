import gsap from 'gsap'
import { useLayoutEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function useDetailDetailLayoutStyle(data, states, refs, props){

    useLayoutEffect(()=>{
        // gsap.set('.detail-detail-layout__fix-menu', {autoAlpha: 0})
        gsap.to('.detail-detail-layout__fix-menu', {
            scrollTrigger : {
                trigger : '.detail-detail-layout__img',
                start : 'bottom top',
                toggleActions : 'play none none reverse'
            },
            autoAlpha: 1,
            duration : 0,
            immediateRender: false
        })
    },[])

    return {}
}

export default useDetailDetailLayoutStyle