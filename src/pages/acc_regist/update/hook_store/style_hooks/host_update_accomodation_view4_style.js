import { useDispatch } from "react-redux"
import { toggle_target } from "@/redux/modules/overaySlice"
import { compare_unit8_arrays } from "@/util/function/util_function"

function useHostUpdateAccomodationView4Style(data, states, refs, props){

    // =================================================
    // states //
    const {current_data,
           setCurrent_data,
           sellect_target,
           setSellect_target} = states

    // =================================================
    // data //   

    // =================================================
    // dispatch //
    const dispatch = useDispatch()

    // =================================================
    // main img modal toggle //
    function img_modal_toggle(target_id, type){
        if(type === 'main'){
            setSellect_target('main')
        }
        else if(type === 'sub'){
            setSellect_target('sub')
        }
        else{
            // console.log('modal close')
        }
        dispatch(toggle_target({id:target_id}))
    }

    // =================================================
    // img delete //
    async function img_delete(target, type){
        if(type === 'main'){
            const current_img = current_data.main_img
            setCurrent_data({
                ...current_data,
                main_display_url : null,
                delete_prev_main : current_img === target ? 
                    target : 
                    current_data.delete_prev_main
            })
        }
        else if(type === 'sub'){
 
            const current_img = current_data.sub_img
            const new_sub_file = []
            if(current_data.sub_file.length > 0 && target.buffer){
                for(const file of current_data.sub_file){
                    const file_buffer = await file.arrayBuffer()
                    const file_unit8_array = new Uint8Array(file_buffer)
                    const target_unit8_array = new Uint8Array(target.buffer)
                    if(!compare_unit8_arrays(file_unit8_array, target_unit8_array)){
                        new_sub_file.push(file)
                    }
                }
            }

            setCurrent_data({
                ...current_data,
                sub_display_url : current_data.sub_display_url.filter((el)=>{
                    return el !== target
                }),
                delete_prev_sub : current_img.includes(target.url) ? 
                    [...current_data.delete_prev_sub, target.url] : 
                    current_data.delete_prev_sub,
                sub_file : target.buffer && new_sub_file.length !== current_data.sub_file.length ? [...new_sub_file] : current_data.sub_file
            })
        }
        else{
            console.log('parameter check')
        }
    }

    // =================================================
    // set img //
    async function set_img(img){
        if(sellect_target === 'main'){
            const img_url = URL.createObjectURL(img)
            setCurrent_data({
                ...current_data,
                main_file : img,
                main_display_url : img_url
            })
        }
        else if(sellect_target === 'sub'){
            const img_url = URL.createObjectURL(img)
            const file_buffer = await img.arrayBuffer()
            setCurrent_data({
                ...current_data,
                sub_file : [...current_data.sub_file, img],
                sub_display_url : [...current_data.sub_display_url, {url : img_url, buffer : file_buffer}]
            })
        }
        else{
            console.log('logic check')
        }
    }

    return {img_modal_toggle, img_delete, set_img}
}

export default useHostUpdateAccomodationView4Style