import _ from 'lodash'
import session_storage from "@/sessionStorage/session_storage"
import default_data from "@/util/default_data/default_data";
import { connect_data_width_cookies } from "@/util/function/util_function";
import { useParams } from "react-router-dom";

function useHostRegistView4Business(data, states, refs, props){
    // =================================================
    // states //
    const {
        current_data, 
        setCurrent_data, 
        prev_data, 
        setFetch_state, 
        loading, 
        setLoading
    } = states

    // =================================================
    // context states //
    const {
        host_acc,
        setHost_acc
    } = data

    // =================================================
    // parameter //
    const param = useParams()  

    // =================================================
    // data fetch  //
    async function fetch_acc(data, index){
        setLoading(false)
        if(prev_data && Array.isArray(prev_data) && prev_data.length > 0 && current_data.length > 0 && _.isMatch(prev_data, current_data)){
            setLoading(true)
            return host_acc ? {
                accomodation : {
                    _id : host_acc._id
                }
            } : false
        }
        // prev_data와 current_data 다를 경우 패치 진행
        else{
            const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv4/${param.house}`, 'PUT', 
                {
                    acc_step : parseInt(index),
                    service_facility : data
                })
        
                if(acc_data && acc_data.acc_state){
                    setHost_acc(acc_data.accomodation)
                }        

                setLoading(true)
                return acc_data.acc_state ? acc_data : false
        }
    } 

    return {fetch_acc}
}

export default useHostRegistView4Business