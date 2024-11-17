import { useNavigate } from "react-router-dom"

function useUserReservationDetailMessageStyle(cons, states, refs, props){

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // click prev button //
    function click_prev_button(){
        navigate('/user/reservation/message?role=guest')
    }

    return {click_prev_button}
}

export default useUserReservationDetailMessageStyle