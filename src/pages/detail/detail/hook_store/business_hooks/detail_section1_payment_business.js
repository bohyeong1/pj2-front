import { useNavigate } from "react-router-dom";
import { transform_date } from "@/util/function/util_function";

function useDetailSection1PaymentBusiness(data, states, refs, props){

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // props //
    const {params} = props

    // =================================================
    // states //
    const {
        checkin_date,
        setCheckin_date,
        checkout_date,
        setCheckout_date,
        pay_day,
        setPay_day,
        capacity,
        setCapacity,
        animal,
        setAnimal,
        calendar_modal,
        setCalendar_modal,
        capacity_modal,
        setCapacity_modal,
        animal_modal,
        setAnimal_modal} = states

    // =================================================
    // 예약 화면 가기 //
    function click_reservation(){
        const checkin = transform_date(checkin_date, true, true)
        const checkout = transform_date(checkout_date, true, true)
        navigate(`/reservation/${params}?capacity=${capacity}&checkin=${checkin}&checkout=${checkout}`)
    }
    return {click_reservation}
}

export default useDetailSection1PaymentBusiness