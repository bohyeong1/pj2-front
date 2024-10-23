import { useNavigate } from "react-router-dom"
import { useEffect, useCallback } from "react"
import connect_data from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import _ from 'lodash'

function useMenuSearchBusiness(data, states, refs, props){

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // props //
    const {search_props} = props

    // =================================================
    // state //
    const {
        search_data,
        setSearch_data,
        onchange_search_data,
        setOnchange_search_data
    } = states

    // =================================================
    // 초기 검색 데이터(검색순) //
    useEffect(()=>{
        if(search_props){
            setSearch_data(search_props)
        }
    },[search_props])

    // =================================================
    // 지역 검색 onchange //

    const location_onchange = useCallback(_.debounce(async(input) => {
        if(input.trim() && search_data){
            setSearch_data(null)
        }
       
        if(!input.trim() && !search_data){
            setSearch_data(search_props)
            setOnchange_search_data(null)
        }

        if(input.trim()){
            const search_result = await connect_data(`${default_data.d_base_url}/api/common/search`,'POST',{
                input : input
            })
            console.log(search_result)
            if(search_result.server_state){
                setOnchange_search_data(search_result)
            }
        }
    },200), [search_data, search_props])

    // =================================================
    // 검색 버튼 링크 이동 //
    function search_button_click(){
        // navigate(`/SubApp/${city}?capacity=${capacity}`)
    }

    return {search_button_click, location_onchange}
}

export default useMenuSearchBusiness
