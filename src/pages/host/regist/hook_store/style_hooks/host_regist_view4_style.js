import default_data from "@/util/default_data/default_data";

function useHostRegistView4Style(data, states, refs, props){    
    // =================================================
    // states //
    const {
        current_data, 
        setCurrent_data
    } = states

    // =================================================
    // refs //
    const {categories} = refs

    // =================================================
    // style 및 state 변경 //
    function click_box(id){
        const sellect_service_facility = default_data.d_service_facility_icon[id] 

        if(categories.current[id].dataset.state === 'true'){
            categories.current[id].dataset.state = false

            const prev_data = [...current_data]
            const index = current_data.indexOf(sellect_service_facility)
            if(index !== -1){
                const new_data = prev_data.filter((el) => {
                    return el !== sellect_service_facility
                })
                setCurrent_data(new_data)
            }
        }else{
            categories.current[id].dataset.state = true

            if(!current_data.includes(sellect_service_facility)){
                const prev_data = [...current_data, sellect_service_facility]
                setCurrent_data(prev_data)
            }
        }
    }

    return {click_box}
}

export default useHostRegistView4Style