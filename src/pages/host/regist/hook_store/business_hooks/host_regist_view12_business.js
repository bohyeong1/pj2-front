import { useNavigate, useParams } from "react-router-dom"

function useHostRegistView12Business(data, states, refs, props){
    // =================================================
    // parameter // 
    const param = useParams()

    // =================================================
    // data fetch // 
    const navigator = useNavigate()

    // =================================================
    // link button //
    function link_button1(){
        navigator(`/host/update/${param.house}/accomodation/title`)
    }

    return {link_button1}
}

export default useHostRegistView12Business