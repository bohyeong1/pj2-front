import default_data from "../../../../utilData/defaultData";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";

function useAccRegistLv5Business(data, states, refs, props){
    // =================================================
    // states //
    const {current_data, setCurrent_data, prev_data, setPrev_data, fetch_state, setFetch_state, loading, setLoading, popup_state, set_popup_state,
        initial_adress, setInitial_adress, sub_coorinate, setSub_coorinate, sub_adress, SetSub_adress, main_adress, setMain_adress, filter_adress, 
        setFilter_adress} = states

    // =================================================
    // refs //
    const {adress_ref, sub_adress_ref} = refs

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
    const {register, formState:{errors, isValid}} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })

    ////////////////////디바운싱
    function debounce(func, delay) {
        let timer
        return function() {
            const args = arguments
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }

    // =================================================
    // sub adress onchange //
    function set_sub_adress(){
        const structure = default_data.d_sub_adress
        structure.name = sub_adress_ref.current.value
        structure.coor = [main_adress.coor[0],main_adress.coor[1]]
        SetSub_adress(structure)
    }

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
    // 카카오맵으로 부터 받아온 위도 경도로 부터 스테이트 값 최신화 시키기  //
    useEffect(()=>{
        if(sub_coorinate.length != 0 && sub_adress){
            const sub_ad = sub_adress
            sub_ad.coor = sub_coorinate
            SetSub_adress(sub_ad)
        }

        setCurrent_data({
            main:main_adress,
            sub:sub_adress,
            filter:filter_adress
        })
    },[sub_coorinate,sub_adress])

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
    // data fetch  //
    async function fetch_acc(data, index){           
        // const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register/update`, 'PUT', 
        // {seller : userData._id,
        //     _id : registData._id,
        //     main_adress : data.main,
        //     sub_adress : data.sub,
        //     search_adress : data.filter
        // }, localStorage.getItem('log'))    
    } 

    return {register, errors, isValid, fetch_acc, debounce, set_sub_adress, set_main_adress, set_sub_coordinate, click_main_adress, inputData}
}

export default useAccRegistLv5Business