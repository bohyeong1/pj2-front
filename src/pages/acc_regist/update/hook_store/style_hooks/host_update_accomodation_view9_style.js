import { useEffect } from "react"
function useHostUpdateAccomodationView9Style(data, states, refs, props){

    // =================================================
    // states //
    const {sellect_button, 
           setSellect_button} = states

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
    useEffect(()=>{
        const lb_button = document.querySelector('.host-update-accomodation-view9__content-section0-part2-lb')
        lb_button.disabled = true
    },[])

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
        if(sellect_button[sellect] === null || sellect_button[sellect] === false){
            setSellect_button({
                ...sellect_button,
                [sellect] : true
            })
        }
        else{
            setSellect_button({
                ...sellect_button,
                [sellect] : null
            })
        }
    }

    // =================================================
    // not allow button //
    function click_not_allow(sellect){
        if(sellect_button[sellect] === null || sellect_button[sellect] === true){
            setSellect_button({
                ...sellect_button,
                [sellect] : false
            })
        }
        else{
            setSellect_button({
                ...sellect_button,
                [sellect] : null
            })
        }
    }

    // =================================================
    // plus button //
    function plus_click(e){
        e.stopPropagation()
        console.log(watch('count'))
        setValue('count', parseInt(watch('count')) + 1)

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
        setValue('count', parseInt(watch('count')) - 1)

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

    return {check_active, click_allow, click_not_allow, plus_click, minus_click}
}

export default useHostUpdateAccomodationView9Style