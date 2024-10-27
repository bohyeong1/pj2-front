import { HostAccContext } from "../config/host_acc_context"
import { useState } from "react"

function HostAccProvider({children}){
    // =================================================
    // states //   
    // acc data
    const [host_acc, setHost_acc] = useState(null)

    return (
        <HostAccContext.Provider  
        value = {{ 
            host_acc, 
            setHost_acc}}>
            {children}
        </HostAccContext.Provider>
    )
}

export default HostAccProvider