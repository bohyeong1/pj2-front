
function useAccRegistLv9Style(data, states, refs, props){
    // =================================================
    // data //
    const {isValid} = data

    // =================================================
    // refs //
    const {regist_lv9_row_alram, regist_lv9_alert, regist_lv9_gurabox} = refs

    // =================================================
    // textarea onchange //
    function text_change(text){
        regist_lv9_gurabox.current.textContent = text
        const one_line_height = 20.52
        const line_calculate = regist_lv9_gurabox.current.getBoundingClientRect().height / one_line_height
        let row = Math.round(line_calculate)

        regist_lv9_row_alram.current.textContent = `${row}/50`
        if(row > 50){
            regist_lv9_alert.current.style.display = 'block'
        }else{
            regist_lv9_alert.current.style.display = 'none'
        }
    }
    return {text_change}
}

export default useAccRegistLv9Style