import { useState, useRef } from "react"
import { useSearchParams, useLocation } from "react-router-dom"
import default_data from "@/util/default_data/default_data"

// =================================================
// 스와이퍼 버튼 로직 모음 //
// number -> 슬라이더 한 파트당 이미지 등장 개수
function useSwiperButtonContoll(number, handler){
    const [RbtnState, setRbtnState] = useState(false)
    const [LbtnState, setLbtnState] = useState(true)
    const swiper_ref = useRef(null)

    // 오른쪽버튼
    function moveRSlide(){
        if(swiper_ref.current){
            swiper_ref.current.slideNext()
            const btn_state = swiper_ref.current.isEnd
            if(LbtnState){
                setLbtnState(false)
            }
            if(btn_state){
                setRbtnState(true)
            }
        }
    }

    // 왼쪽버튼
    function moveLslide(){
        if(swiper_ref.current){
            swiper_ref.current.slidePrev()
            const btn_state = swiper_ref.current.isBeginning
            if(btn_state){
                setLbtnState(true)
            }
            if(RbtnState){
                setRbtnState(false)
            }
        }
    }

    // 스와이퍼 드래그 했을 때 버튼 상태 추적 및 display 여부
    function swiper_change(){
        const index = swiper_ref.current.activeIndex
        const length = swiper_ref.current.slides.length
        if(index === 0) {
            if(!LbtnState){
                setLbtnState(true)
            }
        }else{
            if(LbtnState){
                setLbtnState(false)
            }
        }

        if(index === length - number){
            if(!RbtnState){
                setRbtnState(true)
            }
        }else{
            if(RbtnState){
                setRbtnState(false)
            }
        }

        if(handler){
            // handler
            handler(index)
        }

    }
    return {
        RbtnState,
        setRbtnState,
        LbtnState,
        setLbtnState,
        swiper_ref, 
        moveRSlide, 
        moveLslide, 
        swiper_change
    }
}
export default useSwiperButtonContoll

// =================================================
// regist page 현재 단계 get //
export function useGetThisStep(){

    // =================================================
    // location //
    const location = useLocation()

    // =================================================
    // const //
    const regist_step = default_data.regist_step
    const this_url = location.pathname.split('/')
    const this_step = regist_step.indexOf(this_url[this_url.length-1])

    return this_step
}
