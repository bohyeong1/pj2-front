import { 
    open_search_modal, 
    close_search_modal, 
    set_checkin_data, 
    set_checkout_data, 
    set_capacity_data 
} from "@/redux/modules/searchModalSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

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
    // props // 
    const {related_preview} = props

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