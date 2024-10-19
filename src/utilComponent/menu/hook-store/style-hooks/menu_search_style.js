import { open_search_modal, close_search_modal } from "@/redux/modules/searchModalSlice"
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

    }
    
    // =================================================
    // click minus // 
    function click_minus(){

    }

    // =================================================
    // click location //
    function click_location(){

    } 

    // =================================================
    // open modal //
    function open_modal(){

    }

    return {click_preview, click_plus, click_minus, click_location, open_modal}
}

export default useMenuSearchStyle