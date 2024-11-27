function useModalImgRegistModalBusiness(data, states, refs, props){

    // =================================================
    // refs //
    const {img_input} = refs

    // =================================================
    // states //
    const {
        img_state, 
        setImg_state, 
        loading,
        setLoading
    } = states

    // =================================================
    // props //
    const {
        img_modal_toggle, 
        drop_img_state, 
        setDrop_img_state, 
        target_id
    } = props

    // =================================================
    // 등록 버튼 //
    function regist_button(){
        img_input.current.click()
    }

    // =================================================
    // 이미지 파일 넘기기 //
    function set_img_file(e){
        setLoading(false)
        if(img_state){
            setDrop_img_state(img_state)
            setImg_state(null)
        }              
        img_input.current.value = ''
        img_modal_toggle(target_id)
        setLoading(true)
    }

    return {
        set_img_file, 
        regist_button
    }
}

export default useModalImgRegistModalBusiness