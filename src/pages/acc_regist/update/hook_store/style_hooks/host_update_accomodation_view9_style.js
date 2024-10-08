import { useEffect } from "react"
function useHostUpdateAccomodationView9Style(data, states, refs, props){

    // =================================================
    // states //
    const {sellect_state, setSellect_state} = states

    // =================================================
    // refs //
    const {gurabox_ref,
           row_alram_ref,
           rule_alert_ref} = refs

    // =================================================
    // data //
    const {watch, setValue} = data

    // =================================================
    // minus button 초기 상태 //
    // useEffect(()=>{
    //     const lb_button = document.querySelector('.Acc-regist-lv10__content-section2-box1-part2-lb')
    //     lb_button.disabled = true
    // },[])

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

        if(watch('count') === 5){
            if(e.currentTarget.classList.contains('small-button')){
                e.currentTarget.classList.remove('small-button')
                e.currentTarget.classList.add('small-button-disabled')
            }
            e.currentTarget.disabled = true
        }else{
            const lb_button = document.querySelector(`.host-update-accomodation-view9__content-section0-part2-lb`)
            if(lb_button.classList.contains('small-button-disabled')){                
                lb_button.classList.remove('small-button-disabled')
                lb_button.classList.add('small-button')
            }                   
            lb_button.disabled = false
        }
    }

    // =================================================
    // minus button //
    function minus_click(e){
        e.stopPropagation()
        setValue('count', watch('count') - 1)

        if(watch('count') === 0){
            if(e.currentTarget.classList.contains('small-button')){
                e.currentTarget.classList.remove('small-button')
                e.currentTarget.classList.add('small-button-disabled')
            }
            e.currentTarget.disabled = true
        }else{
            const rb_button = document.querySelector(`.host-update-accomodation-view9__content-section0-part2-rb`)
            if(rb_button.classList.contains('small-button-disabled')){
                rb_button.classList.remove('small-button-disabled')
                rb_button.classList.add('small-button')
            }
            rb_button.disabled = false
        }
    }

    // =================================================
    // textarea onchange //
    function text_change(text){
        gurabox_ref.current.textContent = text
        const one_line_height = 20.52
        const line_calculate = gurabox_ref.current.getBoundingClientRect().height / one_line_height
        let row = Math.round(line_calculate)

        row_alram_ref.current.textContent = `${row}/20`
        if(row > 20){
            rule_alert_ref.current.style.display = 'block'
        }else{
            rule_alert_ref.current.style.display = 'none'
        }
    }

    return {check_active, click_allow, click_not_allow, plus_click, minus_click, text_change}
}

export default useHostUpdateAccomodationView9Style