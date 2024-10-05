import _ from 'lodash'
import { useEffect } from "react"
import default_data from "@/util/default_data/default_data";
import { connect_data_width_cookies } from "@/util/function/util_function";
import session_storage from "@/sessionStorage/session_storage";
import { useParams } from "react-router-dom";

function useHostUpdateAccomodationView3Business(data, states, refs, props){

    // =================================================
    // refs //
    const {service_facility} = refs
    
    // =================================================
    // params //
    const param = useParams() 

    // =================================================
    // data //
    const {acc_data, setAcc_data} = data

    // =================================================
    // states//
    const {current_data, setCurrent_data, loading, setLoading, is_button, setIs_button} = states

    // =================================================
    // acc_data 초기 sellect 박스에 표시 //
    function match_sellect(data, sellect){
        const is_match = _.some(data, (el)=>{
            return _.isMatch(el, sellect)
        })
        return is_match
    }

    // =================================================
    // click box //
    function click_box(id){
        const sellect = default_data.d_service_facility_icon
        for(let i=0; i<sellect.length; i++){
            if(i == id){
                service_facility.current[id].classList.toggle('acc-regist-sellect-box-active')
            }
        }

        const copied_array = [...current_data]

        if(current_data.length > 0 && match_sellect(current_data, sellect[id])){
            const filtered_array = copied_array.filter((el) => {
                return el.name !== sellect[id].name
            })
            setCurrent_data(filtered_array)
        }
        else{
            copied_array.push(sellect[id])
            setCurrent_data(copied_array)
        }
    }

    // =================================================
    // controll button //
    useEffect(()=>{
        if(is_button){
            if(current_data.length === acc_data.service_facility.length && _.every(acc_data.service_facility,(el)=>{
                return _.some(current_data, (ele)=>{
                    return _.isMatch(el, ele)
                })
            })){
                setIs_button(false)
                return
            }

            if(current_data.length <= 0){
                setIs_button(false)
                return
            }
            return
        }

        if(!is_button && current_data.length > 0 && current_data.length !== acc_data.service_facility.length){
            setIs_button(true)
            return
        }
    },[current_data])

    // =================================================
    // data fetch //
    async function fetch_acc(){
        setLoading(false)
        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/modify/service-facility/${param.house}`, 'PUT', 
            {
                service_facility : current_data
            })
    
            if(acc_data && acc_data.acc_state && acc_data.server_state){
                setAcc_data(acc_data.accomodation)
                session_storage.save('house',acc_data.accomodation)
                setIs_button(false)
            }        
        setLoading(true)
    }

    return {match_sellect, click_box, fetch_acc}
}

export default useHostUpdateAccomodationView3Business