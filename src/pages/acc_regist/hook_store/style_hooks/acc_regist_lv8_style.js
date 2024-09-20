
function useAccRegistLv8Style(data, states, refs, props){
    // =================================================
    // refs //
    const {regist_lv8_alarm, regist_lv8_capacity_value} = refs

    // =================================================
    // states //
    const {capacity, setCapacity} = states

    // =================================================
    // plus button //
    function plus_click(e){
        e.stopPropagation()
        setCapacity(parseInt(regist_lv8_capacity_value.current.innerText) + 1)
    }

    // =================================================
    // minus button //
    function minus_click(e){
        e.stopPropagation() 
        setCapacity(parseInt(regist_lv8_capacity_value.current.innerText) - 1)
    }

    // =================================================
    // style 및 state 변경 //
    function lv8_text_input_change(text){
        const length = text.length
        regist_lv8_alarm.current.innerText = `${length}/20`
    }
    return {lv8_text_input_change, plus_click, minus_click}
}

export default useAccRegistLv8Style