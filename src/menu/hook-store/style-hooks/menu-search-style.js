
function useMenuSearchStyle(data,states,refs){
    ////드롭다운 토글함수
    const openDropdown = (e) => {
        e.stopPropagation()
            if(e.target.id === states.selectedDropdown){
                states.setSelectedDropdown(null)
            }
            else{
                states.setSelectedDropdown(e.target.id)
            }
    }
    return {openDropdown}
}

export default useMenuSearchStyle