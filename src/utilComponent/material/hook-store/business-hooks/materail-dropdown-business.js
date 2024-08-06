import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
function useMaterialDropdownBusiness(data, states, refs, props){

    const [SearchParams, setSearchParams] = useSearchParams()
    


    // 새로고침 시 드랍다운 상태 유지
    useEffect(()=>{
        const sort_value = SearchParams.get('sort')
        // console.log(refs.drop_options.current)
        const options = refs.drop_options.current
        const select_option = options.filter((el)=>{
            return el.dataset.value === sort_value
        })

        // console.log(select_option)
    },[])

    return {}
}

export default useMaterialDropdownBusiness