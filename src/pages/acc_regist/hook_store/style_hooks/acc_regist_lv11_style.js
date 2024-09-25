import { pop_three_texts } from "../../../../utilData/UtilFunction"

function useAccRegistLv11Style(data, states, refs, props){

    // =================================================
    // input control //
    function input_control(e){
        if(e.target.value.length > 3){
            const processed_input = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
            e.target.value = pop_three_texts(processed_input)
        }else{
            e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
        }
    }

    return {input_control}
}

export default useAccRegistLv11Style