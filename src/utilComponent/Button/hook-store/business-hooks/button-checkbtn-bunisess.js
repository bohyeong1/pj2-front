
import { useSearchParams } from "react-router-dom"
function useButtonCheckbtnBusiness(data,states,refs,props){

    const [SearchParams,setSearchParams] = useSearchParams()

    // on인풋
    function checkbtnInput(e){
        if(e.target.checked){
            SearchParams.set(props.keyValue, e.target.value)
            setSearchParams(SearchParams)
        }else{
            SearchParams.delete(props.keyValue)
            setSearchParams(SearchParams)
        }
    }

    // 인풋 클릭
    function checkbtnClick(e){
        const check_btn = document.querySelectorAll('.check_btn')
        check_btn.forEach((ele)=>{

            if(ele === e.target){
                if(e.target.checked){
                    e.target.checked = true
                }else{
                    e.target.checked = false
                }
            }else{
                ele.checked = false
            }
        })
    }



    return {checkbtnClick, checkbtnInput}
}

export default useButtonCheckbtnBusiness