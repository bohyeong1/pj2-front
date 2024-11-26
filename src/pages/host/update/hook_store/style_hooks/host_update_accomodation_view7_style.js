
function useHostUpdateAccomodationView7Style(data, states, refs, props){
    // =================================================
    // refs //
    const {capacity_ref} = refs

    // =================================================
    // states //
    const {capacity, 
           setCapacity} = states

    // =================================================
    // plus button //
    function plus_click(e){
        e.stopPropagation()
        setCapacity(parseInt(capacity_ref.current.textContent) + 1)
    }

    // =================================================
    // minus button //
    function minus_click(e){
        e.stopPropagation() 
        setCapacity(parseInt(capacity_ref.current.textContent) - 1)
    }

    return {plus_click, minus_click}
}

export default useHostUpdateAccomodationView7Style