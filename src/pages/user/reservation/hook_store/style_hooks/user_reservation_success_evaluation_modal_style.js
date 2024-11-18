
function useUserReservationSuccessEvaluationModalStyle(cons, states, refs, props){
    
    const {
        hover,
        setHover,
        rating,
        setRating
    } = states

    // =================================================
    // click star //
    function click_star(target,key){
        setRating({
            ...rating,
            [key] : target
        })
    }

    // =================================================
    // hover star //
    function hover_star(target, key){
        if(rating[key] < target){
            setHover({
                ...hover,
                [key] : target
            })
        }
    }

    // =================================================
    // out star //
    function out_star(key){
        setHover({
            ...hover,
            [key] : 0
        })
    }

    // =================================================
    // output rating text //
    function output_rating_text(key){
        switch(rating[key]){
            case 1 :
                return <span className="reservation-success__evaluation-modal-check-grade-item-result-text1">1점 <span>(별로에요)</span></span>
            case 2 :
                return <span className="reservation-success__evaluation-modal-check-grade-item-result-text1">2점 <span>(그저그래요)</span></span>      
            case 3 :
                return <span className="reservation-success__evaluation-modal-check-grade-item-result-text1">3점 <span>(괜찮아요)</span></span>
            case 4 :
                return <span className="reservation-success__evaluation-modal-check-grade-item-result-text1">4점 <span>(좋아요)</span></span>
            case 5 :
                return <span className="reservation-success__evaluation-modal-check-grade-item-result-text1">5점 <span>(최고에요)</span></span>
            default :
                return ''
        }
    }

    return {
        click_star,
        hover_star,
        out_star,
        output_rating_text
    }
}

export default useUserReservationSuccessEvaluationModalStyle