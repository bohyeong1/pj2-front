import gsap from "gsap"
import { useEffect } from "react"
import _ from 'lodash'

function useHostUpdateStyleView5Style(data, states, refs, props){

    // =================================================
    // refs //
    const {sellect_active_button_wrapper,
           hanlde_ref,
           sellect_ref,
           sellect_active_ref} = refs

    // =================================================
    // states //
    const {sellect_state,
           setSellect_state,
           check_out_method,
           setCheck_out_method} = states

    // =================================================
    // data //   
    const {watch} = data

    // =================================================
    // controll rending content box height // 
    useEffect(()=>{
        if(!sellect_state){
            const height = sellect_active_ref.current.scrollHeight
            hanlde_ref.current.style.height = height + check_out_method.length * 40 + 'px'
            gsap.to(hanlde_ref.current,{
                x:0,
                duration : 0.5
            })
        }else{
            const height = sellect_ref.current.scrollHeight
            hanlde_ref.current.style.height = height + 'px'
            const width = hanlde_ref.current.scrollWidth
            gsap.to(hanlde_ref.current,{
                x:- width / 2,
                duration : 0.5
            })
        }
    },[sellect_state, check_out_method])

    // =================================================
    // click sellect box //
    function click_sellect_box(data){
        setSellect_state(false)
        setCheck_out_method([...check_out_method, data])
    }

    // =================================================
    // delete sellect box //
    function delete_sellect_box(data){
        const filterd_data = check_out_method.filter((el)=>{
                                return !_.isMatch(el, {name : data.name, url : data.url})
                             })
        setCheck_out_method([...filterd_data])        
    }

    // =================================================
    // click modify text
    function click_modify_text(handle_element, rotate_element){
        handle_element.focus()
        handle_element.style.pointerEvents = 'auto'
        rotate_element.style.transform = 'rotateY(180deg)'
    }

    // =================================================
    // save text
    function save_text(handle_element, rotate_element, index){
        const sellect_data = check_out_method[index]
        const excluded_data = check_out_method.filter((el)=>{
                                return !_.isEqual(el, check_out_method[index])
                              })
        const update_data = {
            ...sellect_data,
            text : watch(`text[${index}]`)
        }
        setCheck_out_method([...excluded_data, update_data])
        handle_element.style.pointerEvents = 'none'
        rotate_element.style.transform = 'rotateY(0)'

    }

    // =================================================
    // move box right //
    function move_box_right(){
        setSellect_state(true)
    }

    // =================================================
    // move box left //
    function move_box_left(){
        setSellect_state(false)
    }


    return {click_sellect_box, delete_sellect_box, click_modify_text, save_text, move_box_right, move_box_left}
}

export default useHostUpdateStyleView5Style