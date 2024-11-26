import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useParams } from "react-router-dom";
import _ from 'lodash'

function useHostRegistView3Business(data, states, refs, props){
    // =================================================
    // states //
    const {
        current_data, 
        setCurrent_data, 
        prev_data, 
        setPrev_data, 
        fetch_state, 
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
        const check_state = _.every(current_data, (ele) => {
            return _.some(prev_data, (el)=>{
                return _.isMatch(el, {counts : ele.counts})
            })
        }) 
        if(!check_state){
            const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv3/${param.house}`, 'PUT', 
            {
                acc_step : parseInt(index),
                base_facility : data
            })
    
            if(acc_data && acc_data.acc_state){
                setHost_acc(acc_data.accomodation)
            }        
            setLoading(true)
            return acc_data.acc_state ? acc_data : false
        }
        // 같은 input값 입력시 fetch 안함
        else{
            setLoading(true)
            return host_acc ? {
                accomodation : {
                    _id : host_acc._id
                }
            } : false
        }
    } 

    return {fetch_acc}
}
export default useHostRegistView3Business