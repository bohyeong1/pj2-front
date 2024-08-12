
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { initailized_map_target, update_map_target, set_map_target } from "../../../../redux/modules/mapSlice"

function useMaterialCardStlye(data, states, refs, props){

    // props
    const {custom_overlay} = props

    // dispatch
    const dispatch = useDispatch()

    // redux state
    const {map_state, list_hover_state} = data
    // console.log(custom_overlay)

    useEffect(()=>{
        // console.log(map_state)
        // 리스트 클릭 시 z 인덱스 값 조정
        if(map_state){
            custom_overlay.setZIndex(10)
        }else{
            custom_overlay.setZIndex(1)
        }

        // 리스트 호버 시 z 인덱스 값 조정
        if(list_hover_state){
            custom_overlay.setZIndex(11)
        }else if(!list_hover_state && map_state){
            return
        }else{
            custom_overlay.setZIndex(1)
        }
    },[map_state, list_hover_state])

    // 커스텀 오버레이 클릭
    function custom_overlay_click(e){
        const target = e.currentTarget
        const target_id = target.dataset.key

        // redux state 변경 / toggle
        dispatch(update_map_target({key:target_id, value:target_id}))        
    }

    //커스텀 오버레이 호버
    function custom_overlay_hover(e){
        const target = e.currentTarget
        const target_id = target.dataset.key
        if(map_state === target_id){
            return
        }
        custom_overlay.setZIndex(11)
    } 
    // 커스텀 오버레이 아웃
    function custom_overlay_out(e){
        const target = e.currentTarget
        const target_id = target.dataset.key
        if(map_state === target_id){
            return
        }
        custom_overlay.setZIndex(1)
    }

    return{custom_overlay_click, custom_overlay_hover, custom_overlay_out}
}

export default useMaterialCardStlye