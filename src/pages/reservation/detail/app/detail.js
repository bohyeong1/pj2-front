import ReservationDetailLayout from "@/layout/reservation/reservation_detail_layout/reservation_detail_layout"
import ReservationDetailSection1 from "../sections/reservation_detail_section1/reservation_detail_section1"
import ReservationDetailSection2 from "../sections/reservation_detail_section2/reservation_detail_section2"
import useReservationDetailBusiness from "../hook_store/business_hooks/reservation_detail_business"
import Loading from "@/utilComponent/material/loading/loading"

function ReservationDetail(){

    // =================================================
    // hooks //   
    // business
    const {
        data, 
        error, 
        isLoading
    } = useReservationDetailBusiness()

    if(isLoading){
        return (
            <Loading></Loading>
        )
    }

    if(error){
        // redirection url
    }
    console.log(data)
    return (
        <ReservationDetailLayout>
            <ReservationDetailSection1
                role = {'section1'}
                host = {data.reservation.seller.host_text}
                data = {data.reservation}/>
            <ReservationDetailSection2
                role = {'section2'}
                data = {data}/>
        </ReservationDetailLayout>
    )
}

export default ReservationDetail