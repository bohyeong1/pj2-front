import { connect_data_width_cookies } from "../../../../utilData/UtilFunction"
import default_data from "../../../../utilData/defaultData"
import session_storage from "../../../../sessionStorage/session_storage"
import _ from 'lodash'

function useAccRegistLv3Business(data, states, refs, props){
    // =================================================
    // states //
    const {current_data, setCurrent_data, prev_data, setPrev_data, fetch_state, setFetch_state, loading, setLoading} = states

    // =================================================
    // data fetch  //
    async function fetch_acc(data, index){
        setLoading(false)
        const check_state = _.every(current_data, (ele) => {
            return _.some(prev_data, (el)=>{
                return _.isMatch(el, {counts : ele.counts})
            })
        }) 
        if(!check_state){
            const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv3`, 'PUT', 
            {
                acc_step : parseInt(index),
                base_facility : data
            })
    
            if(acc_data && acc_data.acc_state){
                session_storage.save('house',acc_data.accomodation)
            }        
            console.log(acc_data)
            setLoading(true)
            return acc_data.acc_state ? acc_data : false
        }
        // 같은 input값 입력시 fetch 안함
        else{
            setLoading(true)
            return session_storage.load('house') && session_storage.load('house')._id ? {
                accomodation : {
                    _id : session_storage.load('house')._id
                }
            } : false
        }
    } 

    return {fetch_acc}
}
export default useAccRegistLv3Business