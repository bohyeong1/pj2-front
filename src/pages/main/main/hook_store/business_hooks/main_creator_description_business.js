import { useNavigate } from "react-router-dom"

function useMainCreatorDescriptionBusiness(data, states, refs, props){
    
    // =================================================
    // states //
    const navigator = useNavigate()

    function click_box(url){
        navigator(`${url}`)
    }

    return {click_box}
}

export default useMainCreatorDescriptionBusiness