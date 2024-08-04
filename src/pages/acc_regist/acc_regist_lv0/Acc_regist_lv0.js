import React from "react";
import './Acc_regist_lv0.css'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";

function Acc_regist_lv0(){

    //현재 등록중인 숙소 데이터
    const registData = JSON.parse(sessionStorage.getItem('registData'))
    // console.log(registData) 

    return(
        <div className='Acc_regist_lv0-container'>
            <Main_menu></Main_menu>
            <div className="Acc_regist_lv0-content">
                <div className="Acc_regist_lv0-con-sec1">
                    다음과 같은 <br/> 간단한 절차를 <br/> 마무리하고 <br/> 숙소를 등록하세요!
                </div>
                <div className="Acc_regist_lv0-con-sec2">
                    <div className="Acc_regist_lv0-con-s1-b1">
                        <div className="Acc_regist_lv0-con-s1-b1-t1">
                            1 숙소 정보를 입력하세요
                        </div>
                        <div className="Acc_regist_lv0-con-s1-b1-t2">
                            <div>숙소의 위치와 숙박 가능인원 등 기본 정보를 입력하세요</div>
                            <img className="Acc_regist-imgs" src={default_data.d_imgs.bedroom}></img>
                        </div>
                    </div>
                    <div className="Acc_regist_lv0-con-s1-b2">
                        <div className="Acc_regist_lv0-con-s1-b2-t1">
                            2 숙소 이미지를 등록하세요
                        </div>
                        <div className="Acc_regist_lv0-con-s1-b2-t2">
                            <div>숙소를 돋보이게 하는 이미지를 5장 제출하세요</div>
                            <img className="Acc_regist-imgs" src={default_data.d_imgs.decoroom}></img>
                        </div>
                    </div>
                    <div className="Acc_regist_lv0-con-s1-b3">
                        <div className="Acc_regist_lv0-con-s1-b3-t1">
                            3 등록을 완료하세요
                        </div>
                        <div className="Acc_regist_lv0-con-s1-b3-t2">
                            <div>숙소 요금을 설정하고 등록을 완료하세요</div>
                            <img className="Acc_regist-imgs" src={default_data.d_imgs.door}></img>
                        </div>
                    </div>
                </div>
            </div>

            <div className="Acc_resist_lv0_footer">
                <Host_footer></Host_footer>
            </div>
        </div>
    )

}

export default Acc_regist_lv0