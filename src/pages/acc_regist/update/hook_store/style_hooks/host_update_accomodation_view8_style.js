
function useHostUpdateAccomodationView8Style(data, states, refs, props){

    // =================================================
    // refs //
    const {row_alram_ref,
           summary_alert,
           summary_gurabox} = refs

    // =================================================
    // textarea onchange //
    function text_change(text){
        summary_gurabox.current.textContent = text
        const one_line_height = 20.52
        const line_calculate = summary_gurabox.current.getBoundingClientRect().height / one_line_height
        let row = Math.round(line_calculate)

        row_alram_ref.current.textContent = `${row}/50`
        if(row > 50){
            summary_alert.current.style.display = 'block'
        }else{
            summary_alert.current.style.display = 'none'
        }
    }
    return {text_change}
}

export default useHostUpdateAccomodationView8Style