import React, {useState} from "react";
import './Acc_manage.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Footer from "../../../utilComponent/menu/footer/Footer";
import useAccManageBusiness from "../hook_store/business_hooks/acc_manage_business";
import { state_store } from "../../../utilData/UtilFunction";

function AccManage({login_user}){

    // =================================================
    // state //
    const [acc_data, setAcc_data] = useState(null)

    // =================================================
    // states //
    // business
    const {click_add_button, click_accomodaton_button} = useAccManageBusiness(undefined,
        state_store([
            {
                'acc_data' : acc_data,
                'setAcc_data' : setAcc_data
            }
        ]),
        undefined,
        {
            'login_user' : login_user
        }
    )

    return(
        <div className="Acc-manage__container">
            <Main_menu login_user={login_user}></Main_menu>
            <div className="Acc-manage__content">
                <div className="Acc-manage__section1">
                    <div className="Acc-manage__section1-title">숙소</div>
                    <div className="Acc-manage__section1-add-button small-button" onClick={click_add_button}>
                        <span>숙소 추가</span>
                    </div>
                </div>
                <div className="Acc-manage__sec2">
                    <div className="Acc-manage__section2-title">
                        <div className="Acc-manage__section2-text-part1">숙소 리스트</div>
                        <div className="Acc-manage__section2-text-part2">위치</div>
                        <div className="Acc-manage__section2-text-part3">상태</div>
                    </div>
                </div>
                <div className="Acc-manage__section2-box">
                    {acc_data ? acc_data.map((el, id)=>{
                        return(
                            <div className="Acc-manage__section2-box-container" key={id} onClick={()=>{click_accomodaton_button(el._id)}}>
                                <div className="Acc-manage__section2-box-container-part1">
                                    <img className="Acc-manage__section2-box-container-part1-img" src={el.main_img}></img>
                                    <span style={{fontWeight:'bold'}}>{el.title}</span>
                                </div>
                                <div className="Acc-manage__section2-box-container-part2">{el.search_adress}</div>
                                <div className="Acc-manage__section2-box-container-part3" style={{color:`${el.regist_state ? 'black' : 'red'}`}}>
                                    <span>{el.regist_state ? '등록 완료' : '등록중'}</span>
                                </div>
                            </div>
                        )
                    }) : '등록된 숙소가 없습니다'}
                </div>
            </div>
            <div className="Acc-manage__footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default AccManage