import util_hooks from "../../../../utilData/utilHook";

function useMainLv2DesStyle(){
    const {RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change} = util_hooks.useSwiperBtn(4)

    return { RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change}
}

export default useMainLv2DesStyle