import { useDispatch } from "react-redux"
import { set_img_regist_target } from "../../../../redux/modules/imgRegistSlice"

function useModalImgRegistModalBusiness(data, states, refs, props){

    // =================================================
    // refs //
    const {main_img_form, main_img_input} = refs

    // =================================================
    // context states //
    const {main_img_state, setMain_img_state} = data

    // =================================================
    // props //
    const {img_modal_toggle} = props

    // =================================================
    // dispatch //
    const dispatch = useDispatch()

    // =================================================
    // 등록 버튼 //
    function regist_button(){
        main_img_input.current.click()
    }

    // =================================================
    // context state 변경 //
    function set_img_file(e){
        // 메인이미지 파일 넘기기
        e.preventDefault()
            const image = main_img_form.current.mainImg.files[0]   
            setMain_img_state(image)              
            img_modal_toggle()
    }

    return {set_img_file, regist_button}
}

export default useModalImgRegistModalBusiness