import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { connect_data_width_cookies } from "../../../../utilData/UtilFunction"
import default_data from "../../../../utilData/defaultData"

function useAccManageBusiness(data, states, refs, props){
    // =================================================
    // props //
    const {login_user} = props

    // =================================================
    // states //
    const {acc_data, setAcc_data} = states

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // api fetch //
    async function fetch_acc(){
        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/get/secret-all`, 'POST',{
            _id : login_user._id
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
        navigate('/Acc_regist/Acc_regist_lv0')
    }

    // =================================================
    // click accomodation button //
    function click_accomodaton_button(_id){
        // navigate(`/Acc_regist/update/${_id}?side=accomodation&main=accomodation-section1`)
        navigate(`/host/update/${_id}/accomodation/title`)
    }

    return {click_add_button, click_accomodaton_button}
}

export default useAccManageBusiness