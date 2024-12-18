
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { connect_data_width_cookies } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";

function useHostManageListBusiness(data, states, refs, props){
    // =================================================
    // data //
    const {user_data} = data

    // =================================================
    // states //
    const {
        acc_data, 
        setAcc_data
    } = states

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // api fetch //
    async function fetch_acc(){
        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/get/secret-all`, 'POST',{
            _id : user_data._id
        })

        if(acc_data && acc_data.server_state === true){
            setAcc_data(acc_data.accomodation)
        }else{
            // 리다이렉션해서 error페이지 보낼까?
            console.log('api 요청 중 오류가 발생하였습니다.')
        }
    }

    useEffect(()=>{
        fetch_acc()
    },[])

    // =================================================
    // click add button //
    function click_add_button(){
        navigate('/host/regist/step0')
    }

    // =================================================
    // click accomodation button //
    function click_accomodaton_button(_id, data){
        if(!data){
            // error page redirection
        }

        if(data.acc_step >= 0 && data.acc_step < 11){
            const step = data.acc_step
            console.log(step)
            navigate(`/host/regist/${_id}/step${step + 1}`)
        }
        else if(data.acc_step === 11){
            navigate(`/host/update/${_id}/accomodation/title`)
        }
    }

    return {
        click_add_button, 
        click_accomodaton_button
    }
}

export default useHostManageListBusiness