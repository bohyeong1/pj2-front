import default_data from "@/util/default_data/default_data";
import _ from 'lodash'
import { is_equal_file, file_data } from "@/util/function/util_function";
import { useParams } from "react-router-dom"

function useHostRegistView6Business(data, states, refs, props){
    // =================================================
    // params //
    const param = useParams()

    // =================================================
    // states //
    const {
        loading, 
        setLoading, 
        current_data,
        setCurrent_data
    } = states

    // =================================================
    // context states //
    const {
        host_acc,
        setHost_acc
    } = data

    // =================================================
    // img upload  //
    function img_upload(img_data, index){
        const img_files = new FormData()

        if(img_data.main_file){
            img_files.append('mainImg', img_data.main_file)
        }
        if(img_data.sub_file.length && img_data.sub_file.every(
            (el)=>{
                return el.size > 0
            })
        ){
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
        if(index){
            img_files.append('acc_step', index)
        }

        return img_files
    }

    // =================================================
    // data fetch  //
    async function fetch_acc(data, index){
        setLoading(false)

        if(!(data.main_file || data.sub_file.length > 0)){
            setLoading(true)
            return host_acc ? 
            {
                accomodation : {
                    _id : host_acc._id
                }
            } : false
        }
        // prev data와 current data 다를 경우 패치 진행
        else{     
            // form data
            const imgs_form = img_upload(data, index)
            // error
            if(!imgs_form){
                return false
            }

            const acc_data = await file_data(`${default_data.d_base_url}/api/accomodation/registLv6/${param.house}`, 'PUT', imgs_form)
        
            if(acc_data && acc_data.acc_state){
                setHost_acc(acc_data.accomodation)
            }      
            setLoading(true)

            return acc_data.acc_state ? acc_data : false
        }
    }
    return {fetch_acc}
}

export default useHostRegistView6Business