import { useNavigate, useParams} from "react-router-dom"

function useHostUpdateLayoutBusiness(data, states, refs, props){

    // =================================================
    // parameter //
    const param = useParams()

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // click preview page //
    function click_prev_page_button(){
        navigate('/host/manage/list')
    }   

    // =================================================
    // click side accomodation  //
    function click_side_accomodation(){
        navigate(`/host/update/${param.house}/accomodation/title`)
    }

    // =================================================
    // click side check in  //
    function click_side_check_in(){
        navigate(`/host/update/${param.house}/check/checkin`)
    }
    return {click_prev_page_button, click_side_accomodation, click_side_check_in}

}

export default useHostUpdateLayoutBusiness