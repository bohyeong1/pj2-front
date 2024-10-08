import default_data from "../../../../utilData/defaultData"
import { connect_data_width_cookies } from "../../../../utilData/UtilFunction"
import { useEffect } from "react"
import session_storage from "../../../../sessionStorage/session_storage"
import _ from 'lodash'

function useAccRegistLv1Business(data, states, refs, props){

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
        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv1`, 'PUT', 
        {
            acc_step : parseInt(index),
            category : data
        })
        if(acc_data && acc_data.acc_state){
            session_storage.save('house',acc_data.accomodation)
        }        
        setLoading(true)
        return acc_data.acc_state ? acc_data : false
    } 

    // =================================================
    // category 선택 //
    function click_box(id){
        for(let i=0; i<default_data.d_category_icon.length; i++){
            if(i == id){
                categories.current[id].classList.toggle('Acc-regist-lv1__active')
            }
            else{
                categories.current[i].classList.remove('Acc-regist-lv1__active')
            }
        }
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

export default useAccRegistLv1Business