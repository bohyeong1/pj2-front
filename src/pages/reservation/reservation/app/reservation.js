import ReservationReservationLayout from "@/layout/reservation/reservation_reservation_layout/reservation_reservation_layout"
import { useContext } from "react"
import { CommonAccContext } from "@/context/common_acc_context/config/common_acc_context"
import { UserContext } from "@/context/user_context/config/user_context"
import ReservationSection1 from "../sections/reservation_section1/reservation_section1"
import ReservationSection2 from "../sections/reservation_section2/reservation_section2"

function Reservation(){

    // =================================================
    // context states //
    const {common_acc, setCommon_acc} = useContext(CommonAccContext)
    const {user_data, setUser_data} = useContext(UserContext)

    return (
        <ReservationReservationLayout>
            <ReservationSection1
                data = {common_acc}
                role = {'section1'}/>
            <ReservationSection2
                data = {common_acc}
                user = {user_data}
                role = {'section2'}/>
        </ReservationReservationLayout>
    )
}

export default Reservation