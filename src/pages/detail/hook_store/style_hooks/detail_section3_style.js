
function useDetailSection3Style(data, states, refs, props){

    // =================================================
    // 배열요소의 name 탐색하여 적잡한 배열 찾기 //  
    function get_collect_value(data, name){
        if(!Array.isArray(data)){
            return 
        }
        const filtered_date = data.filter((el)=>{
            return el.grade === name
        })

        if(filtered_date.length){
            return filtered_date[0].count
        }
        else{
            return 0
        }
    }

    return {get_collect_value}
}
export default useDetailSection3Style