import { useDispatch } from "react-redux"
import { toggle_target } from "@/redux/modules/overaySlice"

function useUserProfileManageStyle(cons, states, refs, props){

    // =================================================
    // states //
    const {
        modify_state,
        setModify_state,
        profile_img, 
        setProfile_img
    } = states
 
    // =================================================
    // refs //
    const {
        name_input_ref
    } = refs
    
    // =================================================
    // dispatch //
    const dispatch = useDispatch()

    // =================================================
    // modal toggle
    function modal_toggle(key_name, target = null){
        dispatch(toggle_target({id:key_name}))
    }

    // =================================================
    // auth success //
    function auth_success(){
        setModify_state(true)
        modal_toggle(null)
        name_input_ref.current.focus()
    }

    // =================================================
    // img set //
    async function set_img(img){     
        const img_url = URL.createObjectURL(img)
        setProfile_img({
            ...profile_img,
            delete_prev_img : profile_img.img === profile_img.img_display_url ? profile_img.img : profile_img.delete_prev_img,
            img_file : img,
            img_display_url : img_url
        })
    }

    return {
        modal_toggle,
        auth_success,
        set_img
    }
}

export default useUserProfileManageStyle