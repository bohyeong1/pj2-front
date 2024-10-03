
function useHostUpdateAccomodationView1Style(data, states, refs, props){

    // =================================================
    // refs //
    const {accomodation_title_alram} = refs

    // =================================================
    // style 및 state 변경 //
    function text_input_change(text){
        const length = text.length
        accomodation_title_alram.current.innerText = `${length}/20`
    }

    return {text_input_change}
}

export default useHostUpdateAccomodationView1Style