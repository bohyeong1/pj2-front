import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import connectData from "../../../../utilData/UtilFunction";
import default_data from "../../../../utilData/defaultData";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase/firebase";

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
        .matches(/[0-9]/, '아이디에 숫자를 포함해 주세요.')
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

        const data = await connectData(`${default_data.d_base_url}/api/users/login`, 'POST',{
            userId : id,
            password : password
        })

        console.log(data)

        if(data.code === 401){
            alert(data.message)
        }else{
            if(log_method){
                // localStorage.setItem('userData',JSON.stringify(data))
            }else{
                sessionStorage.setItem('userData',JSON.stringify(data))
            }
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