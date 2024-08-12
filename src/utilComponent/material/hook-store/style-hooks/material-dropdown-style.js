
function useMaterialDropdownStyle(data, states, refs, props){

    // 드롭다운 열/닫기
    function dropdown_toggle(e){
        refs.drop_list.current.classList.toggle('dr-active')
        if(refs.drop_list.current.classList.contains('dr-active')){
           refs.drop_arrow.current.style.transform = 'rotateZ(90deg)'
        }else{
            refs.drop_arrow.current.style.transform = 'rotateZ(-90deg)'
        }

    }

    // 드롭다운 옵션 선택


    return {dropdown_toggle}
}

export default useMaterialDropdownStyle