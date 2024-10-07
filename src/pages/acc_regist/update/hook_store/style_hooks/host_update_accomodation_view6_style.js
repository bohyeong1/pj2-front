import { pop_three_texts } from '@/util/function/util_function'
function useHostUpdateAccomodationView6Style(data, states, refs, props){

    // =================================================
    // input control //
    function input_control(e){
        const value = e.target.value
        const filtered_value = value.split(',').join('')
        const processed_input = filtered_value.replace(/[^0-9]/g, '').slice(0, 6)
        if(filtered_value.length > 0){
            e.target.value = pop_three_texts(processed_input)
        }
    }

    return {input_control}
}

export default useHostUpdateAccomodationView6Style