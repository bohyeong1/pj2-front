import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import connectData from "../../../../utilData/UtilFunction";
import default_data from "../../../../utilData/defaultData";
import { useEffect } from "react";

function useMembershipEmailBusiness(data, states, refs, props){
    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // refs //
    const {timer, web_worker} = refs

    // =================================================
    // states //
    const {verification_state, setVerification_state, auth_state, setAuth_state, interval_var, setInterval_var} = states

    // =================================================
    // props //
    const {login_user} = props

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // email
        email:Yup.string()
        .required('이메일을 입력해 주세요.')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, '기본적인 이메일 형식을 지켜주세요.'),
        // code
        code:Yup.string()
        .required('코드를 입력해 주세요.')
        .matches(/^.{6}$/, '코드는 6자리를 입력해 주세요.')
    })

    // =================================================
    // state form //
    const {register, handleSubmit, formState:{errors, isValid}, watch} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })

    // =================================================
    // 인증코드 발급 //
    async function verification_click(e, email){
        e.preventDefault()
        const verification_data = await connectData(`${default_data.d_base_url}/api/users/verification`, 'POST',{
            userId : login_user.userId,
            email : email
        })

        if(verification_data.code_state){
            // timer 실행
            web_worker.current.postMessage({ action: 'start', time: 600 })

        }
        setVerification_state(verification_data)

        // timer 실행
        web_worker.current.postMessage({ action: 'start', time: 600 })
    }

    // =================================================
    // data submit //
    async function submit(user){       
        // setauth_state(false)

        const {email, code} = user

        // email 인증 fetch
        const auth_state = await connectData(`${default_data.d_base_url}/api/users/authemail`, 'POST',{
            email : email,
            code : code,
            userId : login_user.userId
        })

        console.log(auth_state)

        // auth state
        setAuth_state(auth_state)
    }

    // =================================================
    // email input value값 //
    const input_email = watch('email')

    // =================================================
    // clear auth state onchange //
    function clear_auth(){
        if(auth_state){
            console.log('확인')
            setAuth_state(null)
        }
    }

    // =================================================
    // clear verification state onchange //
    function clear_verification(){
        if(verification_state){
            setVerification_state(null)
        }
    }

    // =================================================
    // 다음 회원가입 절차로 이동 //
    useEffect(()=>{
        if(auth_state && auth_state.code_state){
            navigate('/Profile')
        }
    },[auth_state])

    // =================================================
    // 화면 마운트 언마운트 시 웹워커 제어 //
    useEffect(()=>{
        if(web_worker.current){
            return
        }
        web_worker.current = new Worker('/timer_worker.js')

        web_worker.current.onmessage = function(e){
            if(timer.current){
                timer.current.textContent = `${e.data.minutes} : ${e.data.seconds}`
            }
        }


        return ()=>{
            web_worker.current.terminate()
        }
    },[])



    return {register, handleSubmit, errors, isValid, submit, input_email, verification_click, clear_verification, clear_auth}
}

export default useMembershipEmailBusiness