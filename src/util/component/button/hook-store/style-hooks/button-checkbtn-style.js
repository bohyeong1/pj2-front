import { useSearchParams } from "react-router-dom"

function useButtonCheckbtnStyle(data,states,refs,props){

    const [SearchParams,setSearchParams] = useSearchParams()

    // 구라박스 클릭
    function click_gurabox(e, index){
        refs.check_btn_input.current[index].click()
        const input_state = refs.check_btn_input.current[index].checked
    }

    return {
        click_gurabox,
        SearchParams
    }
}

export default useButtonCheckbtnStyle