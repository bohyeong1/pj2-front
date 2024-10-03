import { useNavigate, useParams } from "react-router-dom"

function useMenuHostSideCheckInAditorBusiness(data, states, refs, props){

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // param //    
    const param = useParams()

    // =================================================
    // click box //    
    function click_box(url){
        navigate(`/host/update/${param.house}/check/${url}`)
    }

    return {click_box}
}

export default useMenuHostSideCheckInAditorBusiness