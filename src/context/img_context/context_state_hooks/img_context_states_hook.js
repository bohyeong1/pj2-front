import { useState } from "react";

// main img context state
function useImgContextState(){
    // main
    const [main_img_state, setMain_img_state] = useState(null)
    // sub
    const [sub_img1_state, setSub_img1_state] = useState(null)
    const [sub_img2_state, setSub_img2_state] = useState(null)
    const [sub_img3_state, setSub_img3_state] = useState(null)
    const [sub_img4_state, setSub_img4_state] = useState(null)

    return {main_img_state, setMain_img_state, 
            sub_img1_state, setSub_img1_state,
            sub_img2_state, setSub_img2_state,
            sub_img3_state, setSub_img3_state,
            sub_img4_state, setSub_img4_state}
}

export default useImgContextState