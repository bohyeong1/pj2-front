
function useAccRegistLv8Style(data, states, refs, props){
    // =================================================
    // refs //
    const {regist_lv8_alarm} = refs

    // =================================================
    // style 및 state 변경 //
    function lv8_text_input_change(text){
        const length = text.length
        regist_lv8_alarm.current.innerText = `${length}/20`
    }
    return {lv8_text_input_change}
}

export default useAccRegistLv8Style