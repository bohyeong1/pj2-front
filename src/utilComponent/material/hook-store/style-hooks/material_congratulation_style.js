import { useEffect } from "react"
import default_data from "../../../../utilData/defaultData"

function useMaterialCongratulationStyle(data, states, refs, props){
    // =================================================
    // ref //   
    const {items} = refs


    useEffect(()=>{
        items.current.forEach((el, index)=>{
            el.style.setProperty('--i', default_data.random_index[index]/80)
            el.style.setProperty('--j', index)
            el.style.setProperty('--k', Math.random()*0.1 + 0.9)
            el.style.backgroundColor = default_data.random_profile_color[index % 24]
        })
    },[])

    return {}
}

export default useMaterialCongratulationStyle