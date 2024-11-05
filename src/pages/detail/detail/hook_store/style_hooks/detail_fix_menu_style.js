import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"

function useDetailFixMenuStyle(data, states, refs, props){

    // =================================================
    // scroll to photo
    function scroll_to_photo(){
        gsap.to(window, {
            duration : 0.6,
            scrollTo : {
                y : 0
            }
        })
    }

    // =================================================
    // scroll to location
    function scroll_to_location(){
        gsap.to(window, {
            duration : 0.6,
            scrollTo : {
                y : '.detail-detail-layout__section2',
                offsetY : 120
            }
        })
    }
    
    // =================================================
    // scroll to reply
    function scroll_to_reply(){
        gsap.to(window, {
            duration : 0.6,
            scrollTo : {
                y : '.detail-detail-layout__section4',
                offsetY : 120
            }
        })
    }

    // =================================================
    // scroll to summary
    function scroll_to_summary(){
        gsap.to(window, {
            duration : 0.6,
            scrollTo : {
                y : '.detail-section1__section3',
                offsetY : 120
            }
        })
    }

    // =================================================
    // scroll to reservation
    function scroll_to_reservation(){
        gsap.to(window, {
            duration : 0.6,
            scrollTo : {
                y : '.detail-header__section1',
                offsetY : 90
            }
        })
    }

    return {
        scroll_to_photo,
        scroll_to_location,
        scroll_to_reply,
        scroll_to_summary,
        scroll_to_reservation
    }
}

export default useDetailFixMenuStyle