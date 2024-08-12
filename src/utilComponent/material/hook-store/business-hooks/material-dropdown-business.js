import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
function useMaterialDropdownBusiness(data, states, refs, props){

    const [SearchParams, setSearchParams] = useSearchParams()
    


    // 새로고침 시 드랍다운 상태 유지
    useEffect(()=>{
        const sort_value = SearchParams.get('sort')
        const decode_value = decodeURIComponent(sort_value)
        // console.log(decode_value)
        const options = refs.drop_options.current
        const select_option = options.filter((el)=>{
            return el.dataset.value === decode_value
        })

        states.setSelect_option(select_option[0])
    },[])

    // 드랍다운 옵션 선택 시
    function click_option(e){
        const value = e.target.dataset.value
        const encode_value = encodeURIComponent(value)

        SearchParams.delete('sort')
        SearchParams.append('sort', encode_value)
        setSearchParams(SearchParams)
        states.setSelect_option(e.target)

        refs.drop_list.current.classList.toggle('dr-active')
    }

    return {click_option}
}

export default useMaterialDropdownBusiness