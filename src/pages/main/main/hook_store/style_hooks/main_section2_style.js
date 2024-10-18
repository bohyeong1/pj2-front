import useSwiperButtonContoll from "@/util/hooks/util_hook";

function useMainSection2Style(){
    const {RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change} = useSwiperButtonContoll(4)

    return {RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change}
}

export default useMainSection2Style