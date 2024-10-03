import { useNavigate, useParams } from "react-router-dom"

function useMenuHostSideAditorBusiness(data, states, refs, props){

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // param //    
    const param = useParams()

    // =================================================
    // click box //    
    function click_box(url){
        navigate(`/host/update/${param.house}/accomodation/${url}`)
    }

    return {click_box}
}

export default useMenuHostSideAditorBusiness