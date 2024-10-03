import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { connect_data_width_cookies } from "../../../../utilData/UtilFunction";
import default_data from "../../../../utilData/defaultData";

function useAccInitialRegistBusiness(data, states, refs, props){

    // =================================================
    // location //
    const location = useLocation()

    // =================================================
    // navigate //
    const navigate = useNavigate()
    
    // =================================================
    // state //
    const {loading, setLoading} = states

    // =================================================
    // Acc_initial로 부터 온 경우만 페이지 허용하기 //
    // if(location.state?.from !== '/Acc_initial' && location.state?.from !== '/Acc_initial_regist'){
    //     navigate('/Acc_regist')
    // }

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // text
        text:Yup.string()
        .required('숙소의 규칙이나 자신을 소개하는 문구를 작성해 주세요!')
    })

    // =================================================
    // state form //
    const {register, handleSubmit, formState:{errors, isValid}} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'onBlur'
    })

    // =================================================
    // submit //
    async function submit(input_data){       
        setLoading(false)
        const {text} = input_data

        try{
            const host_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/users/hostinformation`,'POST',{
                host_text : text
            })
            if(host_data && host_data.log_state){
                setLoading(true)
                navigate('/Acc_regist/Acc_regist_lv0')
            }else{
                console.log('에러 점검', host_data)
            }
        }catch(e){
            console.log(e)
        }
    }    

    return {register, handleSubmit, errors, isValid, submit}
}

export default useAccInitialRegistBusiness