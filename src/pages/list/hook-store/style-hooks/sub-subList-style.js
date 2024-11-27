import { useDispatch, useSelector } from "react-redux"
import { set_map_target, delete_map_target, update_map_target } from "../../../../redux/modules/mapSlice"
import { delete_listhover_target, set_listhover_target } from "../../../../redux/modules/listhoverSlice"

function useSubSubListStyle(data,states,refs,props){

    // redux state
    const map_state = useSelector(state => state.map.map_target)
    const list_hover_state = useSelector(state => state.listhover.listhover_target)

    // redux dispatch
    const dispatch = useDispatch()


    //////////////////////////////////////////////////////////
    /////////////////// modal state = true ///////////////////
    /////////////////////////////////////////////////////////

    // modal state = true 일 때 리스트 클릭
    function modal_list_click(e){
        const target = e.currentTarget
        const target_id = target.dataset.key

        // redux state 변경 / toggle

        // 같은거 클릭
        if(map_state[target_id] && map_state[target_id] === target_id){
            dispatch(delete_map_target({key:target_id}))

        }else{
            const prev_key = Object.values(map_state)

            // 업데이트
            if(prev_key.length !== 0){
                dispatch(update_map_target({key:target_id, value:target_id}))
            }
            // 초기 클릭
            else{
                dispatch(set_map_target({key:target_id, value:target_id}))
            }
        }
    }

    // modal state = true일 때 리스트 호버
    function modal_list_hover(e){
        const target = e.currentTarget
        const target_id = `${target.dataset.key}`
        // 클릭 했을 때 호버 이벤트 x
        if(map_state[target_id]){return}
        
        // redux state 변경 / toggle
        const prev_key = Object.values(list_hover_state)
        // 그전 호버 삭제
        if(prev_key.length !== 0){
            prev_key.forEach((el)=>{
                dispatch(delete_listhover_target({key:el}))
            })
        }
        dispatch(set_listhover_target({key:target_id, value:target_id}))
    }

    // modal state = true일 때 리스트 호버 아웃
    function modal_list_out(e){
        const target = e.currentTarget
        const target_id = `${target.dataset.key}`
       
        // 호버 삭제
        dispatch(delete_listhover_target({key:target_id}))
    }

    return {modal_list_click, modal_list_hover,modal_list_out,map_state}
}

export default useSubSubListStyle


