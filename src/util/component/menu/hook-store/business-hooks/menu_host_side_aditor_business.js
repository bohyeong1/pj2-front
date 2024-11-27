import { useNavigate } from "react-router-dom"

function useMenuHostSideAditorBusiness(data, states, refs, props){

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // click box //    
    function click_box(url){
        navigate(`./${url}`)
    }

    return {click_box}
}

export default useMenuHostSideAditorBusiness