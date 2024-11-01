import useSwiperButtonContoll from "@/util/hooks/util_hook";

function useMainSection5Style(){  

    // =================================================
    // 스와이퍼 훅 //
    const {
        RbtnState,
        setRbtnState, 
        LbtnState, 
        setLbtnState, 
        swiper_ref, 
        moveRSlide,
        moveLslide, 
        swiper_change
    } = useSwiperButtonContoll(4)

    // =================================================
    // 분류 버튼 //
    function toggle_btn(length){
        // 슬라이더 초기화
        swiper_ref.current.slideTo(0,0)
        setLbtnState(true)
        if(length > 4){
            setRbtnState(false)
        }
        else{
            setRbtnState(true) 
        }
    }

    return {
        RbtnState, 
        LbtnState, 
        swiper_ref, 
        moveRSlide, 
        moveLslide, 
        swiper_change, 
        toggle_btn
    }
}

export default useMainSection5Style