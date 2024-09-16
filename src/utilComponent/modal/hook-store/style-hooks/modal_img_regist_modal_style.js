import { useEffect } from "react"
import { useForm } from "react-hook-form";

function useModalImgRegistModalStyle(data, states, refs, props){

    // =================================================
    // states //
    const {img_url_state, setImg_url_state, img_state, setImg_state} = states

    // =================================================
    // refs //
    const {img_input} = refs

    // =================================================
    // props //
    const {img_modal_toggle, drop_img_state, setDrop_img_state, target_id} = props

    // =================================================
    // state form //
    const {register, formState:{errors}, setValue, clearErrors, setError} = useForm()

    // =================================================
    // display img //
    function display_img(){           
        // 형식에 맞지 않는 파일은 담기 x
        const file = img_input.current.files[0]
        if(file){
            const img_foramts = ['image/jpeg', 'image/png', 'image/webp']
            if(img_foramts.includes(file.type)) {
                setValue('image', file)
                clearErrors('image')
                setImg_state(file)
                const img_url  = URL.createObjectURL(file)
                setImg_url_state(img_url)
            }else{
                setValue('image', null)
                setError('image', {
                    type: 'file_type',
                    message: 'jpeg, png, webp 형식의 이미지만 업로드를 지원합니다.',
                })
                setImg_state(null)
                setImg_url_state(null)
            }
        }
    }

    // =================================================
    //  modal close //
    function modal_close(){
        setImg_state(null)
        img_modal_toggle(target_id)
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
        if(!drop_img_state){
            setImg_state(null)
        }
    },[drop_img_state])

    return {display_img, modal_close, delete_button, errors, register}
}

export default useModalImgRegistModalStyle