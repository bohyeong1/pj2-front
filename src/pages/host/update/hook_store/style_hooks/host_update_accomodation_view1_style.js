
function useHostUpdateAccomodationView1Style(data, states, refs, props){

    // =================================================
    // refs //
    const {accomodation_title_alram} = refs

    // =================================================
    // states //
    const {is_button, setIs_button, title, setTitle} = states

    // =================================================
    // data //   
    const {getValues} = data

    // =================================================
    // style 및 state 변경 //
    function text_input_change(text){
        const length = text.length
        accomodation_title_alram.current.innerText = `${length}/20`
        if(is_button && (getValues('title') === title)){
            setIs_button(false)
        }
        if(!is_button && getValues('title') !== title){
            setIs_button(true)
        }        
    }

    return {text_input_change}
}

export default useHostUpdateAccomodationView1Style