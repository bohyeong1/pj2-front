import { useEffect} from "react"
import gsap from "gsap";
import { useSearchParams } from "react-router-dom";


function useButtonPricebtnBusiness(data, states, refs, props){


    // 상수
    const {index_range, max_index, value_collections} = data
    
    // refs
    const {price_target, price_thumb, price_track, button_target} = refs

    // querystring
    const [SearchParams, setSearchParams] = useSearchParams()

    // props
    const {keyValue1, keyValue2} = props

    // states
    const {index_min_state, setIndex_min_state, index_max_state, setIndex_max_state} = states

    // 마ㅣ우스 다운
    function mouse_down(e){
        // console.log(price_track.current.clientWidth)
        if(e.currentTarget.dataset.drag === 'false' && e.target.classList.contains('pricebtn-thumb')){
            e.currentTarget.dataset.drag = 'true'
            button_target.current = e.target
        }
    }
console.log(button_target)
    // 마우스 업
    function mouse_up(e){
        if(price_target.current.dataset.drag === 'true'){

            // 인덱스 변경 & text값 변경 / 중복자리 위치 시 렌더링 x
            const target = button_target.current

            // 현제 인덱스 값 조회
            const index = target.classList.contains('pricebtn-min') ? price_target.current.dataset.min_index : price_target.current.dataset.max_index

            if(target.classList.contains('pricebtn-min') && index_min_state !== index){
                setIndex_min_state(parseInt(index))
                // 파라미터 변경
                SearchParams.set(keyValue1, value_collections[index] +'%min')
                setSearchParams(SearchParams)
            }
            if(target.classList.contains('pricebtn-max') && index_max_state !== index){
                setIndex_max_state(parseInt(index))
                // 파라미터 변경
                SearchParams.set(keyValue2, value_collections[index] +'%max')
                setSearchParams(SearchParams)
            }
            // drag상태 유지하는 dataset 초기화 & 파라미터 변경
            price_target.current.dataset.drag = 'false'
            price_target.current.dataset.target = null
        }
    }


    // 마우스 드래그
    function mouse_drag(e){
        if(price_target.current.dataset.drag === 'true'){
            const target = button_target.current
            const current_position = e.pageX - price_target.current.getBoundingClientRect().left
            // console.log(current_position)
            const width = price_target.current.offsetWidth
            // console.log(width)
            const percentage = current_position / width
            const current_index = max_index * percentage

            // 컨테이너 밖에서도 index 제한시키기 위해 reduce로 설정
            const filtered_index = index_range.reduce((pre,cur)=>{
                return Math.abs(pre - current_index) - Math.abs(cur - current_index) > 0 ? cur : pre
            })
            // console.log(filtered_index)

            // min 버튼 & max 버튼 최댓값 최솟값 제한하기
            if(target.classList.contains('pricebtn-min') && filtered_index >= index_max_state){
                return
            }
            if(target.classList.contains('pricebtn-max') && filtered_index <= index_min_state){
                return
            }

            // 박스 이동
            move_thumb(filtered_index, target)

        }
    }

    // thumb 옮기기
    function move_thumb(index, target){
        const box_width = price_thumb.current[0].offsetWidth
        // console.log(box_width)
        const length = value_collections.length - 1
        const percentage = target.classList.contains('pricebtn-max') ? (index - length) / length : index / length
        const width = price_target.current.offsetWidth
        const position = width * percentage

        // console.log(percentage)

        // track 중간지점
        if(index > 0 && index < 7){
            gsap.to(target,{
                x:target.classList.contains('pricebtn-max') ? position + box_width/2 : position - box_width/2,
                duration: 0
            })
        }
        // track 처음
        else if(index === 0){
            gsap.to(target,{
                x:target.classList.contains('pricebtn-max') ? position + box_width : position,
                duration: 0
            })
        }
        // track 끝지점
        else if(index === 7){
            gsap.to(target,{
                x:target.classList.contains('pricebtn-max') ? position : position - box_width,
                duration: 0
            })
        }

        // 현재 인덱스 dataset에 저장   
        if(target.classList.contains('pricebtn-min')){
            price_target.current.dataset.min_index = index
        }
        if(target.classList.contains('pricebtn-max')){
            price_target.current.dataset.max_index = index
        }

        // range 범위 색상 설정
        const range_min = target.classList.contains('pricebtn-min') ? (index / length)*100 : (index_min_state / length)*100
        const range_max = target.classList.contains('pricebtn-max') ? (index / length)*100 : (index_max_state / length)*100

        price_track.current.style.background = `
            linear-gradient(to right, 
            rgb(235,235,235) ${range_min}%, 
            #1273E4 ${range_min}%, 
            #1273E4 ${range_max}%, 
            rgb(235,235,235) ${range_max}%)
        `
    }

    // 마우스 클릭
    function mouse_click(e){
        // 마우스 up 이벤트랑 겹치는거 방지
        if(button_target.current){return}

        const current_position = e.pageX - e.currentTarget.getBoundingClientRect().left
        const width = e.currentTarget.offsetWidth
        const percentage = current_position / width
        const current_index = max_index * percentage

        const filtered_index = Math.round(current_index)

        // 클릭 기준 가까운 thumb 위치 이동
        const target = 
        Math.abs(index_min_state - filtered_index) > Math.abs(index_max_state - filtered_index) ? price_thumb.current[1] : price_thumb.current[0]

        // 타겟의 인덱스
        const target_index = target.classList.contains('pricebtn-max') ? index_max_state : index_min_state

        // 드래그 이벤트랑 시작 겹치는거 방지
        if(filtered_index === target_index){
            return
        }

        // // min 버튼 & max 버튼 최댓값 최솟값 제한하기
        if(target.classList.contains('pricebtn-min') && filtered_index >= index_max_state){
            return
        }
        if(target.classList.contains('pricebtn-max') && filtered_index <= index_min_state){
            return
        }


        // 박스 이동
        move_thumb(filtered_index, target)  

        // 파라미터 변경 & 스테이트 변경
        if(target.classList.contains('pricebtn-min') && index_min_state !== filtered_index){
            setIndex_min_state(parseInt(filtered_index))
            // 파라미터 변경
            SearchParams.set(keyValue1, value_collections[filtered_index] +'%min')
            setSearchParams(SearchParams)
        }
        if(target.classList.contains('pricebtn-max') && index_max_state !== filtered_index){
            setIndex_max_state(parseInt(filtered_index))
            // 파라미터 변경
            SearchParams.set(keyValue2, value_collections[filtered_index] +'%max')
            setSearchParams(SearchParams)
        }

    }

    // 마우스 up, mouse drag이벤트 전역에 등록해놓고 useeffect로 관리
    useEffect(()=>{
        document.addEventListener('mousemove',mouse_drag)
        document.addEventListener('mouseup',mouse_up)

        // 화면 마운트 해제시 전역 이벤트 삭제
        return () => {
            document.removeEventListener('mousemove', mouse_drag)
            document.removeEventListener('mouseup', mouse_up)
        }
    },[index_max_state, index_min_state])


    useEffect(()=>{
        // thumb 위치 새로고침 대응
        move_thumb(index_min_state , price_thumb.current[0])
        move_thumb(index_max_state , price_thumb.current[1])

    },[])

    return {mouse_down, mouse_click}
}

export default useButtonPricebtnBusiness