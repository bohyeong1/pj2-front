import default_data from "@/util/default_data/default_data";
import '@/manage_scss_style/commonness/commonness.scss'
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import _ from 'lodash'
import { connect_data_width_cookies } from "@/util/function/util_function";

function useHostRegistView2Business(data, states, refs, props){

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
        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv2/${param.house}`, 'PUT', 
        {
            acc_step : parseInt(index),
            space_category : data
        })

        if(acc_data && acc_data.acc_state){
            setHost_acc(acc_data.accomodation)
        }        
        setLoading(true)
        return acc_data.acc_state ? acc_data : false
    } 

    // =================================================
    // space_caterory 선택 //
    function click_box(id){
        setCurrent_data(current_data === default_data.d_house_space[id] ? null : default_data.d_house_space[id])
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
export default useHostRegistView2Business