import { useEffect } from "react"


function useHostRegistView10Style(data, states, refs, props){

    // =================================================
    // states //
    const {
        sellect_state, 
        setSellect_state
    } = states

    // =================================================
    // refs //
    const {
        regist_lv10_gurabox, 
        regist_lv10_row_alram, 
        regist_lv10_alert
    } = refs

    // =================================================
    // data //
    const {watch, setValue} = data

    // =================================================
    // active 효과 //
    function check_active(state){
        if(state){
            return 'active'
        }
        else if(state === false){
            return 'no-active'
        }
        else if(state === null){
            return null
        }
    }

    // =================================================
    // allow button //
    function click_allow(sellect){
        if(sellect_state[sellect] === null || sellect_state[sellect] === false){
            setSellect_state({
                ...sellect_state,
                [sellect] : true
            })
        }
        else{
            setSellect_state({
                ...sellect_state,
                [sellect] : null
            })
        }
    }

    // =================================================
    // not allow button //
    function click_not_allow(sellect){
        if(sellect_state[sellect] === null || sellect_state[sellect] === true){
            setSellect_state({
                ...sellect_state,
                [sellect] : false
            })
        }
        else{
            setSellect_state({
                ...sellect_state,
                [sellect] : null
            })
        }
    }

    // =================================================
    // plus button //
    function plus_click(e){
        e.stopPropagation()
        setValue('count', watch('count') + 1)
    }

    // =================================================
    // minus button //
    function minus_click(e){
        e.stopPropagation()
        setValue('count', watch('count') - 1)
    }

    // =================================================
    // textarea onchange //
    function text_change(text){
        regist_lv10_gurabox.current.textContent = text
        const one_line_height = 20.52
        const line_calculate = regist_lv10_gurabox.current.getBoundingClientRect().height / one_line_height
        let row = Math.round(line_calculate)

        regist_lv10_row_alram.current.textContent = `${row}/20`
        if(row > 20){
            regist_lv10_alert.current.style.display = 'block'
        }else{
            regist_lv10_alert.current.style.display = 'none'
        }
    }

    return {
        check_active, 
        click_allow, 
        click_not_allow, 
        plus_click, 
        minus_click, 
        text_change
    }
}

export default useHostRegistView10Style
