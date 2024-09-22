import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import session_storage from "../../../../sessionStorage/session_storage";
import { connect_data_width_cookies } from "../../../../utilData/UtilFunction";
import default_data from "../../../../utilData/defaultData";
import { useParams } from "react-router-dom";

function useAccRegistLv9Business(data, states, refs, props){

    // =================================================
    // states //
    const {prev_data, setPrev_data, loading, setLoading} = states

    // =================================================
    // params //
    const param = useParams()

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // summary
        summary:Yup.string()
        .required('숙소를 소개하는 글을 작성해 주세요!')
        .test(
            'not_only_spaces',
            '공백으로만 구성된 글을 작성할 수 없습니다!',
            (text) => text && text.trim().length > 0
          )
    })

    // =================================================
    // state form //
    const {register, formState:{errors, isValid}, watch} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })

    // =================================================
    // data fetch  //
    async function fetch_acc(data, index){
        setLoading(false)
        watch('title')
        // prev_data와 current_data 같을 경우 api 요청 x
        if(prev_data && prev_data === data.summary){
            setLoading(true)
            return session_storage.load('house') && session_storage.load('house')._id ? {
                accomodation : {
                    _id : session_storage.load('house')._id
                }
            } : false
        }
        // prev_data와 current_data 다를 경우 패치 진행
        else{
            const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv9/${param.house}`, 'PUT', 
                {
                    acc_step : parseInt(index),
                    summary : data.summary
                })
        
                if(acc_data && acc_data.acc_state){
                    session_storage.save('house',acc_data.accomodation)
                }        
                console.log(acc_data)
                setLoading(true)
                return acc_data.acc_state ? acc_data : false
        }
    }
    return {fetch_acc, watch, register, errors, isValid}
}

export default useAccRegistLv9Business