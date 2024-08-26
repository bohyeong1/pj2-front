import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { user_login } from "../../../../utilData/UtilFunction";
import session_storage from "../../../../sessionStorage/session_storage";

function UseMembershipLoginBusiness(data, states, refs, props){

    // =================================================
    // state //
    const {log_method, setLog_method} = states

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // id
        id:Yup.string()
        .required('아이디를 입력해 주세요.')
        .min(7, '아이디는 7글자 이상 입력해 주세요.')
        .max(12, '아이디는 12글자 이하 입력해 주세요.')
        .matches(/[a-zA-Z]/, '아이디는 영문으로 작성해 주세요.')
        .matches(/^[a-zA-Z0-9]+$/, '특수 문자는 사용하지 말아주세요.'),
        // password
        password:Yup.string().required('비밀번호를 입력해 주세요.')
        .min(8, '8자 이상 입력해 주세요.')
        .max(15, '15자 이하로 입력해 주세요.')
    })

    // =================================================
    // state form //
    const {register, handleSubmit, formState:{errors, isValid}} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })

    // =================================================
    // data submit //
    async function submit(user){        
        const {id, password} = user
        const user_data = await user_login(id, password)
        console.log(user_data)

        if(user_data && user_data.log_state){
            console.log('확인')
            session_storage.save('user_id', user_data.userId)
            navigate('/')
        }
    }
    
    // =================================================
    // login method //
    function click_login_method(){
        setLog_method(!log_method)

    }

    return {register, handleSubmit, errors, isValid, click_login_method, submit}
}

export default UseMembershipLoginBusiness