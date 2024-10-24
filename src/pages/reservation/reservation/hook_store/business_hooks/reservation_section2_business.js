import { useNavigate, useParams } from "react-router-dom";
function useReservationSection2Business(data, states, refs, props){

    // =================================================
    // query data //
    const navigator = useNavigate()

    // =================================================
    // parameter //
    const param = useParams()

    // =================================================
    // click prev //    
    function click_prev(){
        navigator(`/detail/${param.house}`)
    }

    return {click_prev}
}

export default useReservationSection2Business