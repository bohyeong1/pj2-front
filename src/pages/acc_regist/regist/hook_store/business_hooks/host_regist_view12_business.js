import { useNavigate } from "react-router-dom"

function useHostRegistView12Business(data, states, refs, props){
    // =================================================
    // data fetch // 
    const navigator = useNavigate()

    // =================================================
    // link button //
    function link_button1(){
        navigator('/Acc_regist/AccManage')
    }

    function link_button2(){
        navigator('/')
    }
    return {link_button1, link_button2}
}

export default useHostRegistView12Business