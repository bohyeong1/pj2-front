import util_hooks from "../../../../utilData/utilHook";

function useMainLv1DesStyle(){
    const {RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change} = util_hooks.useSwiperBtn(6)

    return { RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change}
}

export default useMainLv1DesStyle