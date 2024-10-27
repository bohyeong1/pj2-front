import default_data from "@/util/default_data/default_data";

function useHostRegistView3Style(data, states, refs, props){
    // =================================================
    // states //
    const {
        current_data, 
        setCurrent_data, 
        button_state, 
        setButton_state
    } = states

    // =================================================
    // refs //
    const {
        categories, 
        lv3_value
    } = refs

    // =================================================
    // style 및 state 변경 //
    function click_box(id){
        // button 클릭 제어
        if(!button_state && parseInt(lv3_value.current[id].value) > 0){
            setButton_state(true)
        }        
        if(button_state && lv3_value.current.every((el)=>{return el.value === '0'})){
            setButton_state(false)
        }

        const new_current_data = current_data.map((el, index) => {
            return index === id ? {...el, counts : parseInt(lv3_value.current[id].value)} : el
        }) 
        setCurrent_data(new_current_data)
    }

    // =================================================
    // plus button //
    function plus_click(e, id){
        e.stopPropagation()
        // button 클릭 제어
        if(!button_state && categories.current[id].value > 0){
            setButton_state(true)
        }        
        if(button_state && categories.current.every((el)=>{return el.value === 0})){
            setButton_state(false)
        }
        lv3_value.current[id].value = parseInt(lv3_value.current[id].value) + 1

        click_box(id)
    }

    // =================================================
    // minus button //
    function minus_click(e, id){
        e.stopPropagation()
        lv3_value.current[id].value = parseInt(lv3_value.current[id].value) - 1

        click_box(id)  
    }

    return {minus_click, plus_click}
}
export default useHostRegistView3Style