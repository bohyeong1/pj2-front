import HostUpdateLayout from "@/layout/host_update_layout/host_update_layout"
import { AccDataContext } from "@/context/acc_data_context/config/acc_data_context"
import { useContext } from "react"

function AccUpdate({option = null}){    

    // =================================================
    // context states //
    const {acc_data, setAcc_data} = useContext(AccDataContext)

    return (
        <HostUpdateLayout option={option} acc_data={acc_data}>            
        </HostUpdateLayout>
    )
}

export default AccUpdate