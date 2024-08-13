import { useEffect } from "react"

function useModalOverayStyle(data, states, refs, props){

    // redux state
    const {overay_state} = data


    // overlay 생성 시 스크롤바 x
    useEffect(()=>{
        if(overay_state){
            document.body.style.overflow = 'hidden'
        }else{
            document.body.style.overflow = 'auto'
        }
    },[overay_state])

    return {}
}

export default useModalOverayStyle