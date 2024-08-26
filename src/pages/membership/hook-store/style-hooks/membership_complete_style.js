import gsap from "gsap"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
function useMembershipCompleteStyle(data, states, refs, props){

    // =================================================
    // refs //
    const {cuty_bbozzak} = refs

    // =================================================
    // navigator //
    const navigate = useNavigate()

    // =================================================
    // 꼬마 내리기 //
    useEffect(()=>{
        const tl = gsap.timeline()
        tl.fromTo(cuty_bbozzak.current,{
            y : -800,
            x : -100,
            rotate : 20
        },{
            y : -650,
            x : 100,
            rotate : -20,
            duration : 1.5,
            ease: "power1.inOut"
        })
        .fromTo(cuty_bbozzak.current,{
            y : -650,
            x : 100,
            rotate : -20
        },{
            y : -250,
            x : -100,
            rotate : 20,
            duration : 1.5,
            ease: "power1.inOut"
        })
        .fromTo(cuty_bbozzak.current,{
            y : -250,
            x : -100,
            rotate : 20
        },{
            y : 0,
            x : 0,
            rotate : 0,
            duration : 1.5,
            ease: "power1.inOut"
        })

    },[])

    // =================================================
    // 버튼 클릭 //    
    function button_click(){
        navigate('/')
    }


    return {button_click}
}

export default useMembershipCompleteStyle