import util_hooks from "../../../../utilData/utilHook"
import gsap from "gsap"


function useModalImgdismodalStyle(data, states, refs, props){

    // refs
    const {target, target_text} = refs

    // props
    const {acc_data} = props



    // target move
    function target_move(index){
        if(index < 6){
            gsap.to(target.current,{
                x:96*index
            })
            target_text.current.textContent = `${acc_data.title} | ${index + 1}`
        }else{
            // 7이상 이미지 처리 할 곳
        }
    }

    const {RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change} = util_hooks.useSwiperBtn(1, target_move)

    return { RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change}
}

export default useModalImgdismodalStyle