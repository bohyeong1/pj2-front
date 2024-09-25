import React,{useRef, useState} from "react";
import './Acc_regist_lv11.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import session_storage from "../../../sessionStorage/session_storage";
import default_data from "../../../utilData/defaultData";
import Loading from "../../../utilComponent/material/loading/loading";
import useAccRegistLv11Business from "../hook_store/business_hooks/acc_regist_lv11_business";
import useAccRegistLv11Style from "../hook_store/style_hooks/acc_regist_lv11_style";
import { state_store } from "../../../utilData/UtilFunction";
import { Line } from 'react-chartjs-2';

function AccRegistLv11({login_user, this_step}){

    // =================================================
    // accomodation information //
    const accomodation = session_storage.load('house')

    // =================================================
    // this level's accomodation field name //
    const field_name = default_data.regist_field[this_step]

    // =================================================
    // dates //
    const today_date = new Date()
    const set_date = new Date(today_date.setMonth(today_date.getMonth() - 11))
    const date_range = set_date.getMonth()

    // =================================================
    // states //
    const [prev_data, setPrev_data] = useState(accomodation[field_name[0]] && accomodation[field_name[1]] ? 
        {
            [field_name[0]] : accomodation[field_name[0]],
            [field_name[1]] : accomodation[field_name[1]]
        } : null)
    const [loading, setLoading] = useState(null)
    const [chart_data, setChart_data] = useState(null)
    const [average_data, setAverage_date] = useState(null)

    // =================================================
    // hooks //
    // business
    const {fetch_acc, register, errors, isValid, watch, get_average} = useAccRegistLv11Business({
        'date_range' : date_range,
        'accomodation' : accomodation
    },
        state_store([
            {
                'loading' : loading,
                'setLoading' : setLoading
            },
            {
                'prev_data' : prev_data,
                'setPrev_data' : setPrev_data
            },
            {
                'chart_data' : chart_data,
                'setChart_data' : setChart_data
            },
            {
                'average_data' : average_data,
                'setAverage_date' : setAverage_date
            }
        ]))
    // style
    const {input_control} = useAccRegistLv11Style()

    return(
        loading === false ? <Loading></Loading> :
        <div className="Acc-regist-lv11__container">
            <Main_menu login_user={login_user}></Main_menu>
            <div className="Acc-regist-lv11__content">
                <div className="Acc-regist-lv11__content-title">
                    <span>숙소의 가격을 설정해 주세요!</span>                    
                </div>
                <div className="Acc-regist-lv11__content-section1">
                    <div className="Acc-regist-lv11__content-section1-box1">
                        <div className="Acc-regist-lv11__content-title-wrapper">
                            <div className="Acc-regist-lv11__content-part1">
                                <div className="Acc-regist-lv11__title">
                                    <span>예약 가격</span>
                                    <div className="Acc-regist-lv11__section-box">
                                        <div></div>
                                    </div>    
                                </div>  
                            </div>   
                            <div className="Acc-regist-lv11__content-part2">
                                {average_data ? <div className="Acc-regist-lv11__content-average-wrapper">
                                    <span>
                                        {`'${accomodation.search_adress}' 1년 평균 가격`}
                                    </span>
                                    <span>
                                        {`${get_average(average_data.valid_price_values)}원`}
                                    </span>
                                </div> :
                                <div className="Acc-regist-lv11__no-average">
                                    <span>{`'${accomodation.search_adress}' 지역의 1년간 데이터 등록 표본이 없습니다!`}</span>
                                </div>}
                            </div>
                        </div>
                        <div className="Acc-regist-lv11__content-input-wrapper">
                            <div className="Acc-regist-lv11__content-box1-input">
                                <input type="text"
                                {...register('price', {
                                    onChange : (e)=>{input_control(e)}
                                })}>
                                </input>
                                <label>원</label>
                            </div>   
                            {/* error */}
                            {errors.price && <span className="input-alert-text">{errors.price.message}</span>} 
                        </div>       
                    </div>  

                    <div className="Acc-regist-lv11__content-section1-box2">
                        <div className="Acc-regist-lv11__content-title-wrapper">
                            <div className="Acc-regist-lv11__content-part1">
                                <div className="Acc-regist-lv11__title">
                                    <span>추가 인원 가격</span>
                                    <div className="Acc-regist-lv11__section-box">
                                        <div></div>
                                    </div>    
                                </div>  
                            </div>   
                            <div className="Acc-regist-lv11__content-part2">
                                {average_data ? <div className="Acc-regist-lv11__content-average-wrapper">
                                    <span>
                                        {`'${accomodation.search_adress}' 1년 평균 추가 인원 가격`}
                                    </span>
                                    <span>
                                        {`${get_average(average_data.valid_add_price_values)}원`}
                                    </span>
                                </div> : 
                                <div className="Acc-regist-lv11__no-average">
                                    <span>{`'${accomodation.search_adress}' 지역의 1년간 데이터 등록 표본이 없습니다!`}</span>
                                </div>}
                            </div>
                        </div>
                        <div className="Acc-regist-lv11__content-input-wrapper">
                            <div className="Acc-regist-lv11__content-box1-input">
                                <input type="text"
                                {...register('add_price', {
                                    onChange : (e)=>{input_control(e)}
                                })}>                                    
                                </input>
                                <label>원</label>
                            </div>
                            {/* error */}
                            {errors.add_price && <span className="input-alert-text">{errors.add_price.message}</span>} 
                        </div>
                    </div>
                    {/* chart */}
                    <div className="Acc-regist-lv11__content-section1-chart-wrapper">
                        {chart_data ? <Line data={chart_data}
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
                                          return value + ' 원'
                                        },
                                    }
                                },
                            },
                            }}>                            
                        </Line> : null}
                    </div>
                </div>
            </div>
            <div className="Acc-regist-lv11__footer">
                <Host_footer fetch_handler={fetch_acc} 
                drop_data={{
                    price : watch('price'),
                    addPrice : watch('add_price')
                }} 
                button_state={isValid} fetch_state={true}></Host_footer>
            </div>
        </div>
    )
}

export default AccRegistLv11