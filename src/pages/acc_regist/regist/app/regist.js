import HostRegistLayout from "@/layout/host/host_regist_layout/host_regist_layout"
import { useEffect, useContext } from "react"
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context"

function AccRegist(){ 

    const {host_acc, setHost_acc} = useContext(HostAccContext)
    
    useEffect(()=>{
        return () => {
            if(host_acc){
                setHost_acc(null)
            }
        }
    },[])

    return (
        <HostRegistLayout/>            
    )
}

export default AccRegist