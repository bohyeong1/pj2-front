import { useEffect, useCallback } from "react"
import connect_data from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import _ from 'lodash'
import { useUpdateAndValidateSearchData } from "@/util/apis/common/common_search";
import { useDispatch } from "react-redux";
import { set_location_data, delete_location_data } from "@/redux/modules/searchModalSlice";


function useMenuSearchBusiness(cons, states, refs, props){

    // =================================================
    // const //
    const {
        search_modal_state,
        search_data_name,
        location_data,
        checkin_data,
        checkout_data,
        capacity_data
    } = cons

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
    // refs //
    const {
        location_input_ref
    } = refs

    // =================================================
    // mutation //
    const search_check_mutation = useUpdateAndValidateSearchData()

    // =================================================
    // dispatch //
    const dispatch = useDispatch()

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

            if(search_result.server_state){
                setOnchange_search_data(search_result)
            }
        }
    }, 200), [search_data, search_props])

    // =================================================
    // 검색 버튼 링크 이동 //
    function search_button_click(){
        const location = location_input_ref.current.value
        if(location){
            dispatch(set_location_data({location_data : location}))
        }
        else{
            dispatch(delete_location_data())
        }
        search_check_mutation.mutate(
            {
                location : location,
                date : {
                    checkin : checkin_data,
                    checkout : checkout_data
                },
                capacity : capacity_data
            }
        )
    }

    return {
        search_button_click, 
        location_onchange,
        search_check_mutation
    }
}

export default useMenuSearchBusiness
