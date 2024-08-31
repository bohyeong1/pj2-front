import default_data from "../../../../utilData/defaultData"
import '../../../../manage_scss_style/commonness/commonness.scss'
import { useEffect } from "react"
import _ from 'lodash'
import { connect_data_width_cookies } from "../../../../utilData/UtilFunction"
import session_storage from "../../../../sessionStorage/session_storage"

function useAccRegistLv2Business(data, states, refs, props){

    // =================================================
    // states //
    const {current_data, setCurrent_data, prev_data, setPrev_data, fetch_state, setFetch_state, loading, setLoading} = states

    // =================================================
    // refs //
    const {categories} = refs

    // =================================================
    // fatch function //
    async function fetch_acc(data, index){
        setLoading(false)
        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv2`, 'PUT', 
        {
            acc_step : parseInt(index),
            space_category : data
        })

        if(acc_data && acc_data.acc_state){
            session_storage.save('house',acc_data.accomodation)
        }        
        setLoading(true)
        return acc_data.acc_state ? acc_data : false
    } 

    // =================================================
    // space_caterory 선택 //
    function click_box(id){
        for(let i=0; i<default_data.d_house_space.length; i++){
            if(i == id){
                categories.current[id].classList.toggle('acc-regist-sellect-box-active')
            }
            else{
                categories.current[i].classList.remove('acc-regist-sellect-box-active')
            }
        }
        setCurrent_data(current_data === default_data.d_house_space[id] ? null : default_data.d_house_space[id])
    }

    // =================================================
    // current_data 바꼇을 때만 업데이트 fetch 진행 //   
    useEffect(()=>{
        if(prev_data && current_data && prev_data.name === current_data.name){
            setFetch_state(false)
        }else{
            setFetch_state(true)
        }
    },[current_data])

    return {fetch_acc, click_box}
}
export default useAccRegistLv2Business