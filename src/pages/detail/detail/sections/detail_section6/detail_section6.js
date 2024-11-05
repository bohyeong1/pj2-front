import React from "react";
import './detail_section6.scss'
import default_data from "@/util/default_data/default_data";
import { useState } from "react";
import AlertModal from "@/utilComponent/modal/alert_modal/alert_modal";
import useDetailSection6Style from "../../hook_store/style_hooks/detail_section6_style";
import checkin_icon from '@/assets/icon/checkin-icon.png'
import checkout_icon from '@/assets/icon/checkout-icon.png'
import human_icon from '@/assets/icon/human-icon.png'
import humans_icon from '@/assets/icon/humans-icon.png'
import clock_icon from '@/assets/icon/clock-icon.png'
import dog_icon from '@/assets/icon/dog-icon.png'
import event_icon from '@/assets/icon/event-icon.png'
import vaping_icon from '@/assets/icon/vaping-icon.png'
import camera_icon from '@/assets/icon/empty-camera-icon.png'
import add_rule_icon from '@/assets/icon/add-rule-icon.png'

function DetailSection6({data}){   

    // =================================================
    // const //
    const [refund_rule] = useState(data.seller.host_text.refund_rule)

    // =================================================
    // hooks //
    // style
    const {modal_toggle} = useDetailSection6Style()

    return(
        <div className="detail-section6__container">
            <div className="detail-section6__container-title">
                <span>확인 사항</span>
            </div>
            <div className="detail-section6__container-contents">
                {/* check in out rules */}
                <div className="detail-section6__container-item">
                    <div className="detail-section6__container-item-title">
                        <span>입 · 퇴실 규칙</span>
                    </div>
                    <div className="detail-section6__item-check-time-wrapper">
                        <span>체크인 시간 · {data.check_time.check_in.name} 이후</span>
                        <span>체크아웃 시간 · {data.check_time.check_out.name} 이후</span>
                        <span>게스트 정원 · {data.capacity}명</span>
                        {data.comunication && 
                        <div className='detail-section6__item-check-time-comunication'>
                            <span>{data.comunication.name}</span>
                        </div>}
                    </div>
                    <div className="detail-section6__item-footer">
                        <button onClick={()=>{modal_toggle('detail-section6-check')}}>자세히 보기</button>
                        {/* <img src={default_data.d_imgs.drop_arrow}/> */}
                    </div>
                </div>
                {/* accomodation rules */}
                <div className="detail-section6__container-item">
                    <div className="detail-section6__container-item-title">
                        <span>숙소 규칙</span>
                    </div>
                    <div className="detail-section6__rule-wrapper">
                        {data?.rules.map((el, id)=>{
                            return(
                                <div className="detail-section6__rule-box" 
                                     key={id}>
                                    <span>
                                        {el.text} · 
                                    </span>
                                    <span style={{color : el.state ? '#1273E4' : '#C13515'}}>
                                        {el.name === 'addrule' && !el.state ? '없음' :
                                        el.name !== 'addrule' && !el.state ? '허용 안함' :
                                        el.name === 'animal' && el.state ? `반려동물 ${el.count}까지 허용` : 
                                        el.name === 'addrule' && el.state ? '았음' : 
                                        '허용'}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="detail-section6__item-footer">
                        <button onClick={()=>{modal_toggle('detail-section6-rule')}}>자세히 보기</button>
                        {/* <img src={default_data.d_imgs.drop_arrow}/> */}
                    </div>
                </div>
                {/* refund */}
                <div className="detail-section6__container-item">
                    <div className="detail-section6__container-item-title">
                        <span>환뷸 규정</span>
                    </div>
                    <div className="detail-section6__container-item-refund-box">
                        <span>{refund_rule.title}</span>
                        <p>
                            {refund_rule.name}
                        </p>
                    </div>
                    <div className="detail-section6__item-footer">
                        <button onClick={()=>{modal_toggle('detail-section6-refund')}}>자세히 보기</button>
                        {/* <img src={default_data.d_imgs.drop_arrow}/> */}
                    </div>
                </div>
            </div>

            {/* modal */}
            {/* check modal */}
            <AlertModal
                key_name = {'detail-section6-check'}
                title = {'입·퇴실 규칙'}
                modal_toggle = {modal_toggle}>
                <div className="detail-section6__check-modal-container">
                    <span className="detail-section6__check-modal-title">숙소는 다른 사람이 실제로 거주하는 집일 경우가 많으므로, 숙소를 소중히 다뤄 주세요.</span>
                    <div className="detail-section6__modal-item-wrapper detail-section6__check-modal-border">
                        <span className="detail-section6__modal-title">체크인 및 체크아웃</span>
                        <div className="detail-section6__modal-item">
                            <img src={checkin_icon}/>
                            <span>체크인 시간 · {data.check_time.check_in.name}</span>
                        </div>
                        <div className="detail-section6__modal-item">
                            <img src={checkout_icon}/>
                            <span>체크인 시간 · {data.check_time.check_out.name}</span>
                        </div>
                        <div className="detail-section6__modal-item">
                            <img src={human_icon}/>
                            <span>체크인 방법 · {data.check_method.check_in ? data.check_method.check_in.name : '추후 메세지를 통해 정보를 요청하세요.'}</span>
                        </div>
                    </div>
                    <div className="detail-section6__modal-item-wrapper detail-section6__check-modal-border">
                        <span className="detail-section6__modal-title">예약 규정</span>
                        <div className="detail-section6__modal-item">
                            <img src={humans_icon}/>
                            <span>게스트 정원 · {data.capacity}명</span>
                        </div>
                        <div className="detail-section6__modal-item">
                            <img src={clock_icon}/>
                            <span>최소 예약일 · {data.seller.host_text.min_reservation_date}일</span>
                        </div>
                        <div className="detail-section6__modal-item">
                            <img src={clock_icon}/>
                            <span>최대 예약일 · {data.seller.host_text.max_reservation_date}일</span>
                        </div>
                    </div>
                    <div className="detail-section6__modal-item-wrapper">
                        <span className="detail-section6__modal-title">체크아웃 하기 전에</span>
                        {data.check_method.check_out.length ?
                        data.check_method.check_out.map((el, id) => {
                            return (
                                <div 
                                    className="detail-section6__modal-item-detail"
                                    key={id}>
                                    <img src={el.url}/>
                                    <p>
                                        <span>{el.name}</span>
                                        <span>{el.text}</span>
                                    </p>
                                </div>
                            )
                        }) : 
                        <span>기본 설정된 정보가 없습니다. 호스트와 직접 만난 후 정보를 제공받으세요.</span>}                                         
                    </div>
                </div>
            </AlertModal>

            {/* check modal */}
            <AlertModal
                key_name = {'detail-section6-rule'}
                title = {'숙소 규칙'}
                modal_toggle = {modal_toggle}>
                <div className="detail-section6__rule-modal-container">
                    <span className="detail-section6__rule-modal-title">나중에 당황하는 일이 없도록 호스트 숙소에 대한 중요 정보를 미리 확인하세요.</span>
                    <div className="detail-section6__modal-item-wrapper">
                        <div className="detail-section6__modal-item detail-section6__check-modal-item-border">
                            <img src={dog_icon}/>
                            <span>{data.rules[0].count ? '반려동물 ' + data.rules[0].count + '마리 까지 허용' : '반려동물 동반 불가능'}</span>
                        </div>
                        <div className="detail-section6__modal-item detail-section6__check-modal-item-border">
                            <img src={event_icon}/>
                            <span>{data.rules[1].state ? '숙소 내 이벤트 허용' : '숙소 내 이벤트 비허용'}</span>
                        </div>
                        <div className="detail-section6__modal-item detail-section6__check-modal-item-border">
                            <img src={vaping_icon}/>
                            <span>{data.rules[2].state ? '흡연, 베이핑, 전자담배 허용' : '흡연, 베이핑, 전자담배 비허용'}</span>
                        </div>
                        <div className="detail-section6__modal-item detail-section6__check-modal-item-border">
                            <img src={camera_icon}/>
                            <span>{data.rules[3].state ? '상업적 사진 및 동영상 촬영 허용' : '상업적 사진 및 동영상 촬영 비허용'}</span>
                        </div>
                        <div className="detail-section6__modal-item-detail">
                            <img src={add_rule_icon}/>
                            <p>
                                <span>추가 규칙</span>
                                <span>{data.rules[4].state ? data.rules[4].summary : '추가 규칙 없음'}</span>
                            </p>                            
                        </div>
                    </div>
                </div>
            </AlertModal>
            
            {/* check modal */}
            <AlertModal
                key_name = {'detail-section6-refund'}
                title = {'환불 규정'}
                modal_toggle = {modal_toggle}>
                <div className="detail-section6__refund-modal-container">
                    <span>환불 유형 : {data.seller.host_text.refund_rule.title}</span>
                    <span>{data.seller.host_text.refund_rule.name}</span>
                    {data.seller.host_text.refund_rule.content.map((el, id)=>{
                        return(
                            <p 
                                key={id}
                                className="detail-section6__refund-modal-item">
                                <span>{id + 1}.</span>
                                <span>{el}</span>
                            </p>
                        )
                        
                    })}
                </div>
            </AlertModal>
        </div>
    )
}

export default DetailSection6