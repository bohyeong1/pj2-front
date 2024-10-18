import useSwiperButtonContoll from "@/util/hooks/util_hook";

function useMainSection4Style(){
    const {RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change} = useSwiperButtonContoll(4)

    return { RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change}
}

export default useMainSection4Style