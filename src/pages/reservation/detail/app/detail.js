import ReservationDetailLayout from "@/layout/reservation/reservation_detail_layout/reservation_detail_layout"
import ReservationDetailSection1 from "../sections/reservation_detail_section1/reservation_detail_section1"
import ReservationDetailSection2 from "../sections/reservation_detail_section2/reservation_detail_section2"
import useReservationDetailBusiness from "../hook_store/business_hooks/reservation_detail_business"

function ReservationDetail(){

    // =================================================
    // hooks //   
    // business
    const {} = useReservationDetailBusiness()

    return (
        <ReservationDetailLayout>
            <ReservationDetailSection1
                role = {'section1'}/>
            <ReservationDetailSection2
                role = {'section2'}/>
        </ReservationDetailLayout>
    )
}

export default ReservationDetail