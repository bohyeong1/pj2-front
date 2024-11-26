import { useForm, useFormState } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import session_storage from "@/sessionStorage/session_storage";
import { connect_data_width_cookies, text_change } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useParams } from "react-router-dom";

function useHostUpdateAccomodationView9Business(data, states, refs, props){

    // =================================================
    // states //
    const {is_button, 
           setIs_button, 
           loading, 
           setLoading,
           summary,
           setSummary,
           sellect_button, 
           setSellect_button} = states

    // =================================================
    // refs //
    const {gurabox_ref,
           row_alram_ref,
           rule_alert_ref} = refs
 
    // =================================================
    // params //
    const param = useParams()

    // =================================================
    // data //
    const {acc_data, 
           setAcc_data} = data

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // summary
        summary:Yup.string()
        .required('추가 규칙을 작성해 주세요!')
        .test(
            'not_only_spaces',
            '공백으로만 구성된 글을 작성할 수 없습니다!',
            (text) => text && text.trim().length > 0
        )
    })

    // =================================================
    // state form //
    const {register, setValue, watch, reset, control} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all',
        defaultValues: {
            count: acc_data ? acc_data.rules[0].count : 0,
        }
    })
    const {errors, isValid} = useFormState({control})

    // =================================================
    // summary 초기값 설정 //
    useEffect(()=>{
        if(summary){
            reset({
                summary : summary
            })
            text_change(summary, gurabox_ref, row_alram_ref, rule_alert_ref)
        }
    },[summary])  

    // =================================================
    // controll button //
    useEffect(()=>{
        if(is_button){
            if(!isValid || 
                (acc_data.rules[4].summary === watch('summary') &&
                acc_data.rules[0].count === parseInt(watch('count')) &&
                acc_data.rules.slice(1,4).every((el, index) => {return el.state === sellect_button[`case${index + 1}`]}))){
                setIs_button(false)
                return
            }
        }

        if(!is_button){
            if((isValid && acc_data.rules[4].summary !== watch('summary')) ||
                acc_data.rules[0].count !== parseInt(watch('count')) ||
                acc_data.rules.slice(1,4).some((el, index) => {return el.state !== sellect_button[`case${index + 1}`]})){
                setIs_button(true)
                return
            }
        }
    },[isValid, watch('summary'), watch('count'), sellect_button])

    // =================================================
    // data fetch  //
    async function fetch_acc(){
        setLoading(false)
        
        const data_structure = default_data.home_rules
        const update_data = data_structure.map((el, index)=>{
            if(index === 0){
                return {
                    ...el,
                    state : watch('count') ? true : false,
                    count : watch('count')
                }
            }
            else if(index === data_structure.length - 1){
                return {
                    ...el,
                    state : watch('rule') && isValid ? true : false,
                    summary : watch('rule')
                }
            }
            else{
                return {
                    ...el,
                    state : sellect_button[`case${index}`]
                }
            }
        })

        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/modify/rule/${param.house}`, 'PUT', 
            {
                rules : update_data
            })
    
            if(acc_data && acc_data.acc_state && acc_data.server_state){
                setAcc_data(acc_data.accomodation)
                session_storage.save('house',acc_data.accomodation)
                setIs_button(false)
            }        
        setLoading(true)
    }

    return {register, setValue, watch, fetch_acc, errors}
}

export default useHostUpdateAccomodationView9Business