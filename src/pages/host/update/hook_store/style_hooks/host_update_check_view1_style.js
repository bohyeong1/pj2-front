
function useHostUpdateStyleView1Style(data, states, refs, props){

    // =================================================
    // refs //
    const {sellect_active_button_wrapper} = refs

    // =================================================
    // states //
    const {sellect_state,
           setSellect_state,
           line_error,
           setLine_error,
           check_in_method,
           setCheck_in_method} = states

    // =================================================
    // data //   
    const {watch} = data

    // =================================================
    // click sellect box //
    function click_sellect_box(data){
        setSellect_state(false)
        setCheck_in_method({
            ...data,
            text : null
        })
    }

    // =================================================
    // delete sellect box //
    function delete_sellect_box(){
        setLine_error(false)
        setSellect_state(true)
        setCheck_in_method(null)        
    }

    // =================================================
    // click modify text
    function click_modify_text(handle_element){
        handle_element.current.focus()
        handle_element.current.style.pointerEvents = 'auto'
        sellect_active_button_wrapper.current.style.transform = 'rotateY(180deg)'
    }

    // =================================================
    // save text
    function save_text(handle_element){
        setCheck_in_method({
            ...check_in_method,
            text : watch('text')
        })
        handle_element.current.style.pointerEvents = 'none'
        sellect_active_button_wrapper.current.style.transform = 'rotateY(0)'

    }

    return {click_sellect_box, delete_sellect_box, click_modify_text, save_text}
}

export default useHostUpdateStyleView1Style