import { CommonAccContext } from "../config/common_acc_context"
import { useState } from "react"

function CommonAccProvider({children}){
    // =================================================
    // states //   
    // acc data
    const [common_acc, setCommon_acc] = useState(null)

    return (
        <CommonAccContext.Provider  
        value = {{ 
            common_acc, 
            setCommon_acc}}>
            {children}
        </CommonAccContext.Provider>
    )
}

export default CommonAccProvider