function useModalImgRegistModalBusiness(data, states, refs, props){

    // =================================================
    // refs //
    const {img_input} = refs

    // =================================================
    // states //
    const {img_state, setImg_state} = states

    // =================================================
    // props //
    const {img_modal_toggle, drop_img_state, setDrop_img_state, target_id} = props

    // =================================================
    // 등록 버튼 //
    function regist_button(){
        img_input.current.click()
    }

    // =================================================
    // context state 변경 //
    function set_img_file(e){
        // 메인이미지 파일 넘기기
        e.preventDefault()
        if(img_state){
            setDrop_img_state(img_state)
        }              
        img_modal_toggle(target_id)
    }

    return {set_img_file, regist_button}
}

export default useModalImgRegistModalBusiness