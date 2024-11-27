import { useDispatch, useSelector } from "react-redux"
import { toggle_target } from "../../../../redux/modules/overaySlice"

function useMenuSideStyle(data, states, refs, props){

    //props
    const {handle_ref} = props

    // refs
    const {map_btn} = refs

    // redux
    const dispatch = useDispatch()
    const open_target_id = useSelector(state => state.overay.open_target_id)
        

    // modal 제어
    function handle_modal(e){
        e.stopPropagation()
        const key_data = e.currentTarget.dataset.toggle_data
        dispatch(toggle_target({id : key_data}))
        handle_ref.current.appear_modal()
    }

    return {handle_modal}
}
export default useMenuSideStyle