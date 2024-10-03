import { AccDataContext } from "../config/acc_data_context"
import { useState } from "react"

function AccDataProvider({children}){
    // =================================================
    // states //    
    // step
    const [this_step, setThis_step] = useState(null)
    // acc data
    const [acc_data, setAcc_data] = useState(null)

    return (
        <AccDataContext.Provider  value = {{this_step, setThis_step, 
                                            acc_data, setAcc_data}}>
            {children}
        </AccDataContext.Provider>
    )
}

export default AccDataProvider