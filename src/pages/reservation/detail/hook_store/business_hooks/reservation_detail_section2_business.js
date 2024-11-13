import { useNavigate } from "react-router-dom"

function useReservationDetailSection2Business(cons, states, refs, props){

    // =================================================
    // navigate
    const navigate = useNavigate()

    // =================================================
    // click massage button
    function click_massage_button(){
        navigate(`/user/reservation/message?role=guest`)
    }


    return {click_massage_button}
}

export default useReservationDetailSection2Business