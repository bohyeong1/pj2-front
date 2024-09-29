import { useNavigate } from "react-router-dom"

function useAccUpdateBusiness(data, states, refs, props){

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // click preview page //
    function click_prev_page_button(){
        navigate('/Acc_regist/AccManage')
    }   
    return {click_prev_page_button}
}

export default useAccUpdateBusiness