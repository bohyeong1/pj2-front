import { useEffect } from "react"

function useMaterialUserProfileImgStyle(data, states, refs, props){

    // =================================================
    // states //
    const {
        load, 
        setLoad
    } = states

    // =================================================
    // props //
    const {user_data} = props

    // =================================================
    // control state //
    useEffect(() => {
        if(user_data){
            if(!user_data.profileImg){
                setLoad(true)
            }
        }

    }, [user_data])

    return {}
}

export default useMaterialUserProfileImgStyle