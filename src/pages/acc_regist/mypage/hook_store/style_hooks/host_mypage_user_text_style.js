
function useHostMypageUserTextStyle(data, states, refs, props){

    // =================================================
    // refs
    const {
        summary_button_wrapper,
        summary_input
    } = refs

    // =================================================
    // states
    const {
        host_summary, 
        setHost_summary
    } = states

    // =================================================
    // props
    const {watch} = props

    // =================================================
    // click modify text
    function click_modify_text(handle_element){
        handle_element.current.focus()
        handle_element.current.style.pointerEvents = 'auto'
        summary_button_wrapper.current.style.transform = 'rotateY(180deg)'
    }

    // =================================================
    // save text
    function save_text(handle_element){
        setHost_summary(watch('summary'))
        handle_element.current.style.pointerEvents = 'none'
        summary_button_wrapper.current.style.transform = 'rotateY(0)'

    }

    return {
        save_text,
        click_modify_text
    }
}

export default useHostMypageUserTextStyle