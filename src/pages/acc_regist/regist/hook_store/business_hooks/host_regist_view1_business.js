import default_data from "@/util/default_data/default_data";
import { connect_data_width_cookies } from "@/util/function/util_function";
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import _ from 'lodash'

function useHostRegistView1Business(data, states, refs, props){

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
    // fatch function //
    async function fetch_acc(data, index){
        setLoading(false)
        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv1/${param.house}`, 'PUT', 
        {
            acc_step : parseInt(index),
            category : data
        })
        if(acc_data && acc_data.acc_state){
            setHost_acc(acc_data.accomodation)
        }        
        setLoading(true)
        return acc_data.acc_state ? acc_data : false
    } 

    // =================================================
    // category 선택 //
    function click_box(id){
        setCurrent_data(current_data === default_data.d_category_icon[id] ? null : default_data.d_category_icon[id])
    }

    // =================================================
    // current_data 바꼇을 때만 업데이트 fetch 진행 //   
    useEffect(()=>{
        if(!_.isEqual(prev_data, current_data)){
            setFetch_state(true)
        }else{
            setFetch_state(false)
        }
    },[current_data])

    return {fetch_acc, click_box}
}

export default useHostRegistView1Business