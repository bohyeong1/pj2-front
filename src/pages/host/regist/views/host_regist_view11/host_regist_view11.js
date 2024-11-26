import {useState, useContext} from "react";
import './host_regist_view11.scss'
import Host_footer from "@/utilComponent/menu/host-footer/Host-footer";
import Loading from "@/utilComponent/material/loading/loading";
import useHostRegistView11Business from "../../hook_store/business_hooks/host_regist_view11_business";
import useHostRegistView11Style from "../../hook_store/style_hooks/host_regist_view11_style";
import { state_store } from "@/util/function/util_function";
import { Line } from 'react-chartjs-2';
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";
import {pop_three_texts} from '@/util/function/util_function'

function HostRegistView11(){

    // =================================================
    // context states //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // dates //
    const today_date = new Date()
    const set_date = new Date(today_date.setMonth(today_date.getMonth() - 11))
    const date_range = set_date.getMonth()

    // =================================================
    // states //
    const [prev_data, setPrev_data] = useState(host_acc.price && host_acc.addPrice ? 
        {
            price : host_acc.price,
            addPrice : host_acc.addPrice
        } : null)
    const [loading, setLoading] = useState(null)
    const [chart_data, setChart_data] = useState(null)
    const [average_data, setAverage_date] = useState(null)

    // =================================================
    // hooks //
    // business
    const {
        fetch_acc, 
        register,
        errors, 
        isValid, 
        watch, 
        get_average
    } = useHostRegistView11Business(
        {
            date_range,
            host_acc,
            setHost_acc
        },
        state_store([
            {loading, setLoading},
            {prev_data, setPrev_data},
            {chart_data, setChart_data},
            {average_data, setAverage_date}
        ]))
    // style
    const {input_control} = useHostRegistView11Style()

    return(
        loading === false ? <Loading></Loading> :
        <div className="host-regist-view11__container">

            <div className="host-regist-view11__content">
                <div className="host-regist-view11__content-title">
                    <span>숙소의 가격을 설정해 주세요!</span>                    
                </div>
                <div className="host-regist-view11__content-section1">
                    <div className="host-regist-view11__content-section1-box1">
                        <div className="host-regist-view11__content-title-wrapper">
                            <div className="host-regist-view11__content-part1">
                                <div className="host-regist-view11__title">
                                    <span>예약 가격</span>
                                    <div className="host-regist-view11__section-box">
                                        <div></div>
                                    </div>    
                                </div>  
                            </div>   
                            <div className="host-regist-view11__content-part2">
                                {average_data ? <div className="host-regist-view11__content-average-wrapper">
                                    <span>
                                        {`'${host_acc?.search_adress}' 지역 1년 평균 가격`}
                                    </span>
                                    <span>
                                        {`${pop_three_texts(get_average(average_data.valid_price_values))}원`}
                                    </span>
                                </div> :
                                <div className="host-regist-view11__no-average">
                                    <span>{`'${host_acc?.search_adress}' 지역의 1년간 데이터 등록 표본이 없습니다!`}</span>
                                </div>}
                            </div>
                        </div>
                        <div className="host-regist-view11__content-input-wrapper">
                            <div className="host-regist-view11__content-box1-input">
                                <input 
                                    type="text"
                                    autoComplete="off"
                                    {...register('price', {
                                        onChange : (e)=>{input_control(e)}
                                    })}/>
                                <label>원</label>
                            </div>   
                            {/* error */}
                            {errors.price && <span className="input-alert-text">{errors.price.message}</span>} 
                        </div>       
                    </div>  

                    <div className="host-regist-view11__content-section1-box2">
                        <div className="host-regist-view11__content-title-wrapper">
                            <div className="host-regist-view11__content-part1">
                                <div className="host-regist-view11__title">
                                    <span>추가 인원 가격</span>
                                    <div className="host-regist-view11__section-box">
                                        <div></div>
                                    </div>    
                                </div>  
                            </div>   
                            <div className="host-regist-view11__content-part2">
                                {average_data ? <div className="host-regist-view11__content-average-wrapper">
                                    <span>
                                        {`'${host_acc?.search_adress}' 지역 1년 평균 추가 인원 가격`}
                                    </span>
                                    <span>
                                        {`${pop_three_texts(get_average(average_data.valid_add_price_values))}원`}
                                    </span>
                                </div> : 
                                <div className="host-regist-view11__no-average">
                                    <span>{`'${host_acc?.search_adress}' 지역의 1년간 데이터 등록 표본이 없습니다!`}</span>
                                </div>}
                            </div>
                        </div>
                        <div className="host-regist-view11__content-input-wrapper">
                            <div className="host-regist-view11__content-box1-input">
                                <input 
                                    type="text"
                                    autoComplete="off"
                                    {...register('add_price', {
                                        onChange : (e)=>{input_control(e)}
                                    })}/>                                    
                                <label>원</label>
                            </div>
                            {/* error */}
                            {errors.add_price && <span className="input-alert-text">{errors.add_price.message}</span>} 
                        </div>
                    </div>
                    {/* chart */}
                    <div className="host-regist-view11__content-section1-chart-wrapper">
                        {chart_data ? 
                        <Line 
                            data={chart_data}
                            options={{
                            responsive: true,
                            scales: {
                                x: {
                                type: 'category',
                                },
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: (value) => {
                                          return pop_three_texts(value) + ' 원'
                                        },
                                    }
                                },
                            },
                            }}/> : null}
                    </div>
                </div>
            </div>
            <div className="host-regist-view11__footer">
                <Host_footer 
                    fetch_handler={fetch_acc} 
                    drop_data={
                        {
                            price : watch('price'),
                            addPrice : watch('add_price')
                        }
                    } 
                    button_state={isValid} 
                    fetch_state={true}/>
            </div>
        </div>
    )
}

export default HostRegistView11