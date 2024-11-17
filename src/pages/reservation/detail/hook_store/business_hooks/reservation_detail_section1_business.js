import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function useReservationDetailSection1Business(cons, states, refs, props){

    // =================================================
    // parameter
    const params = useParams()

    // =================================================
    // states
    const {
        loading, 
        setLoading
    } = states

    // =================================================
    // navigate
    const navigate = useNavigate()

    // =================================================
    // fetch refund 
    async function fetch_refund(){
        setLoading(false)
        const response = await connect_data_width_cookies(`${default_data.d_base_url}/api/reservation/refund/${params.house}`, 'PUT')

        if(response.server_state && response.cash_state && response.reservation_state){
            console.log(response, 'fetch success')
            // navigate()
        }
        else{
            // error 처리.
        }
        setLoading(true)
    }

    return {
        fetch_refund
    }
}

export default useReservationDetailSection1Business