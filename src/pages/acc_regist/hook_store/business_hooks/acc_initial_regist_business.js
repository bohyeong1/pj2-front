import { useLocation, useNavigate } from "react-router-dom"


function useAccInitialRegistBusiness(data, states, refs, props){

    // =================================================
    // location //
    const location = useLocation()

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // Acc_initial로 부터 온 경우만 페이지 허용하기 //
    // if(location.state?.from !== '/Acc_initial' && location.state?.from !== '/Acc_initial_regist'){
    //     navigate('/Acc_regist')
    // }

    

    return {}
}

export default useAccInitialRegistBusiness