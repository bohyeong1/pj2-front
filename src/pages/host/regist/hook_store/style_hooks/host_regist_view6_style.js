import { useDispatch } from "react-redux"
import { toggle_target } from "@/redux/modules/overaySlice"
import { useEffect } from "react"
import { compare_unit8_arrays } from "@/util/function/util_function"
import gsap from "gsap"

function useHostRegistView6Style(data, states, refs, props){
    // =================================================
    // dispatch //
    const dispatch = useDispatch()

    // =================================================
    // states //
    const {
        sellect_target,
        setSellect_target,
        current_data,
        setCurrent_data
    } = states

    // =================================================
    // modal toggle //
    function img_modal_toggle(target_id, type){
        if(type === 'main'){
            setSellect_target(type)
        }
        else if(type && type.includes('sub')){
            setSellect_target(type)
        }
        else{
            // console.log('modal close')
        }
        dispatch(toggle_target({id:target_id}))
    }

    // =================================================
    // img set //
    async function set_img(img){

        if(sellect_target === 'main'){
            const img_url = URL.createObjectURL(img)
            setCurrent_data({
                ...current_data,
                main_file : img,
                main_display_url : img_url
            })
        }
        else if(sellect_target.includes('sub')){
            const target_index = parseInt(sellect_target.split('-')[1])
            const img_url = URL.createObjectURL(img)
            const file_buffer = await img.arrayBuffer()

            setCurrent_data({
                ...current_data,
                sub_file : [...current_data.sub_file, img],
                sub_display_url : current_data.sub_display_url.map((el, index) => {return index === target_index ? {url : img_url, buffer : file_buffer} : el})
            })
        }
        else{
            console.log('logic check')
        }
    }

    // =================================================
    // img delete //
    async function img_delete(target, type, target_index){
        if(type === 'main'){
            const prev_img = current_data.main_img
            setCurrent_data({
                ...current_data,
                main_display_url : null,
                delete_prev_main : prev_img === target ? 
                    target : current_data.delete_prev_main
            })
        }
        else if(type === 'sub'){ 
            const prev_img = current_data.sub_img
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
                sub_display_url : current_data.sub_display_url.map((el, index) => {return index === target_index ? {url : null, buffer : null} : el}),
                delete_prev_sub : prev_img && prev_img.includes(target.url) ? 
                    [...current_data.delete_prev_sub, target.url] : current_data.delete_prev_sub,
                sub_file : target.buffer && new_sub_file.length !== current_data.sub_file.length ? [...new_sub_file] : current_data.sub_file
            })
        }
        else{
            console.log('parameter check')
        }
    }

    // =================================================
    // 모달로 부터 받아온 이미지에 따라 스크롤 생성 //
    useEffect(()=>{
        // main
        if(current_data.main_display_url){         
            gsap.to(window, { 
                duration: 0.8, 
                scrollTo: { y: "max" }, 
                ease: "power2.out" 
            })
        }else{
            gsap.to(window, { 
                duration: 0.8, 
                scrollTo: { y: "min" }, 
                ease: "power2.out" 
            })
        }
    },[current_data])

    return {
        img_modal_toggle, 
        img_delete,
        set_img
    }
}

export default useHostRegistView6Style