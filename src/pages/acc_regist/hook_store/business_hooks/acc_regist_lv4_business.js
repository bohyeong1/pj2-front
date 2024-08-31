import _ from 'lodash'
import session_storage from "../../../../sessionStorage/session_storage"
import default_data from "../../../../utilData/defaultData"
import { connect_data_width_cookies } from "../../../../utilData/UtilFunction"

function useAccRegistLv4Business(data, states, refs, props){
    // =================================================
    // states //
    const {current_data, setCurrent_data, prev_data, setPrev_data, fetch_state, setFetch_state, loading, setLoading} = states

    // =================================================
    // data fetch  //
    async function fetch_acc(data, index){
        setLoading(false)
        if(prev_data && Array.isArray(prev_data) && prev_data.length > 0 && current_data.length > 0 && _.isEqual(prev_data, current_data)){
            setLoading(true)
            return session_storage.load('house') && session_storage.load('house')._id ? {
                accomodation : {
                    _id : session_storage.load('house')._id
                }
            } : false
        }
        // prev_data와 current_data 다를 경우 패치 진행
        else{
            const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv4`, 'PUT', 
                {
                    acc_step : parseInt(index),
                    service_facility : data
                })
        
                if(acc_data && acc_data.acc_state){
                    session_storage.save('house',acc_data.accomodation)
                }        
                console.log(acc_data)
                setLoading(true)
                return acc_data.acc_state ? acc_data : false
        }
    } 

    return {fetch_acc}
}

export default useAccRegistLv4Business