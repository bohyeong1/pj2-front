import {useState, useRef, useContext} from "react";
import './host_regist_view5.scss'
import Host_footer from "@/utilComponent/menu/host-footer/Host-footer";
import DaumPostcodeEmbed from "react-daum-postcode";
import Kakaomap from "@/utilComponent/material/kakaomap/Kakaomap";
import '@/manage_scss_style/commonness/commonness.scss'
import Loading from "@/utilComponent/material/loading/loading";
import useHostRegistView5Business from "../../hook_store/business_hooks/host_regist_view5_business";
import default_data from "@/util/default_data/default_data";
import { state_store, reference_store, prove_accomodation } from "@/util/function/util_function";
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";

function HostRegistView5(){

    // =================================================
    // const //
    const [special_city] = useState(['서울','부산','대구','대전','울산','인천','광주'])
    const [island] = useState(['제주'])  
    const [island2] = useState(['울릉'])

    // =================================================
    // context state //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // refs //
    const adress_ref = useRef()

    // =================================================
    // states //
    const [prev_data, setPrev_data] = useState(prove_accomodation(host_acc, ['main_adress', 'sub_adress', 'search_adress']))
    const [loading, setLoading] = useState(null)
    const [popup_state, set_popup_state] = useState(false)
    const [initial_adress, setInitial_adress] = useState(null)
    const [sub_coorinate, setSub_coorinate] = useState(
        host_acc.sub_adress && host_acc.sub_adress.name ? host_acc.sub_adress.coor : null
    )
    const [main_adress, setMain_adress] = useState(
        host_acc.main_adress && host_acc.main_adress.name ? host_acc.main_adress : default_data.d_main_adress
    )
    const [filter_adress, setFilter_adress] = useState(
        host_acc.search_adress ? host_acc.search_adress : null
    )

    // =================================================
    // hooks //
    // business
    const {
        register, 
        isValid, 
        fetch_acc, 
        errors,
        set_main_adress, 
        set_sub_coordinate, 
        click_main_adress, 
        inputData, watch
    } =  useHostRegistView5Business(
        {
            host_acc,
            setHost_acc,
            special_city,
            island,
            island2
        },
        state_store([
            {filter_adress, setFilter_adress}, 
            {prev_data, setPrev_data},
            {main_adress, setMain_adress}, 
            {loading, setLoading},
            {popup_state, set_popup_state}, 
            {initial_adress, setInitial_adress},
            {sub_coorinate, setSub_coorinate}
        ]),
        reference_store([
            {adress_ref}
        ])
    ) 

    return(
        loading === false ? <Loading part = {true}></Loading> :
        <div 
            className="host-regist-view5__container" 
            onClick={(e)=>{
                if(!e.target.classList.contains('popup')){
                    set_popup_state(false)
                }
        }}> 
            <div className="host-regist-view5__content">
                <div className="host-regist-view5__content-title">
                    <span>숙소 위치를 입력해 주세요!</span>
                </div>
                <div className="host-regist-view5__content-section1">
                    {/* input */}
                    <form className="host-regist-view5__content-section1-box2">
                        <div>
                            <div className="host-regist-view5__content-section1-box2-input-wrapper">
                                <div className="host-regist-view5__section-wrapper">
                                    <span>지번 주소</span>
                                    <div className="host-regist-view5__section-box">
                                        <div></div>
                                    </div>
                                </div>
                                <input 
                                    className="ac_reg_lv5-content-section1-box2-input input-default" 
                                    ref={adress_ref} 
                                    readOnly={true} 
                                    type="text" 
                                    placeholder="도로명 / 지번" 
                                    defaultValue={main_adress.name.length ? main_adress.name : undefined}
                                    onClick={click_main_adress}
                                    autoComplete="off"/>                                
                            </div>                        
                            <div className="host-regist-view5__content-section1-box2-input-wrapper">
                                <div className="host-regist-view5__section-wrapper">
                                    <span>상세 주소</span>
                                    <div className="host-regist-view5__section-box">
                                        <div></div>
                                    </div>
                                </div>
                                <input 
                                    className="ac_reg_lv5-content-section1-box2-input input-default" 
                                    type="text" 
                                    placeholder="상세주소"
                                    {...register('detail_adress')}
                                    autoComplete="off"/> 
                                {/* error */}
                                {errors.detail_adress && <span className="input-alert-text">{errors.detail_adress.message}</span>}                         
                            </div>
                        </div>
                        {initial_adress ? <div className="host-regist-view5__content-section1-box1">
                            <span>상세 주소와 상세 지도 위치는 예약이 확정된 이후에 공개 됩니다.</span>
                        </div> : null}
                    </form>

                    {/* 지도 */}
                    <div className="host-regist-view5__content-section1-box3">
                        <div className="host-regist-view5__content-section1-box3-wrapper">
                            <div className="host-regist-view5__content-section1-box3-text2">
                                <span>구체적인 위치를 클릭해주세요</span>
                            </div>
                        </div>
                        <div className="host-regist-view5__content-section1-box3-map">
                            <Kakaomap 
                                adress_data={initial_adress} 
                                set_main_adress={set_main_adress}
                                set_sub_coordinate={set_sub_coordinate} 
                                sub_adress_coordinate = {sub_coorinate}
                                event={true} 
                                scroll={false}/>
                        </div>
                    </div>
                </div>

                {/* adress modal */}
                {popup_state ? <div className="host-regist-view5__popup-wrapper">
                    <div className="host-regist-view5__popup-header modal-header">
                        <button className="host-regist-view5__closebtn close-button">
                            <img 
                                className="host-regist-view5__closebtn-img" 
                                src={default_data.d_imgs.close}/>
                        </button>
                        <div>
                            <span>주소</span>
                        </div>
                        <div className="host-regist-view5__gurabox1 gura-box"></div>
                    </div>
                    <DaumPostcodeEmbed 
                        submitMode={false} 
                        onComplete={inputData} 
                        className="host-regist-view5__popup" 
                        autoClose={true}/>
                </div> : null}                
            </div>

            <div className="host-regist-view5__footer">
                <Host_footer 
                    fetch_handler={fetch_acc}  
                    drop_data = {
                        {
                            main_adress : main_adress, 
                            sub_adress : {name : watch('detail_adress'), 
                            coor : sub_coorinate ? sub_coorinate : [main_adress.coor[0], main_adress.coor[1]]}, 
                            search_adress : filter_adress
                        }
                    }
                    button_state={isValid && main_adress.name.length !== 0 && main_adress.coor.length === 2} 
                    fetch_state={true}/>
            </div>
        </div>
    )
}

export default HostRegistView5