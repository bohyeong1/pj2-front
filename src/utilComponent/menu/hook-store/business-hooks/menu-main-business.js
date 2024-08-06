import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import default_data from "../../../../utilData/defaultData"

function useMenuMainBusiness(data, states, refs, props){
    const navigate = useNavigate()
    const location = useLocation()

    ///로그데이터
    const logData = sessionStorage.getItem('userData') || localStorage.getItem('userData')
    const logDataParse = JSON.parse(logData) || null

    /////////////////로그인 상태 유지
    useEffect(()=>{
        if(logData){
            states.setLogState(true)
            states.setUserName(logDataParse.name)
        }
            states.setHostLocation(location.pathname.includes('/Acc_regist'))
            const Index = default_data.host_menus.findIndex((obj)=>{return obj.url === location.pathname})
        
        if(Index !== -1){
            states.setHostIndex(Index)
        }  
        },[states.logState, states.userName, states.hostlocation])
  

    function clickLogbtn(url,id){
        if(states.logState && id === 0){
            states.setLogModalState(!states.logModalState)
        }else{
            navigate(url)
        }
    }

    function link_to_url(url){
        navigate(url)
    }

    return {clickLogbtn, link_to_url}
}

export default useMenuMainBusiness