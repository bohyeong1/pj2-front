import {useState, useContext} from "react";
import './host_regist_view0.scss'
import default_data from "@/util/default_data/default_data";
import useHostRegistView0Business from "../../hook_store/business_hooks/host_regist_view0_business";
import Loading from "@/utilComponent/material/loading/loading";
import { state_store } from "@/util/function/util_function";
import Host_footer from "@/utilComponent/menu/host-footer/Host-footer";
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";
import bedroom from '@/assets/image/bedroom.png'
import decoroom from '@/assets/image/decoroom.png'
import restroom from '@/assets/image/restroom.png'

function HostRegistView0(){

    // =================================================
    // context state //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // state //
    const [loading, setLoading] = useState(null)
    const [button_state, setButton_state] = useState(true)
    const [fetch_state, setFetch_state] = useState(null)

    // =================================================
    // hooks //
    const {fetch_acc} = useHostRegistView0Business(
        {
            host_acc,
            setHost_acc
        },
        state_store([
            {loading, setLoading},
            {fetch_state, setFetch_state}
        ])
    )

    return(
        loading === false ? <Loading></Loading> :
            <div className="host-regist-view0__container">
                <div className="host-regist-view0__content">
                    <div className="host-regist-view0__content-section1">
                        <span>간단한 절차를 진행해 주세요!</span>
                    </div>
                    <div className="host-regist-view0__content-section2">
                        <div className="host-regist-view0__content-section2-part1">
                            <div className="host-regist-view0__content-section2-part1-text1">
                                <span>1.</span>
                                <span className="host-regist-view0__content-section2-logo">숙소 정보를 입력하세요</span>
                            </div>
                            <div className="host-regist-view0__content-section2-part1-text2">
                                <div>숙소의 위치와 숙박 가능인원 등 기본 정보를 입력하세요</div>
                                <img 
                                    className="host-regist-view0__img" 
                                    src={bedroom}/>
                            </div>
                        </div>
                        <div className="host-regist-view0__content-section2-part2">
                            <div className="host-regist-view0__content-section2-part2-text1">
                                <span>2.</span>
                                <span className="host-regist-view0__content-section2-logo">숙소 이미지를 등록하세요</span>
                            </div>
                            <div className="host-regist-view0__content-section2-part2-text2">
                                <div>숙소를 돋보이게 하는 이미지를 5장 제출하세요</div>
                                <img 
                                    className="host-regist-view0__img" 
                                    src={decoroom}/>
                            </div>
                        </div>
                        <div className="host-regist-view0__content-section2-part3">
                            <div className="host-regist-view0__content-section2-part3-text1">
                                <span>3.</span>
                                <span className="host-regist-view0__content-section2-logo">등록을 완료하세요</span>
                            </div>
                            <div className="host-regist-view0__content-section2-part3-text2">
                                <div>숙소 요금을 설정하고 등록을 완료하세요</div>
                                <img 
                                    className="host-regist-view0__img" 
                                    src={restroom}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Acc-resist-lv0__footer">
                    <Host_footer 
                        button_state = {button_state} 
                        fetch_handler = {fetch_acc}
                        drop_data = {null} 
                        fetch_state = {fetch_state}/>
                </div>
            </div>
    )

}

export default HostRegistView0