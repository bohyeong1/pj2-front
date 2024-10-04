import default_data from "@/util/default_data/default_data";

function useMaterialDropdownStateBusiness(data, states, refs, props){
    // =================================================
    // refs // 
    const {drop_list} = refs

    // =================================================
    // props // 
    const {sellect, call_back, menus} = props

    // =================================================
    // 드롭다운 옵션 선택 // 
    function click_option(id){
        const value = menus[id]
        call_back({
            ...value
        })
        drop_list.current.classList.toggle('dr-active')
    }

    return {click_option}
}

export default useMaterialDropdownStateBusiness