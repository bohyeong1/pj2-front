import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import _ from "lodash"
import { useNavigate } from "react-router-dom"

function useHostManageCalendarStyle(data, states, refs, props){

    // =================================================
    // states //
    const {
        modal_state,
        setModal_state,
        possible_date_state,
        setPossible_date_state,
        impossible_reservation_state,
        setImpossible_reservation_state,
        before_date_state,
        setBefore_date_state,
        reservation_deadline_state,
        setReservation_deadline_state,
        error_state,
        setError_state
    } = states

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // click box //
    function click_box(target_modal, scroll = false){
        if(!modal_state || modal_state !== target_modal){
            if(scroll){
                gsap.to('.host-manage-calendar__input-wrapper',
                    {
                        duration : 0.3,
                        scrollTo : 'max'
                    }
                )
            }
            setModal_state(target_modal)
        }
        else{
            setModal_state(null)
        }
    }

    // =================================================
    // impossible date select click //
    function imppssible_date_select_click(data){ 
        setPossible_date_state({
            ...data
        })
    }
    
    // =================================================
    // reservation deadline date select click //
    function reservation_deadline_select_click(data){
        setReservation_deadline_state({
            ...data
        })
    }

    // =================================================
    // impossible reservation select click //
    function impossible_reservation_select_click(data){
        const copied_array = [...impossible_reservation_state]
        let result_array

        if(_.some(copied_array, (el)=>{return _.isMatch(el, data)})){
            result_array = copied_array.filter((el)=>{
                return !_.isMatch(el, data)
            })
            if(error_state){
                setError_state(false)
            }
        }
        else{
            if(copied_array.length >= 4){
                if(!error_state){
                    setError_state(true)
                    return
                }
                return
            }

            result_array = [...copied_array, data]         
        }
        setImpossible_reservation_state([...result_array])
    }
    
    // =================================================
    // before data date select click //
    function before_date_select_click(data){
        setBefore_date_state({
            ...data
        })
    }

    function click_mypage_link(){
        navigate('/host/mypage/information')
    }

    return {
        click_box,
        imppssible_date_select_click,
        reservation_deadline_select_click,
        before_date_select_click,
        impossible_reservation_select_click,
        click_mypage_link
    }
}

export default useHostManageCalendarStyle