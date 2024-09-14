import { useEffect } from "react"

function useModalImgRegistModalStyle(data, states, refs, props){

    // =================================================
    // states //
    const {img_url_state, setImg_url_state, img_state, setImg_state} = states

    // =================================================
    // context states //
    const {main_img_state, setMain_img_state} = data

    // =================================================
    // refs //
    const {main_img_input} = refs

    // =================================================
    // props //
    const {img_modal_toggle} = props

    // =================================================
    // display img //
    function display_img(){       
        const img_url  = URL.createObjectURL(main_img_input.current.files[0])
        setImg_state(main_img_input.current.files[0])
        setImg_url_state(img_url)
    }

    // =================================================
    //  modal close //
    function modal_close(){
        setImg_state(null)
        img_modal_toggle()
    }

    // =================================================
    //  delete img //
    function delete_button(){
        setImg_state(null)
        setImg_url_state(null)
    }

    // =================================================
    //  initialize local state //
    useEffect(()=>{
        if(!main_img_state){
            setImg_state(null)
        }
    },[main_img_state])

    return {display_img, modal_close, delete_button}
}

export default useModalImgRegistModalStyle