import { useEffect } from "react"

function useDetailSection4Style(data, states, refs, props){

    // =================================================
    // states //  
    const {page_data,
           setPage_data,
           current_page,
           setCurrent_page,
           page_count,
           setPage_count,
           reply_modal_state,
           setReply_modal_state,
           sellect_data,
           setSellect_data} = states

    // =================================================
    // props //  
    const {evaluations} = props

    // =================================================
    // 페이지네이션 초기 state 설정 //  
    useEffect(()=>{
        if(evaluations.reply){
            setPage_data(evaluations.reply.slice(0,6))  
            setCurrent_page(1)                
            setPage_count(Math.ceil(evaluations.reply.length / 6)) 
        }
    },[evaluations])

    // =================================================
    // 페이지네이션 화면에 출력되는 데이터 가공 //  
    function sellect_page_data(e){      
        const start_index = (e - 1) * 6
        const finish_index = start_index + 6 
        setCurrent_page(e)
        setPage_data(evaluations.slice(start_index, finish_index))        
    }

    // =================================================
    // 모달 state 제어 //  
    function reply_modal_stateState(){
        setReply_modal_state(!reply_modal_state)
    }

    // =================================================
    // 모달 열기 //  
    function click_reply(data){
        setSellect_data(data)
        reply_modal_stateState()
    }

    // =================================================
    // 배열요소의 name 탐색하여 적잡한 배열 찾기 //  
    function get_collect_value(data, name){
        if(!Array.isArray(data)){
            return 
        }
        const filtered_date = data.filter((el)=>{
            return el.name === name
        })

        if(filtered_date.length){
            return filtered_date[0].grade
        }
        else{
            return 0
        }
    }

    return {sellect_page_data, reply_modal_stateState, click_reply, get_collect_value}
}
export default useDetailSection4Style