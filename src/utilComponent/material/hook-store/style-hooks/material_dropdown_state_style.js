
function useMaterialDropdownStateStyle(data, states, refs, props){

    // =================================================
    // refs // 
    const {drop_list, drop_arrow} = refs

    // =================================================
    // 드롭다운 열 닫기 // 
    function dropdown_toggle(e){
        drop_list.current.classList.toggle('dr-active')
        if(drop_list.current.classList.contains('dr-active')){
           drop_arrow.current.style.transform = 'rotateZ(90deg)'
        }else{
            drop_arrow.current.style.transform = 'rotateZ(-90deg)'
        }

    }

    return {dropdown_toggle}
}

export default useMaterialDropdownStateStyle