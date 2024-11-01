
function useMenuMainStyle(data, states, refs, props){

    // =================================================
    // states // 
    const {
        host_modal,
        setHost_modal
    } = states

    // =================================================
    // click host menu //
    function click_host_menu(){
        setHost_modal(!host_modal)
    } 

    return {click_host_menu}
}

export default useMenuMainStyle