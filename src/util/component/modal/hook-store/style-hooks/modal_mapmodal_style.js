import { useDispatch, useSelector } from "react-redux"
import { set_map_target, delete_map_target, update_map_target } from "@/redux/modules/mapSlice"
import { delete_listhover_target, set_listhover_target } from "@/redux/modules/listhoverSlice"
import { useSearchParams } from "react-router-dom"

function useModalSubModalStyle(data, states, refs, props){

    // =================================================
    // refs //
    const {
        filter_ref, 
        list_ref
    } = refs

    // =================================================
    // redux states //
    const map_state = useSelector(state => state.map.map_target)
    const list_hover_state = useSelector(state => state.listhover.listhover_target)

    // =================================================
    // dispatch //
    const dispatch = useDispatch()

    // =================================================
    // query string //
    const [query_string, setQuery_string] = useSearchParams()

    // =================================================
    // click list //
    function modal_list_click(e){
        const target = e.currentTarget
        const target_id = target.dataset.key

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

    // =================================================
    // list hover //
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

    // =================================================
    // list hover out //
    function modal_list_out(e){
        const target = e.currentTarget
        const target_id = `${target.dataset.key}`
        dispatch(delete_listhover_target({key:target_id}))
    }

    // =================================================
    // click initialized button //
    function click_initialized_button(){
        setQuery_string((prev) => {
            const filtering_query = ['category', 'keywords', 'service_facility']

            const filtered_query = Object.fromEntries(
                [...prev].filter(([key]) => !filtering_query.includes(key))
            )
                
            return {
                ...filtered_query, 
                page : 1,
                ['price-min'] : 0,
                ['price-max'] : 500000 
            }
        })

    }
    return {
        modal_list_click, 
        modal_list_hover,
        modal_list_out,
        map_state,
        click_initialized_button
    }

}

export default useModalSubModalStyle 