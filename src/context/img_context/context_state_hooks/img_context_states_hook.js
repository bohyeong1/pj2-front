import { useState } from "react";

// main img context state
function useImgContextState(){
    const [main_img_state, setMain_img_state] = useState(null)

    return {main_img_state, setMain_img_state}
}

export default useImgContextState