import { useEffect } from "react"

function useModalOverayStyle(data, states, refs, props){

    // redux state
    const {overay_state} = data


    // overlay 생성 시 스크롤바 x
    useEffect(()=>{
        if(overay_state){
            document.documentElement.style.overflow = 'hidden'
        }else{
            document.documentElement.style.overflow = ''
        }
    },[overay_state])

    return {}
}

export default useModalOverayStyle