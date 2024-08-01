import {useState, useRef} from 'react'

function useMainLv5Description(){
    const [RbtnState, setRbtnState] = useState(false)
    const [LbtnState, setLbtnState] = useState(true)
    const swiper_ref = useRef(null)


    // 오른쪽버튼
    function moveRSlide(){
        if (swiper_ref.current) {
            swiper_ref.current.slideNext()
            const btn_state = swiper_ref.current.isEnd
            if (LbtnState) {
                setLbtnState(false)
            }
            if (btn_state) {
                setRbtnState(true)
            }
        }
    }
    // 왼쪽버튼
    function moveLslide(){
        if (swiper_ref.current) {
            swiper_ref.current.slidePrev()
            const btn_state = swiper_ref.current.isBeginning
            if (btn_state) {
                setLbtnState(true)
            }
            if (RbtnState) {
                setRbtnState(false)
            }
        }
    }

    // 스와이퍼 드래그 했을 때 버튼 상태 추적
    function swiper_change(){
        const index = swiper_ref.current.activeIndex
        const length = swiper_ref.current.slides.length
        if (index === 0) {
            if (!LbtnState) {
                setLbtnState(true)
            }
        } else {
            if (LbtnState) {
                setLbtnState(false)
            }
        }

        if (index === length - 4) {
            if (!RbtnState) {
                setRbtnState(true)
            }
        } else {
            if (RbtnState) {
                setRbtnState(false)
            }
        }
    }

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

export default useMainLv5Description