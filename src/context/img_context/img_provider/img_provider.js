import { ImgContext } from "../config/img_context"
import useImgContextState from "../context_state_hooks/img_context_states_hook"

function ImgProvider({children}){
    // =================================================
    // states //    
    const {main_img_state, setMain_img_state} = useImgContextState()

    return (
        <ImgContext.Provider  value = {{main_img_state, setMain_img_state}}>
            {children}
        </ImgContext.Provider>
    )
}

export default ImgProvider