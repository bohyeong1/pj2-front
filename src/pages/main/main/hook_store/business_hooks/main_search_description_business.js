import { useNavigate } from "react-router-dom"

function useMainSearchDescriptionBusiness(data, states, refs, props){

    // =================================================
    // navigator //
    const navigator = useNavigate()

    function click_box(city){
        navigator(`/SubApp/${city}`)
    }

    return {click_box}
}

export default useMainSearchDescriptionBusiness