import { useEffect } from "react"
import default_data from "@/util/default_data/default_data";
import { connect_data_width_cookies } from "@/util/function/util_function";
import session_storage from "@/sessionStorage/session_storage";
import { useParams } from "react-router-dom";
import _ from 'lodash'

function useHostUpdateAccomodationView2Business(data, states, refs, props){

    // =================================================
    // states //
    const {loading, setLoading, category, setCategory, space_category, setSpace_category, is_button, setIs_button} = states
    
    // =================================================
    // refs //
    const {space_categories} = refs
    
    // =================================================
    // params //
    const param = useParams() 

    // =================================================
    // data //
    const {acc_data, setAcc_data} = data
    
    // =================================================
    // controll button //
    useEffect(()=>{
        if(!is_button && category && space_category){
            if(!_.isMatch(category, acc_data.category) || !_.isMatch(space_category, acc_data.space_category)){
                setIs_button(true)
            }
        }

        if(is_button){
            if(!category || !space_category){
                setIs_button(false)
                return
            }
            if(_.isMatch(category, acc_data.category) && _.isMatch(space_category, acc_data.space_category)){
                setIs_button(false)
                return
            } 
        }

    },[category, space_category])

    // =================================================
    // space_caterory 선택 //
    function click_box(id){
        for(let i=0; i<default_data.d_house_space.length; i++){
            if(i == id){
                space_categories.current[id].classList.toggle('acc-regist-sellect-box-active')
            }
            else{
                space_categories.current[i].classList.remove('acc-regist-sellect-box-active')
            }
        }
 
        setSpace_category(space_category && _.isMatch(default_data.d_house_space[id], space_category) ? null : default_data.d_house_space[id])
    }

    // =================================================
    // data fetch //
    async function fetch_acc(){
        setLoading(false)
        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/modify/category/${param.house}`, 'PUT', 
            {
                category : category,
                space_category : space_category
            })
    
            if(acc_data && acc_data.acc_state && acc_data.server_state){
                setAcc_data(acc_data.accomodation)
                session_storage.save('house',acc_data.accomodation)
                setIs_button(false)
            }        
        setLoading(true)
    }

    return {fetch_acc, click_box}
}

export default useHostUpdateAccomodationView2Business