import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

function useButtonCheckbtnStyle(data,states,refs,props){

    const [SearchParams,setSearchParams] = useSearchParams()

    // 화면 새로고침 시 체크 상태 유지
    useEffect(()=>{
        // console.log(SearchParams.get(keyValue))
        const query_word = SearchParams.get(props.keyValue)
        for(let i = 0; i < refs.check_btn_input.current.length; i++){
            if(query_word === refs.check_btn_input.current[i].value){
                refs.check_btn_gura.current[i].classList.add('check_btn_gura-active')
            }
        }
    },[])

    // 구라박스 클릭
    function click_gurabox(e, index){
        refs.check_btn_input.current[index].click()
        const input_state = refs.check_btn_input.current[index].checked
        refs.check_btn_gura.current.forEach((el)=>{
            el.classList.remove('check_btn_gura-active')
        })
        if(input_state){
            e.target.classList.add('check_btn_gura-active')
        }else{
            e.target.classList.remove('check_btn_gura-active')
        }
    }

    return {click_gurabox}
}

export default useButtonCheckbtnStyle