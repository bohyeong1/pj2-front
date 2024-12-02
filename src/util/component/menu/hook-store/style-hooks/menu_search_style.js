import { 
    open_search_modal, 
    close_search_modal, 
    set_checkin_data, 
    set_checkout_data, 
    set_capacity_data 
} from "@/redux/modules/searchModalSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { transform_date } from '@/util/function/util_function';
import { addDays } from "date-fns";

function useMenuSearchStyle(data, states, refs, props){

    // =================================================
    // dispatch // 
    const dispatch = useDispatch()

    // =================================================
    // redux state // 
    const {
        search_modal_state,
        search_data_name,
        location_data,
        checkin_data,
        checkout_data,
        capacity_data
    } = data

    // =================================================
    // state // 
    const {
        modal_state,
        setModal_state
    } = states

    // =================================================
    // refs // 
    const {
        date_input_ref,
        capacity_input_ref
    } = refs

    // =================================================
    // props // 
    const {
        related_preview,
        preview_form
    } = props

    // =================================================
    // date input 동기화 // 
    useEffect(()=>{
        if(!preview_form && checkin_data && !checkout_data){
            date_input_ref.current.value = transform_date(new Date(checkin_data))
        }
        if(!preview_form && checkin_data && checkout_data){
            date_input_ref.current.value = `${transform_date(new Date(checkin_data))} - ${transform_date(new Date(checkout_data))}`
        }
    },[checkin_data, checkout_data, preview_form])

    // =================================================
    // click preview box // 
    function click_preview(data_name){
        if(search_modal_state && data_name === search_data_name){
            dispatch(close_search_modal())
        }
        else{
            dispatch(open_search_modal({search_data_name : data_name}))
        }        
    }

    // =================================================
    // 검새어 모달창 제어 //
    useEffect(()=>{
        if(related_preview){
            if(search_modal_state && search_data_name){
                if(search_data_name === 'location'){
                    setModal_state(search_data_name)
                }
                if(search_data_name === 'check-in-out'){
                    setModal_state(search_data_name)
                }
                if(search_data_name === 'capacity'){
                    setModal_state(search_data_name)
                }
            }
            else{
                setModal_state(null)
            }
        }
    },[search_modal_state, search_data_name]) 

    // =================================================
    // click plus //
    function click_plus(){
        dispatch(set_capacity_data({capacity_data : capacity_data + 1}))
    }
    
    // =================================================
    // click minus // 
    function click_minus(){
        dispatch(set_capacity_data({capacity_data : capacity_data - 1}))
    }

    // =================================================
    // click check in //
    function click_check_in(date){
        dispatch(set_checkin_data({checkin_data : date ? date.toISOString() : null}))
    }

    // =================================================
    // click check out //
    function click_check_out(date){
        dispatch(set_checkout_data({checkout_data : date ? date.toISOString() : null}))
    }

    // =================================================
    // close modal //
    function close_modal(){
        setModal_state(null)
    }

    // =================================================
    // open modal //
    function open_modal(keyword){

        if(modal_state === keyword){
            setModal_state(null)
        }else{
            setModal_state(keyword)
        }
    }

    useEffect(()=>{
        if(!checkout_data){
            const checkin = new Date(checkin_data)
            dispatch(set_checkout_data({checkout_data : addDays(checkin, 1).toISOString()}))
        }
    },[modal_state])

    return {
        click_preview, 
        click_plus, 
        click_minus, 
        open_modal, 
        click_check_in, 
        click_check_out, 
        close_modal
    }
}

export default useMenuSearchStyle