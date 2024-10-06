import _ from 'lodash'
import { useEffect } from "react"
import default_data from "@/util/default_data/default_data";
import { file_data } from "@/util/function/util_function";
import session_storage from "@/sessionStorage/session_storage";
import { useParams } from "react-router-dom";

function useHostUpdateAccomodationView4Business(data, states, refs, props){
  
    // =================================================
    // params //
    const param = useParams() 

    // =================================================
    // data //
    const {acc_data, 
           setAcc_data} = data

    // =================================================
    // states//
    const {current_data, 
           setCurrent_data, 
           loading, 
           setLoading, 
           is_button, 
           setIs_button} = states

    // =================================================
    // controll button //
    useEffect(()=>{
        if(is_button){
            if(current_data.main_img === current_data.main_display_url && current_data.sub_display_url.every((el, index)=>{
                return el === current_data.sub_img[index]
            })){
                setIs_button(false)
                return
            }

            if(!current_data.main_display_url || current_data.sub_display_url.length < 4){
                setIs_button(false)
                return
            }
            return
        }

        if(!is_button && current_data.main_display_url && current_data.sub_display_url.length >= 4){
            if(current_data.main_file || current_data.sub_file.length > 0){
                setIs_button(true)
                return
            }
        }
    },[current_data])

    // =================================================
    // img upload  //
    function img_upload(img_data){
        const img_files = new FormData()

        if(img_data.main_file){
            img_files.append('mainImg', img_data.main_file)
        }
        if(img_data.sub_file.length && img_data.sub_file.every((el)=>{
            return el.size > 0
        })){
            for(const file of img_data.sub_file){
                img_files.append('subImg', file)
            }
        }
        if(img_data.delete_prev_main){
            img_files.append('delete_main_img', img_data.delete_prev_main)
        }
        if(img_data.delete_prev_sub.length){
            img_files.append('delete_sub_img', JSON.stringify(img_data.delete_prev_sub))
        }
 
        return img_files
    }

    // =================================================
    // data fetch //
    async function fetch_acc(){
        setLoading(false)
        const img_files_form = img_upload(current_data)
        // for(let pair of img_files_form.entries()){
        //     console.log(`${pair[0]}:`, pair[1])
        // }
        const acc_data = await file_data(`${default_data.d_base_url}/api/accomodation/modify/photo/${param.house}`, 'PUT', img_files_form)
    
        if(acc_data && acc_data.acc_state && acc_data.server_state){
            setAcc_data(acc_data.accomodation)
            session_storage.save('house',acc_data.accomodation)
            setIs_button(false)
        }        
        setLoading(true)
    }

    return {fetch_acc}
}

export default useHostUpdateAccomodationView4Business