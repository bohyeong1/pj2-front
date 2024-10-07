import { useForm, useFormState } from "react-hook-form"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import _ from 'lodash'
import { useEffect } from "react"
import default_data from "@/util/default_data/default_data";
import { connect_data_width_cookies } from "@/util/function/util_function";
import session_storage from "@/sessionStorage/session_storage";
import { useParams } from "react-router-dom";
import { pop_three_texts } from '@/util/function/util_function'

function useHostUpdateAccomodationView6Business(data, states, refs, props){

    // =================================================
    // refs //
    
    // =================================================
    // params //
    const param = useParams() 

    // =================================================
    // data //
    const {acc_data, 
           setAcc_data} = data

    // =================================================
    // states//
    const {loading, 
           setLoading, 
           is_button, 
           setIs_button,
           price,
           setPrice,
           add_price,
           setAdd_price,
           discount_date,
           setDiscount_date,
           discount_rate,
           setDiscount_rate} = states

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // price
        price:Yup.string()
        .required('1박당 가격을 설정해 주세요!')
        .min(4, '가격은 최소 만원 이상 입력해 주세요!')
        ,
        // add price
        add_price:Yup.string()
        .required('1박당 추가인원 가격을 설정해 주세요!')
        .min(1, '가격은 최소 천원 이상 입력해 주세요!')
    })

    // =================================================
    // state form //
    const { register, reset, watch, control } = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all',
        defaultValues: {
            count: 0,
        }
    })

    const {errors, isValid} = useFormState({control})

    // =================================================
    // price 초기값 설정 //
    useEffect(()=>{
        if(price){
            reset({
                price : pop_three_texts(price),
                add_price : pop_three_texts(add_price)
            })
        }
    },[price, reset, add_price])

    // =================================================
    // controll button //
    useEffect(()=>{
        if(is_button){
            if(acc_data.discount){
                if(watch('price').split(',').join('') === String(acc_data.price) && 
                   watch('add_price').split(',').join('') === String(acc_data.addPrice) && 
                   discount_rate === acc_data.discount.rate && 
                   _.isEqual(discount_date, acc_data.discount.date)){
                        setIs_button(false)
                        return
                }
            }
            else{
                if(watch('price').split(',').join('') === String(acc_data.price) && 
                   watch('add_price').split(',').join('') === String(acc_data.addPrice) &&
                   (!discount_date ||
                   !discount_rate)){
                        setIs_button(false)
                        return
                }
            }
        }

        if(!is_button){
            if(acc_data.discount){
                if(watch('price').split(',').join('') !== String(acc_data.price) || 
                   watch('add_price').split(',').join('') !== String(acc_data.addPrice) || 
                   (discount_rate !== acc_data.discount.rate && 
                   !_.isEqual(discount_date, acc_data.discount.date))){
                        setIs_button(true)
                        return
                }
            }
            else{                   
                if(watch('price').split(',').join('') !== String(acc_data.price) ||
                   watch('add_price').split(',').join('') !== String(acc_data.addPrice) ||
                   (discount_date &&
                   discount_rate > 0)){
                        setIs_button(true)
                        return
                }
            }
        }
    },[watch('price'), watch('add_price'), discount_rate, discount_date])

    // =================================================
    // data fetch //
    async function fetch_acc(){
        setLoading(false)
        const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/modify/price/${param.house}`, 'PUT', 
            {
                price : parseInt(watch('price').split(',').join('')),
                addPrice : parseInt(watch('add_price').split(',').join('')),
                discount : discount_date && discount_rate ? {date : discount_date, rate : parseInt(discount_rate)} : null
            })
    
            if(acc_data && acc_data.acc_state && acc_data.server_state){
                setAcc_data(acc_data.accomodation)
                session_storage.save('house',acc_data.accomodation)
                setIs_button(false)
            }        
        setLoading(true)
    }

    return {register, watch, fetch_acc, errors}
}

export default useHostUpdateAccomodationView6Business