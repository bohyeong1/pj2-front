import { ImgContext } from "../config/img_context"
import useImgContextState from "../context_state_hooks/img_context_states_hook"

function ImgProvider({children}){
    // =================================================
    // states //    
    const {main_img_state, setMain_img_state, 
            sub_img1_state, setSub_img1_state,
            sub_img2_state, setSub_img2_state,
            sub_img3_state, setSub_img3_state,
            sub_img4_state, setSub_img4_state} = useImgContextState()

    return (
        <ImgContext.Provider  value = {{main_img_state, setMain_img_state, 
                                        sub_img1_state, setSub_img1_state,
                                        sub_img2_state, setSub_img2_state,
                                        sub_img3_state, setSub_img3_state,
                                        sub_img4_state, setSub_img4_state}}>
            {children}
        </ImgContext.Provider>
    )
}

export default ImgProvider