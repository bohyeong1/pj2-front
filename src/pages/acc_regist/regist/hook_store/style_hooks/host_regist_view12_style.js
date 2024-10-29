import { useEffect } from "react"
import gsap from "gsap"

function useHostRegistView12Style(data, states, refs, props){

    useEffect(()=>{
        gsap.fromTo(
            '.host-regist-view12__content-text',
            {
                y: '80%', 
                opacity: 0
            },
            {
                y : '0%',
                opacity : 1,
                duration : 0.3,
                ease : 'power2.out',
                stagger : 0.05 
            }
        )

        gsap.fromTo(
            '.host-regist-view12__img',
            {
                x:'-20%',
                opacity:0
            },
            {
                x : '0%',
                opacity : 1,
                duration : 0.6,
                ease : 'power2.out',
                stagger : 0.05 
            }
        )
    },[])

    return {}
}

export default useHostRegistView12Style