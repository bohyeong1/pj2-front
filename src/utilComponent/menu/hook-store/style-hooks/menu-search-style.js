
import { useDispatch, useSelector } from "react-redux"
import { toggle_target } from "../../../../redux/modules/overaySlice"

function useMenuSearchStyle(data,states,refs){
    // redux
    const dispatch = useDispatch()
    const open_target_id = useSelector(state => state.overay.open_target_id)
    console.log(states.selectedDropdown)
    // 드롭다운 토글 함수 
    function open_dropdown(e){
        e.stopPropagation()
        const key_data = e.target.dataset.toggle_data
        dispatch(toggle_target({id : key_data}))
    }


    //// 프리뷰 버튼 클릭
    function click_preview(e){
        const index = e.target.dataset.index
        refs[`b_box${index}_ref`].current.click()
        refs[`b_box${index}_ref`].current.focus()
    }

    return {open_dropdown, click_preview, open_target_id}
}

export default useMenuSearchStyle