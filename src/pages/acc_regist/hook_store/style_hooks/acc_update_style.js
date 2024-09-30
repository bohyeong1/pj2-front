import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function useAccUpdateStyle(data, states, refs, props){
    // =================================================
    // states //
    const {active_side_section, setActive_side_section} = states

    // =================================================
    // query string //
    const {query_string, setQuery_string} = data

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // props //
    const {acc_data} = props

    // =================================================
    // query string 변화에 대해서 스테이트 변경 //
    useEffect(()=>{
        const side_query_string = query_string.get('side')

        if(side_query_string === 'accomodation'){
            if(active_side_section !== 'accomodation'){
                setActive_side_section('accomodation')
            }
        }
        else if(side_query_string === 'check-in'){
            if(active_side_section !== 'check-in'){
                setActive_side_section('check-in')
            }
        }
        // 선언되지 않은 쿼리스트링 값 들어왔을 때 error page로 리다이렉션
        else{
            // navigate()
        }

    },[query_string])

    // =================================================
    // side menu optional render //
    function optional_side_menu_render(option, {render1 : Render1 ,render2 : Render2}){
        if(option === 'accomodation'){
            return (
                <Render1 acc_data = {acc_data}></Render1>
            )
        }
        else if(option === 'check-in'){
            return (
                <Render2 acc_data = {acc_data}></Render2>
            )
        }
        else{
            return null
        }
    }

    // =================================================
    // click side accomodation  //
    function click_side_accomodation(){
        if(query_string.get('side') === 'accomodation'){
            return
        }
        query_string.set('side','accomodation')
        setQuery_string(query_string)
    }

    // =================================================
    // click side check in  //
    function click_side_check_in(){
        if(query_string.get('side') === 'check-in'){
            return
        }
        query_string.set('side','check-in')
        setQuery_string(query_string)
    }

    return {optional_side_menu_render, click_side_accomodation, click_side_check_in}
}

export default useAccUpdateStyle