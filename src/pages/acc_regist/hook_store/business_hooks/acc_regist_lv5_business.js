import default_data from "../../../../utilData/defaultData"
import { useForm } from "react-hook-form"
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { connect_data_width_cookies } from "../../../../utilData/UtilFunction"
import session_storage from "../../../../sessionStorage/session_storage"
import _ from 'lodash'

function useAccRegistLv5Business(data, states, refs, props){
    // =================================================
    // states //
    const {prev_data, setPrev_data, loading, setLoading, popup_state, set_popup_state,
        initial_adress, setInitial_adress, sub_coorinate, setSub_coorinate, main_adress, setMain_adress, filter_adress, 
        setFilter_adress} = states

    // =================================================
    // refs //
    const {adress_ref} = refs

    // =================================================
    // data //
    const {accomodation, field_name} = data

    // =================================================
    // const *db로 빼놓고 어드민페이지에서 관리해야하나? //
    const special_city = ['서울','부산','대구','대전','울산','인천','광주']
    const island = ['제주']  
    const island2 = ['울릉']
       
    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // 상세 주소
        detail_adress:Yup.string()
        .required('상세주로를 입력해 주세요.')
        .max(15, '35자 이하로 입력해 주세요.')
        .matches(/^[가-힣0-9][가-힣0-9\(\)\-\s]*$/, "한글, 숫자, 특수문자 '(', ')', '-' 만 허용됩니다.")
    })

    // =================================================
    // state form //
    const {register, formState:{isValid}, watch} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all',
        defaultValues : {
            'detail_adress' : accomodation[field_name] ? accomodation[field_name] : null
        }
    })

    // =================================================
    // main adress data 저장  //
    function set_main_adress(adress, x, y){
        const structure = {
            ...default_data.d_main_adress,
            name : adress,
            coor : [x, y]
        }
        setMain_adress(structure)
    }

    // =================================================
    // 카카오맵으로 부터 위도, 경도 받아 오기  //
    function set_sub_coordinate(x,y){
        const coordina = [x,y]
        setSub_coorinate(coordina)
    }

    // =================================================
    // daum post 주소 라이브러리 모달 띄우기  //
    function click_main_adress(e){
        e.stopPropagation()
        set_popup_state(true)
    }

    // =================================================
    // 인풋 데이터 스테이트 변경 함수 //
    function inputData(data){
        // data.sido 시,도 정보             filter_adress에 가공해서 저장할 것
        // data.sigungu 시,군,구 정보       filter_adress에 가공해서 저장할 것
        // data.roadAddress 도로명 주소     main_adress에 저장할 것
        if(special_city.includes((data.sido).slice(0,2))){
            setFilter_adress((data.sido).slice(0,2))
        }
        else if(island.includes((data.sido).slice(0,2))){
            setFilter_adress((data.sido).slice(0,2)+'도')
        }
        else if(island2.includes((data.sigungu).slice(0,2))){
            setFilter_adress((data.sigungu).slice(0,2)+'도')
        }
        else{
            let copiedData = data.sigungu
            const length = copiedData.length
            setFilter_adress(copiedData.slice(0,length-1))
        }
        adress_ref.current.value = data.roadAddress
        set_popup_state(false)
        setInitial_adress(data.roadAddress)
    }

    // =================================================
    // match accomodation field //
    function match_accomodation(prev_data, match1, match2, match3){
        if(prev_data && _.isMatch(prev_data.main_adress, match1) && _.isMatch(prev_data.sub_adress, match2) && _.isMatch(prev_data.search_adress, match3)){
            return true
        }
        return false
    }

    // =================================================
    // data fetch  //
    async function fetch_acc(data, index){       
        setLoading(false)

        if(match_accomodation(prev_data, data.sub_adress, data.sub_adress, data.search_adress)){
            setLoading(true)
            return session_storage.load('house') && session_storage.load('house')._id ? {
                accomodation : {
                    _id : session_storage.load('house')._id
                }
            } : false
        }
        // prev_data와 current_data 다를 경우 패치 진행
        else{            
            const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv5`, 'PUT', 
                {
                    acc_step : parseInt(index),
                    main_adress : data.main_adress,
                    sub_adress : data.sub_adress,
                    search_adress : data.search_adress
                })
        
                if(acc_data && acc_data.acc_state){
                    session_storage.save('house',acc_data.accomodation)
                }        
                console.log(acc_data)
                setLoading(true)
                return acc_data.acc_state ? acc_data : false
        }
    }

    return {register, isValid, fetch_acc, set_main_adress, set_sub_coordinate, click_main_adress, inputData, watch}
}

export default useAccRegistLv5Business