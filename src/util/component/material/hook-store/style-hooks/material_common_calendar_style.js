import gsap from "gsap"
import { startOfDay, isBefore, isWithinInterval, isAfter, differenceInDays} from "date-fns";

function useMaterialCommonCalendarStyle(cons, states, refs, props){

    // =================================================
    // states //
    const {
        is_left_button,
        setIs_left_button,
        is_right_button,
        setIs_right_button
        } = states

    // =================================================
    // refs //
    const {
        header_slider_ref,
        main_slider_ref,
        left_button_ref,
        right_button_ref,
        calendar_container_ref
        } = refs

    // =================================================
    // props //
    const {
        set_checkout_handler,
        set_checkin_handler,
        checkin_date,
        checkout_date
        } = props

    // =================================================
    // 이전달 버튼 클릭 //
    function click_prev_month(){  
        const container_width = calendar_container_ref.current.getBoundingClientRect().width
        const container_scroll_width = calendar_container_ref.current.scrollWidth - container_width

        if(container_scroll_width === container_width * 5){
            setIs_left_button(false)
            return
        }

        left_button_ref.current.disabled = true
        right_button_ref.current.disabled = true

        if(!is_right_button){
            setIs_right_button(true)
        }
        gsap.to(header_slider_ref.current,{
            x : `+=${container_width}`,
            duration : 0.3
        })
        gsap.to(main_slider_ref.current,{
            x : `+=${container_width}`,
            duration : 0.3,
            onComplete : ()=>{
                left_button_ref.current.disabled = false
                right_button_ref.current.disabled = false
            }
        })
    }

    // =================================================
    // 다음달 버튼 클릭 //
    function click_next_month(){
        const container_width = calendar_container_ref.current.getBoundingClientRect().width
        const container_scroll_width = calendar_container_ref.current.scrollWidth - container_width

        if(Math.abs(container_scroll_width) < 5){
            setIs_right_button(false)
            return
        }

        left_button_ref.current.disabled = true
        right_button_ref.current.disabled = true

        if(!is_left_button){
            setIs_left_button(true)
        }
        gsap.to(header_slider_ref.current,{
            x : `-=${container_width}`,
            duration : 0.3
        })
        gsap.to(main_slider_ref.current,{
            x : `-=${container_width}`,
            duration : 0.3,
            onComplete : ()=>{
                left_button_ref.current.disabled = false
                right_button_ref.current.disabled = false
            }
        })
    }

    // =================================================
    // 날짜 클릭 //
    function click_date(e){
        if(!e.target.dataset.date){
            return
        }

        const click_date = new Date(e.target.dataset.date)
        if(!checkin_date){
            set_checkin_handler(click_date)
        }
        else if(checkin_date && !checkout_date && isAfter(startOfDay(click_date), checkin_date)){
            set_checkout_handler(click_date)
        }
        else if(checkin_date && isBefore(startOfDay(click_date), checkin_date) && !checkout_date){
            set_checkin_handler(click_date)
        }
        else if(checkin_date && checkout_date){
            set_checkin_handler(click_date)
            set_checkout_handler(null)
        }
    }

    // =================================================
    // 날짜 range style 설정 //
    function date_range_style(target, start_date, end_date){
        return isWithinInterval(target,{
            start : start_date,
            end : end_date
        })
    }

    return {click_prev_month,
            click_next_month,
            click_date,                
            date_range_style}
}
export default useMaterialCommonCalendarStyle