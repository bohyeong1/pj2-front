import { useEffect } from "react"
import default_data from "@/util/default_data/default_data";
import { connect_data_width_cookies } from "@/util/function/util_function";
import session_storage from "@/sessionStorage/session_storage";
import { useParams } from "react-router-dom";
import _ from 'lodash'

function useHostUpdateCheckView6Business(data, states, refs, props){

    // =================================================
    // states //
    const {loading, 
           setLoading,
           comunication, 
           setComunication,
           is_button,
           setIs_button} = states
    
    // =================================================
    // refs //
    const {comunication_categories} = refs
    
    // =================================================
    // params //
    const param = useParams() 

    // =================================================
    // data //
    const {acc_data, 
           setAcc_data} = data
    
    // =================================================
    // controll button //
    useEffect(()=>{
        if(!is_button && comunication){
            if(!_.isEqual(comunication, acc_data.comunication)){
                setIs_button(true)
            }
        }

        if(is_button){
            if(!comunication){
                setIs_button(false)
                return
            }
            if(_.isEqual(comunication, acc_data.comunication)){
                setIs_button(false)
                return
            } 
        }

    },[comunication])

    // =================================================
    // comunication_caterory 선택 //
    function click_box(id){
        for(let i=0; i<default_data.d_comunication.length; i++){
            if(i == id){
                comunication_categories.current[id].classList.toggle('acc-regist-sellect-box-active')
            }
            else{
                comunication_categories.current[i].classList.remove('acc-regist-sellect-box-active')
            }
        }
 
        setComunication(comunication && _.isEqual(default_data.d_comunication[id], comunication) ? null : default_data.d_comunication[id])
    }

    // =================================================
    // data fetch //
    async function fetch_acc(){
        setLoading(false)
        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/modify/comunication/${param.house}`, 'PUT', 
            {
                comunication : comunication
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

export default useHostUpdateCheckView6Business