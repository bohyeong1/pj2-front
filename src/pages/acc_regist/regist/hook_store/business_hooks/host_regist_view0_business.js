import default_data from "@/util/default_data/default_data";
import session_storage from "@/sessionStorage/session_storage"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { connect_data_width_cookies } from "@/util/function/util_function";

function useHostRegistView0Business(data, states, refs, props){

    // =================================================
    // states //
    const { 
        loading, 
        setLoading, 
        fetch_state, 
        setFetch_state 
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
    // fetch acc //
    async function fetch_acc(data ,index){
        setLoading(false)
        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv0`,'POST',{
            acc_step : parseInt(index)
        })
        if(acc_data && acc_data.acc_state){
            console.log(acc_data)
            setHost_acc(acc_data.accomodation)
        }        
        setLoading(true)
        return acc_data ? acc_data : false
    }

    // =================================================
    // fetch 유무 결정 //
    useEffect(()=>{
        if(host_acc && param.house === host_acc._id){
            setFetch_state(false)
        }else{
            setFetch_state(true)
        }
    },[])

    return {fetch_acc}
}
export default useHostRegistView0Business