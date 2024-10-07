import { useEffect} from "react"
import gsap from "gsap";

function useButtonRangeBusiness(data, states, refs, props){
   
    // =================================================
    // refs //
    const {range_target, 
           range_thumb, 
           range_track, 
           button_target,
           range_percent} = refs

    // =================================================
    // states //
    const {index_state, 
           setIndex_state} = states

    // =================================================
    // data //
    const {index_range,
           max_index} = data

    // =================================================
    // props //
    const {set_rate} = props

    // =================================================
    // 마우스 다운 //
    function mouse_down(e){
        if(e.currentTarget.dataset.drag === 'false' && e.target.classList.contains('range-button-thumb')){
            e.currentTarget.dataset.drag = 'true'
            button_target.current = e.target
        }
    }

    // =================================================
    // 마우스 드래그 //
    function mouse_drag(e){
        if(range_target.current.dataset.drag === 'true'){
            const target = button_target.current
            const current_position = e.pageX - range_target.current.getBoundingClientRect().left
            const width = range_target.current.offsetWidth
            const percentage = current_position / width
            const current_index = max_index * percentage

            // 컨테이너 밖에서도 index 제한시키기 위해 reduce로 설정
            const filtered_index = index_range.reduce((pre,cur)=>{
                return Math.abs(pre - current_index) - Math.abs(cur - current_index) > 0 ? cur : pre
            })

            // 버튼 최댓값 최솟값 제한하기
            if(filtered_index > index_range[index_range.length - 1]){
                return
            }
            if(filtered_index < index_range[0]){
                return
            }
            // 박스 이동
            move_thumb(filtered_index, target)
        }
    }

    // =================================================
    // thumb 옮기기
    function move_thumb(index, target){
        const box_width = range_thumb.current.offsetWidth
        const length = index_range.length - 1
        const percentage = index / length
        const width = range_target.current.offsetWidth
        const position = width * percentage

        // track 중간지점
        if(index > index_range[0] && index < index_range[index_range.length - 1]){
            gsap.to(target,{
                x : position - box_width/2,
                duration : 0
            })
        }
        // track 처음
        else if(index === 0){
            gsap.to(target,{
                x : position,
                duration : 0
            })
        }
        // track 끝지점
        else if(index === 7){
            gsap.to(target,{
                x : position - box_width,
                duration : 0
            })
        }

        // 현재 인덱스 dataset에 저장   
        range_target.current.dataset.index = index

        // 현재 percent 화면에 출력
        range_percent.current.textContent = index + '%'

        // range 범위 색상 설정
        const range = percentage * 100

        range_track.current.style.background = `
            linear-gradient(to right, 
            #1273E4 ${range}%, 
            rgb(235,235,235) ${range}%) 
        `
    }

    // =================================================
    // 마우스 업
    function mouse_up(){
        if(range_target.current.dataset.drag === 'true'){

            // 현제 인덱스 값 조회
            const index = range_target.current.dataset.index

            if(index_state !== index){
                setIndex_state(parseInt(index))
                set_rate(parseInt(index))
            }

            // drag상태 유지하는 dataset 초기화
            range_target.current.dataset.drag = 'false'
        }
    }

    // // 마우스 클릭
    // function mouse_click(e){
    //     // 마우스 up 이벤트랑 겹치는거 방지
    //     if(button_target.current){return}

    //     const current_position = e.pageX - e.currentTarget.getBoundingClientRect().left
    //     const width = e.currentTarget.offsetWidth
    //     const percentage = current_position / width
    //     const current_index = max_index * percentage

    //     const filtered_index = Math.round(current_index)

    //     // 클릭 기준 가까운 thumb 위치 이동
    //     const target = 
    //     Math.abs(index_min_state - filtered_index) > Math.abs(index_max_state - filtered_index) ? range_thumb.current[1] : range_thumb.current[0]

    //     // 타겟의 인덱스
    //     const target_index = target.classList.contains('Range-max') ? index_max_state : index_min_state

    //     // 드래그 이벤트랑 시작 겹치는거 방지
    //     if(filtered_index === target_index){
    //         return
    //     }

    //     // // min 버튼 & max 버튼 최댓값 최솟값 제한하기
    //     if(target.classList.contains('Range-min') && filtered_index >= index_max_state){
    //         return
    //     }
    //     if(target.classList.contains('Range-max') && filtered_index <= index_min_state){
    //         return
    //     }


    //     // 박스 이동
    //     move_thumb(filtered_index, target)  

    //     // 파라미터 변경 & 스테이트 변경
    //     if(target.classList.contains('Range-min') && index_min_state !== filtered_index){
    //         setIndex_min_state(parseInt(filtered_index))
    //         // 파라미터 변경
    //         SearchParams.set(keyValue1, value_collections[filtered_index] +'%min')
    //         setSearchParams(SearchParams)
    //     }
    //     if(target.classList.contains('Range-max') && index_max_state !== filtered_index){
    //         setIndex_max_state(parseInt(filtered_index))
    //         // 파라미터 변경
    //         SearchParams.set(keyValue2, value_collections[filtered_index] +'%max')
    //         setSearchParams(SearchParams)
    //     }

    // }


    // =================================================
    // 마우스 up, mouse drag이벤트 전역에 등록해놓고 useeffect로 관리
    useEffect(()=>{
        document.addEventListener('mousemove',mouse_drag)
        document.addEventListener('mouseup',mouse_up)

        // 화면 마운트 해제시 전역 이벤트 삭제
        return () => {
            document.removeEventListener('mousemove', mouse_drag)
            document.removeEventListener('mouseup', mouse_up)
        }
    },[index_state])

    // =================================================
    // 초기 스타일
    useEffect(()=>{
        move_thumb(index_state , range_thumb.current)
    },[])

    return {mouse_down}
}

export default useButtonRangeBusiness