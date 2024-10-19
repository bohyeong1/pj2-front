import { useNavigate } from "react-router-dom"

function useMenuSearchBusiness(data, states,refs){

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // 검색 버튼 링크 이동 //
    function search_button_click(){
        // navigate(`/SubApp/${city}?capacity=${capacity}`)
    }

    return {search_button_click}
}

export default useMenuSearchBusiness
