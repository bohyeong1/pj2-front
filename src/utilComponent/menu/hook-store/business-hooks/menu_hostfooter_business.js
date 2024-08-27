import { useEffect } from "react"

function useMenuHostfooterBusiness(data, states, refs, props){
    // =================================================
    // data //
    const {regist_step, this_step} = data

    // =================================================
    // states //
    const {prev_url, setPrev_url, next_url, setNext_url} = states
    
    // =================================================
    // prev page url return //
    function create_prev_url(index){
        if(index === 0){
            return false
        }else{
            return regist_step[index-1]
        }
    }

    // =================================================
    // next page url return //
    function create_next_url(index){
        if(index === regist_step.length-1){
            return false
        }else{
            return regist_step[index+1]
        }
    }

    // =================================================
    // button url 설정 //
    useEffect(()=>{
        const prev_url = create_prev_url(this_step)
        const next_url = create_next_url(this_step)

        setPrev_url(prev_url)
        setNext_url(next_url)
    },[])
    
    return {}
}

export default useMenuHostfooterBusiness