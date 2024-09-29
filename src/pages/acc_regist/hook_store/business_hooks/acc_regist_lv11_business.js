import { useForm } from "react-hook-form"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import default_data from "../../../../utilData/defaultData";
import connectData from "../../../../utilData/UtilFunction";
import { connect_data_width_cookies } from "../../../../utilData/UtilFunction";
import { Chart, registerables } from 'chart.js';
import session_storage from "../../../../sessionStorage/session_storage";
Chart.register(...registerables)

function useAccRegistLv11Business(data, states, refs, props){
    // =================================================
    // data //
    const {date_range, accomodation} = data

    const {loading, setLoading, prev_data, setPrev_data, chart_data, setChart_data, average_data, setAverage_date} = states

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // price
        price:Yup.string()
        .required('가격을 입력해 주세요!')
        ,
        // add price
        add_price:Yup.string()
        .required('추가 인원 가격을 입력해 주세요!')
    })

    // =================================================
    // params //
    const param = useParams()

    // =================================================
    // state form //
    const {register, formState:{errors, isValid}, watch} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'all'
    })

    // =================================================
    // date array //
    const date_array_initial = Array.from({length : 12})
    const date_array = date_array_initial.map((el, index) => {
        return el = (date_range + 1 + index) % 12 || 12
    })

    // =================================================
    // date array //
    async function get_accomodation_average(){
        setLoading(false)
        const acc_data = await connectData(`${default_data.d_base_url}/api/accomodation/regist/localAverage/${param.house}`, 'POST', 
            {
                search_adress : accomodation.search_adress
            })

            setLoading(true)
            if(acc_data && acc_data.db_state && acc_data.server_state){
                return acc_data.accomodation
            }   
            // 추후 에러페이지 제작 후 리다이렉션 시키기 
            else{
                console.log('적합한 date 없음')
            }   
    }

    // =================================================
    // get local price average //
    useEffect(()=>{
        async function fetch_average(){
            const accomodation_average = await get_accomodation_average()
            if(accomodation_average.length){
                const final_date_array = date_array.map((el) => {
                    const date = accomodation_average.find((ele) => {
                        return ele._id.month === el
                    })
                    return date || {_id : {month : el}, average_price : 0, average_add_price : 0}
                })
                const labels = final_date_array.map((el) => {
                    return el._id.month + '월'
                })    
                const price_values = final_date_array.map((el) => {
                    return el.average_price
                })
                const add_price_values = final_date_array.map((el) => {
                    return el.average_add_price
                })
                const valid_price_values = accomodation_average.map((el) => {
                    return el.average_price
                })
                const valid_add_price_values = accomodation_average.map((el) => {
                    return el.average_add_price
                })
    
                setChart_data({
                    labels,
                    datasets: [
                        {
                          label: '해당 지역 예약 평균 가격',
                          data: price_values,
                          borderColor: '#1273E4',
                          backgroundColor: 'rgba(255,255,255,0)',
                          fill: true,
                        },
                        {
                            label: '해당 지역 추가인원 평균 가격',
                            data: add_price_values,
                            borderColor: 'rgb(171, 210, 255)',
                            backgroundColor: 'rgba(255,255,255,0)',
                            fill: true,
                        },
                    ],
                })
                setAverage_date({
                    valid_price_values : valid_price_values,
                    valid_add_price_values : valid_add_price_values
                })
            }
        }

        fetch_average()
    },[])

    // =================================================
    // get average //
    function get_average(data){
        const specimen = data.length
        if(!specimen){
            return 0
        }
        const total = data.reduce((prv, cur) => {
            return prv + cur
        },0)
        return Math.round(total / specimen) 
    }

    // =================================================
    // change string to number //
    function change_string_to_number(string){
        const cleanString = string.split(',').join('')
        const change_to_number = parseInt(cleanString)
        return !isNaN(change_to_number) ? change_to_number : null
    }

    // =================================================
    // data fetch //
    async function fetch_acc(data, index){
        setLoading(false)
        // prev_data와 current_data 같을 경우 api 요청 x
        if(prev_data && prev_data.price === change_string_to_number(data.price) && prev_data.addPrice === change_string_to_number(data.addPrice)){
            setLoading(true)
            return session_storage.load('house') && session_storage.load('house')._id ? {
                accomodation : {
                    _id : session_storage.load('house')._id
                }
            } : false
        }
        // prev_data와 current_data 다를 경우 패치 진행
        else{
            const acc_data = await connect_data_width_cookies(`${default_data.d_base_url}/api/accomodation/registLv11/${param.house}`, 'PUT', 
                {
                    acc_step : parseInt(index),
                    price : change_string_to_number(data.price),
                    addPrice : change_string_to_number(data.addPrice)
                })
        
                if(acc_data && acc_data.acc_state){
                    session_storage.save('house',acc_data.accomodation)
                }        
                console.log(acc_data)
                setLoading(true)
                return acc_data.acc_state ? acc_data : false
        }           
    }  

    return {fetch_acc, register, errors, isValid, watch, get_average, change_string_to_number}
}

export default useAccRegistLv11Business