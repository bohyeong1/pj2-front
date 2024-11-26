import './host_regist_view12.scss'
import Host_footer from "@/utilComponent/menu/host-footer/Host-footer";
import Congratulation from "@/utilComponent/material/congratulation/congratulation";
import '@/manage_scss_style/commonness/commonness.scss'
import useHostRegistView12Business from '../../hook_store/business_hooks/host_regist_view12_business';
import { HostAccContext } from "@/context/host_acc_context/config/host_acc_context";
import { useContext, useState } from 'react';
import useHostRegistView12Style from '../../hook_store/style_hooks/host_regist_view12_style';
import {pop_three_texts} from '@/util/function/util_function'

function HostRegistView12(){
    // =================================================
    // const //
    const [title] = useState('등록이 완료 되었습니다!')

    // =================================================
    // context states //
    const {host_acc, setHost_acc} = useContext(HostAccContext)

    // =================================================
    // hooks //
    // business
    const {
        link_button1
    } = useHostRegistView12Business()
    // style
    const {} = useHostRegistView12Style()

    return(
        <div className="host-regist-view12__container">
            <Congratulation></Congratulation>
            <div className="host-regist-view12__content">
                <div className="host-regist-view12__content-title">
                    {title.split('').map((el, id)=>{
                        return (
                            <span 
                                key={id}
                                className='host-regist-view12__content-text'>
                                {el}
                            </span>
                        )
                    })}
                                        
                </div>
                <div className="host-regist-view12__content-section1">
                    <div className="host-regist-view12__content-section1-part1 box-shadow-lv3">
                        <div className='host-regist-view12__img-wrapper'>
                            <img 
                                src={host_acc.main_img}
                                className='host-regist-view12__img box-shadow-lv1'/>
                            <img 
                                src={host_acc.sub_img[0]}
                                className='host-regist-view12__img box-shadow-lv1'/>
                            <img 
                                src={host_acc.sub_img[1]}
                                className='host-regist-view12__img box-shadow-lv1'/>    
                        </div>
                        <div className='host-regist-view12__content-section1-part1-content'>
                            <div className='host-regist-view12__content-section1-part1-content-text-wrapper'>
                                <span>제목</span>
                                <span>{host_acc.title}</span>
                            </div>
                            <div className='host-regist-view12__content-section1-part1-content-text-wrapper'>
                                <span>수용 인원</span>
                                <span>{host_acc.capacity}명</span>
                            </div>
                            <div className='host-regist-view12__content-section1-part1-content-text-wrapper'>
                                <span>숙소 가격</span>
                                <span>{pop_three_texts(host_acc.price)}원</span>
                            </div>
                            <div className='host-regist-view12__content-section1-part1-content-text-wrapper'>
                                <span>추가 인원 가격</span>
                                <span>{pop_three_texts(host_acc.addPrice)}원</span>
                            </div>
                        </div>
                    </div>
                    

                </div>
                <div className="host-regist-view12__content-section2">
                    <div className='host-regist-view12__content-section2-part1'>
                        <span>게스트에게 더 다양한 정보를 제공하기 위해 환불 정책, 체크인, 아웃 정책등을 설정 해주세요!</span>
                    </div>
                    <div className="host-regist-view12__content-section2-part2">
                        <button className="host-regist-view12__btn" onClick={link_button1}>바로가기</button>
                    </div>
                </div>
            </div>

            <div className="host-regist-view12__footer">
                <Host_footer></Host_footer>
            </div>
        </div>
    )
}

export default HostRegistView12