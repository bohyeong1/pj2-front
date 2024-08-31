import default_data from "../../../../utilData/defaultData";

function useAccRegistLv3Style(data, states, refs, props){
    // =================================================
    // states //
    const {current_data, setCurrent_data, button_state, setButton_state} = states

    // =================================================
    // refs //
    const {categories, lv3_value} = refs

    // =================================================
    // style 및 state 변경 //
    function click_box(id){
        // button 클릭 제어
        if(!button_state && Number(lv3_value.current[id].value) > 0){
            setButton_state(true)
        }        
        if(button_state && lv3_value.current.every((el)=>{return el.value === '0'})){
            setButton_state(false)
        }

        // style
        for(let i=0; i<default_data.d_base_facility.length; i++){
            if(lv3_value.current[id].value != 0){
                if(!categories.current[id].classList.contains('acc-regist-sellect-box-active')) {
                    categories.current[id].classList.add('acc-regist-sellect-box-active');
                }
            }
            else{
                categories.current[id].classList.remove('acc-regist-sellect-box-active')
            }
        }
        const new_current_data = current_data.map((el, index) => {
            return index === id ? {...el, counts : Number(lv3_value.current[id].value)} : el
        }) 
        setCurrent_data(new_current_data)
    }

    // =================================================
    // plus button //
    function plus_click(e, id){
        e.stopPropagation()
        // button 클릭 제어
        if(!button_state && categories.current[id].value > 0){
            setButton_state(true)
        }        
        if(button_state && categories.current.every((el)=>{return el.value === 0})){
            setButton_state(false)
        }
        lv3_value.current[id].value = Number(lv3_value.current[id].value) + 1
        if(lv3_value.current[id].value === '15'){
            if(e.currentTarget.classList.contains('small-button')){
                e.currentTarget.classList.remove('small-button')
                e.currentTarget.classList.add('small-button-disabled')
            }
        }else{
            const lb_btn = document.querySelector(`.Acc-regist-lv3__content-section1-box-part2-lb${id}`)
            if(lb_btn.classList.contains('small-button-disabled')){                
                lb_btn.classList.remove('small-button-disabled')
                lb_btn.classList.add('small-button')
            }
        }
        click_box(id)    ///////인풋값 스테이트에 저장하기
    }

    // =================================================
    // minus button //
    function minus_click(e, id){
        e.stopPropagation()
        lv3_value.current[id].value = Number(lv3_value.current[id].value) - 1
        if(lv3_value.current[id].value === '0'){
            if(e.currentTarget.classList.contains('small-button')){
                e.currentTarget.classList.remove('small-button')
                e.currentTarget.classList.add('small-button-disabled')
            }
        }else{
            const rb_btn = document.querySelector(`.Acc-regist-lv3__content-section1-box-part2-rb${id}`)
            if(rb_btn.classList.contains('small-button-disabled')){
                rb_btn.classList.remove('small-button-disabled')
                rb_btn.classList.add('small-button')
            }
        }
        click_box(id)    ///////인풋값 스테이트에 저장하기
    }

    return {minus_click, plus_click}
}
export default useAccRegistLv3Style