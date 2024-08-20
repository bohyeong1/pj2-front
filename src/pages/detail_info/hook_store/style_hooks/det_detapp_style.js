import { useDispatch } from "react-redux"
import { toggle_target, close_target } from "../../../../redux/modules/overaySlice"

function useDetDetappStyle(){

    // dispatch
    const dispatch = useDispatch()

    // 이미지 모달 껏다 키기
    function img_modal_toggle(){
        dispatch(toggle_target({id:'img-dis-modal'}))
    }

    return {img_modal_toggle}
}

export default useDetDetappStyle