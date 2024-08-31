import default_data from "../../../../utilData/defaultData"
import session_storage from "../../../../sessionStorage/session_storage"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { connect_data_width_cookies } from "../../../../utilData/UtilFunction"

function useAccRegistLv0Business(data, states, refs, props){

    // =================================================
    // states //
    const { loading, setLoading, fetch_state, setFetch_state } = states

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
            session_storage.save('house',acc_data.accomodation)
        }        
        setLoading(true)
        return acc_data ? acc_data : false
    }

    // =================================================
    // fetch 유무 결정 //
    useEffect(()=>{
        if(session_storage.load('house') && param.house === session_storage.load('house')._id){
            setFetch_state(false)
        }else{
            setFetch_state(true)
        }
    },[])

    return {fetch_acc}
}
export default useAccRegistLv0Business