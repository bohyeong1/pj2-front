import { useEffect } from "react"

function useMembershipAgreeStyle(data, states, refs, props){

    // =================================================
    // state //
    const {setAll_check, checkbox_state, setCheckbox_state} = states

    useEffect(()=>{
        for(const key in checkbox_state){
            if(checkbox_state[key] === true){
                continue
            }else{
                setAll_check(false)
                return}            
        }
        setAll_check(true)
    },[checkbox_state])

    // =================================================
    // 전체동의 //
    function all_check_box(e){
        const check = e.target.checked
        // console.log(check)
        const copied_state = {...checkbox_state}
        for(const key in checkbox_state){
            copied_state[key] = check
        }
        // console.log(copied_state)
        setCheckbox_state(copied_state)
    }

    // =================================================
    // 선택동의 //
    function sellect_check_box(e){
        const name = e.target.name
        const copied_state = {...checkbox_state}
        copied_state[name] = !checkbox_state[name]
        setCheckbox_state(copied_state)
    }

    return {all_check_box, sellect_check_box}
}

export default useMembershipAgreeStyle