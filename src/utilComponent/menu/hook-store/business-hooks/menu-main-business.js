import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import default_data from "../../../../utilData/defaultData"

function useMenuMainBusiness(data, states, refs, props){
    const navigate = useNavigate()
    const location = useLocation()

    // =================================================
    // props //
    const {login_user} = props

    // =================================================
    // states //
    const {host_location, setHost_location, log_state, setLog_state, log_modal_state, setLog_modal_state, host_index, setHost_index} = states

    // =================================================
    // login 상태 //
    useEffect(()=>{
        if(login_user){
            setLog_state(true)
        }
        setHost_location(location.pathname.includes('/Acc_regist'))
        const Index = default_data.host_menus.findIndex((obj)=>{return obj.url === location.pathname})
        
        if(Index !== -1){
            setHost_index(Index)
        }  
        },[log_state, host_location])
  
    // =================================================
    // click menu //
    function click_btn(url,id){
        if(log_state && id === 0){
            setLog_modal_state(!log_modal_state)
        }else{
            navigate(url)
        }
    }

    function link_to_url(url){
        navigate(url)
    }

    return {click_btn, link_to_url}
}

export default useMenuMainBusiness