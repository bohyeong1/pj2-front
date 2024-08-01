import util_hooks from "../../../../utilData/utilHook"

function useMainLv5DesStyle(){  

    const {RbtnState,setRbtnState, LbtnState, setLbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change} = util_hooks.useSwiperBtn(4)

    // 분류 버튼 클릭 시 버튼 생성 여부 감별
    function toggle_btn(length){
        // 슬라이더 초기화
        swiper_ref.current.slideTo(0,0)
        setLbtnState(true)
        if(length > 4){
            setRbtnState(false)
        }else{
            setRbtnState(true) 
        }
    }

    return { RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change, toggle_btn }
}

export default useMainLv5DesStyle