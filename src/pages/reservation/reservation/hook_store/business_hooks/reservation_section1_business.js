import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useDispatch } from "react-redux"
import { toggle_target } from "@/redux/modules/overaySlice"
import { useParams, useNavigate } from "react-router-dom";

function useReservationSection1Business(data, states, refs, props){

    // =================================================
    // data //    
    const {
        check_in,
        check_out,
        stay_day,
        capacity,
        total_price
    } = data

    // =================================================
    // states //   
    const {
        loading, 
        setLoading,
        is_button, 
        setIs_button
    } = states

    // =================================================
    // navigate //  
    const navigate = useNavigate()

    // =================================================
    // dispatch //
    const dispatch = useDispatch()

    // =================================================
    // parameter //
    const param = useParams()  

    // =================================================
    // modal toggle //
    function modal_toggle(key_name){
        dispatch(toggle_target({id:key_name}))
    }

    // 예약 요청
    async function fetch_reservation(){
        setLoading(false)

        const reservation_response = await connect_data_width_cookies(`${default_data.d_base_url}/api/reservation/regist/${param.house}`, 'POST', 
            {
                total_price : total_price,
                checkin : check_in,
                checkout : check_out,
                capacity : capacity,
                stay_day : stay_day
            })

            if(reservation_response && reservation_response.server_state){
            if(reservation_response.reservation_state && reservation_response.cash_state){
                setLoading(true)
                setIs_button(false)
                navigate('/user/reservation/pending-list')
            }
            // 돈없을 때
            else{
                setLoading(true)
                setIs_button(false)
                modal_toggle('reservation-cash-false')
            }
        }        
        else{
            // error page redirection
        }
    }
    
    return {
        fetch_reservation,
        modal_toggle
    }
}

export default useReservationSection1Business