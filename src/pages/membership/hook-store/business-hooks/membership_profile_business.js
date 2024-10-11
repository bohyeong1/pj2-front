import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import connectData from "../../../../utilData/UtilFunction";
import { file_data } from "../../../../utilData/UtilFunction";
import default_data from "../../../../utilData/defaultData";
import { useEffect } from "react";

function useMembershipProfileBusiness(data, states, refs, props){

    // =================================================
    // navigate //
    const navigate = useNavigate()
    
    // =================================================
    // props //
    const {login_user} = props

    // =================================================
    // states //
    const {img_file, setImg_file, img_url, setImg_url, random_index, setRandom_index, loading_state, setLoading_state} = states

    // =================================================
    // refs //
    const {user_img_display, user_file_form, img_file_input} = refs

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // nickname
        nickname:Yup.string()
        .required('닉네임을 입력해 주세요.')
        .max(15, '닉네임은 15글자 이하로 입력해 주세요.')
        .matches(/^[a-zA-Z0-9가-힣]+$/, '닉네임은 한글, 영어, 숫자로 작성해 주세요!'),
    })

    // =================================================
    // state form //
    const {register, handleSubmit, formState:{errors, isValid}, watch, setValue, clearErrors, setError} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })

    // =================================================
    // 사진 등록 버튼 //
    function add_profile_img(){
        if(img_file_input.current){
            img_file_input.current.click()
        }
    }

    // =================================================
    // 기본 프로필 사용 버튼 //
    function default_profile_click(){
        if(errors.image || img_file || img_url){
            clearErrors('image')
            setImg_file(null)
            setImg_url(null)
        }
    }

    // =================================================
    // 사진 등록 인풋 //
    function click_input_img(){
        // 형식에 맞지 않는 파일은 담기 x
        const file = img_file_input.current.files[0]
        if(file){
            const img_foramts = ['image/jpeg', 'image/png', 'image/webp']
            if(img_foramts.includes(file.type)) {
                setValue('image', file)
                clearErrors('image')
                setImg_file(file)
            }else{
                setValue('image', null)
                setError('image', {
                    type: 'file_type',
                    message: 'jpeg, png, webp 형식의 이미지만 업로드를 지원합니다.',
                })
                setImg_file(null)
            }
        }

        const img_src  = URL.createObjectURL(file)
        setImg_url(img_src)
    }

    // =================================================
    // submit //
    async function submit(profile_data){

        const {nickname, image} = profile_data

        // // img, nickname 둘 다 있을 때
        if(image){
            setLoading_state(false)
            let form_data = new FormData()
            form_data.append('userImg', image)
            form_data.append('nickname', nickname)
            form_data.append('userId', login_user.userId)

            try{
                const result = await file_data(`${default_data.d_base_url}/api/users/profile`,'POST',form_data) 
            }catch(e){
                console.log(e)
            }
            setLoading_state(true)
        }
        // nickname 만 있을 때
        else{
            try{
                const result = await connectData(`${default_data.d_base_url}/api/users/nickname`,'POST',{
                    userId : login_user.userId,
                    nickname : nickname,
                    defaultProfile : default_data.random_profile_color[random_index]
                })            
            }catch(e){
                console.log(e)
            }
        }
        // navigate('/')
    }

    // =================================================
    // nickname input value //
    const input_nickname = watch('nickname')

    // =================================================
    // 서브밋 버튼 사용 가능 함수 //
    function boolean_submit(){
        if(input_nickname){
            return input_nickname.length !== 0 && !errors.nickname
        }
    }

    // =================================================
    // 다음 절차로 이동 //
    useEffect(()=>{
        if(loading_state){
            navigate('/Join_complete')
        }
    },[loading_state])

    return {register, handleSubmit, errors, isValid, input_nickname, add_profile_img, click_input_img, default_profile_click, boolean_submit, submit}
}

export default useMembershipProfileBusiness