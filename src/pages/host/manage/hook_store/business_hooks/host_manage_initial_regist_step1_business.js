import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";

function useHostManageInitialRegistStep1Business(data, states, refs, props){
    
    // =================================================
    // states //    
    const {
        loading, 
        setLoading, 
        user_state, 
        setUser_state
    } = states

    // =================================================
    // navigate //    
    const navigate = useNavigate()

    // =================================================
    // querystring // 
    const [searchParams, setSearchParams] = useSearchParams()

    // =================================================
    // 로그인 상태 추적 //  
    useEffect(()=>{
        const user_id = searchParams.get('name')
        const host_state = searchParams.get('host')
        if(user_id && host_state){
            if(user_id !== 'undefined' && host_state !== 'undefined'){
                if(host_state === 'true'){
                    navigate('/Acc_regist')
                }
                setUser_state({
                    userId : user_id
                })
            }
        }else{
            navigate('/login')
        }
        setLoading(true)
    },[])  

    // =================================================
    // 호스트 등록 버튼 //  
    async function host_regist_click(){
        setLoading(false)
        try{
            const user_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/hostinitial`,'POST',{
                userId : user_state
            })
            if(user_data.host_state && user_data.log_state){
                setLoading(true)
                navigate('/Acc_initial_regist')
            }
            else{
                console.log('에러 점검', user_data)
            }
        }catch(e){
            console.log(e)
        }

    }

    return {host_regist_click}
}

export default useHostManageInitialRegistStep1Business