import _ from 'lodash'
import { useEffect } from "react"
import default_data from "@/util/default_data/default_data";
import { connect_data_width_cookies } from "@/util/function/util_function";
import session_storage from "@/sessionStorage/session_storage";
import { useParams } from "react-router-dom";

function useHostUpdateAccomodationView7Business(data, states, refs, props){
    
    // =================================================
    // params //
    const param = useParams() 

    // =================================================
    // data //
    const {acc_data, 
           setAcc_data} = data

    // =================================================
    // states//
    const {capacity,
           setCapacity,
           loading,
           setLoading,
           is_button,
           setIs_button} = states

    // =================================================
    // controll button //
    useEffect(()=>{
        if(is_button){
            if(acc_data.capacity === capacity){
                setIs_button(false)
                return
            }
        }

        if(!is_button){
            if(acc_data.capacity !== capacity){
                setIs_button(true)
                return
            }
        }
    },[capacity])

    // =================================================
    // data fetch //
    async function fetch_acc(capacity){
        setLoading(false)
        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/modify/capacity/${param.house}`, 'PUT', 
            {
                capacity : parseInt(capacity)
            })
    
            if(acc_data && acc_data.acc_state && acc_data.server_state){
                setAcc_data(acc_data.accomodation)
                session_storage.save('house',acc_data.accomodation)
                setIs_button(false)
            }        
        setLoading(true)
    }

    return {fetch_acc}
}

export default useHostUpdateAccomodationView7Business