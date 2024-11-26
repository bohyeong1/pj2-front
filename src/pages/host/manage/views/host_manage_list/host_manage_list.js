import {useState, useContext} from "react";
import './host_manage_list.scss'
import useHostManageListBusiness from "../../hook_store/business_hooks/host_manage_list_business";
import { state_store } from "@/util/function/util_function";
import { UserContext } from '@/context/user_context/config/user_context';

function HostManageList(){

    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // state //
    const [acc_data, setAcc_data] = useState(null)

    // =================================================
    // states //
    // business
    const {
        click_add_button, 
        click_accomodaton_button
    } = useHostManageListBusiness(
        {
            user_data
        },
        state_store([
            {acc_data,setAcc_data}
        ])
    )

    return(
        <div className="host-manage-list__container">
            <div className="host-manage-list__content">
                <div className="host-manage-list__section1">
                    <div className="host-manage-list__section1-title">숙소</div>
                    <div 
                        className="host-manage-list__section1-add-button small-button" 
                        onClick={click_add_button}>
                        <span>숙소 추가</span>
                    </div>
                </div>
                <div className="host-manage-list__section2-title-wrapper">
                    <div className="host-manage-list__section2-title">
                        <div className="host-manage-list__section2-text-part1">숙소 리스트</div>
                        <div className="host-manage-list__section2-text-part2">위치</div>
                        <div className="host-manage-list__section2-text-part3">상태</div>
                    </div>
                </div>
                <div className="host-manage-list__section2-box">
                    {acc_data ? acc_data.map((el, id)=>{
                        return(
                            <div 
                                className="host-manage-list__section2-box-container" 
                                key={id} 
                                onClick={()=>{click_accomodaton_button(el._id, el)}}>
                                <div className="host-manage-list__section2-box-container-part1">
                                    <img 
                                        className="host-manage-list__section2-box-container-part1-img" 
                                        src={el.main_img}/>
                                    <span>{el.title}</span>
                                </div>
                                <div className="host-manage-list__section2-box-container-part2">{el.search_adress}</div>
                                {el.regist_state ?
                                <div className="host-manage-list__section2-box-container-part3">
                                    <div className="host-manage-list__section2-box-container-part3-complete"></div>
                                    <span>등록 완료</span>
                                </div> : 
                                <div className="host-manage-list__section2-box-container-part3">
                                    <span>등록 중</span>
                                </div>}
                            </div>
                        )
                    }) : '등록된 숙소가 없습니다'}
                </div>
            </div>
        </div>
    )
}

export default HostManageList