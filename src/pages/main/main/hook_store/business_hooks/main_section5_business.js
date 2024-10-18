import { useEffect } from 'react'
import connect_data from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";

function useMainSection5Business(data, states, refs, props){

    // =================================================
    // states //
    const {toggle,
           setToggle,
           data_store,
           setData_store} = states

    // =================================================
    // data //       
    const {toggle_btn} = data

    // =================================================
    // 분류 버튼 클릭 //
    function main_click(e){
        setToggle({key:e.target.dataset.value})
    }

    // =================================================
    // api 호출 //
    useEffect(() => {
        // fetch data
        async function select_data(filter_category, toggle_key) {
            let data
            try{
                data = await connect_data(`${default_data.d_base_url}/api/common`, 'POST', {
                filter: filter_category,
                counts: 12,
                keyword: toggle_key || null,
                })
            }catch(e){
                console.log(e)
            }finally{
                setData_store(data.accomodations)
                const data_length = data.accomodations.length
                toggle_btn(data_length)
            }}

        // 초기 렌딩 & 전체 클릭
        if (toggle.key === 'default') {
            select_data('all')
        } 
        // 버튼 클릭
        else {
            select_data('category', toggle.key)
        }
    }, [toggle])

    return {main_click}
}

export default useMainSection5Business