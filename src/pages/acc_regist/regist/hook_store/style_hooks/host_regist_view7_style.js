import default_data from "@/util/default_data/default_data";

function useHostRegistView7Style(data, states, refs, props){
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
        const sellect_keywords = default_data.d_keyword[id] 

        if(categories.current[id].dataset.state === 'true'){
            categories.current[id].dataset.state = false
            categories.current[id].classList.remove('acc-regist-sellect-box-active')

            const prev_data = [...current_data]
            const index = current_data.indexOf(sellect_keywords)
            if(index !== -1){
                const new_data = prev_data.filter((el) => {
                    return el !== sellect_keywords
                })
                setCurrent_data(new_data)
            }
        }else{
            if(!categories.current[id].classList.contains('acc-regist-sellect-box-active')){
                categories.current[id].classList.add('acc-regist-sellect-box-active')
            }
            categories.current[id].dataset.state = true

            if(!current_data.includes(sellect_keywords)){
                const prev_data = [...current_data, sellect_keywords]
                setCurrent_data(prev_data)
            }
        }
    }

    return {click_box}
}

export default useHostRegistView7Style