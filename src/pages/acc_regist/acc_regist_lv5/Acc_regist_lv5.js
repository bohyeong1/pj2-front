import React,{useEffect, useState, useRef} from "react";
import './Acc_regist_lv5.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import DaumPostcodeEmbed from "react-daum-postcode";
import Kakaomap from "../../../utilData/kakaomap/Kakaomap";



function Acc_regist_lv5(){
    const [popupState, SetpopupState] = useState('none')
    const [sub_coordinate, SetSub_coordinate] = useState([]) ///////////////상세 주소 위도,경도
    const [main_adress, setMain_adress] = useState()       ///////////기본주소


    const adressRef = useRef()

    ////주소 인풋창 클릭 함수
    function clickAdressIn(e){
        e.stopPropagation()
        SetpopupState('block')
        // Postcode.appendChild(e.target)
    }

    ///////인풋 데이터 함수
    function inputData(data){

        // data.sido 시,도 정보             main_adress에 저장할 것
        // data.roadAddress 도로명 주소     sub_adress에 저장할 것

        adressRef.current.value = data.roadAddress
        SetpopupState('none')
        setMain_adress(data.roadAddress)

    }

    // /////인풋 데이터 팝업창 close 함수
    // function inputDataClose(state){
    //     if (state === 'FORCE_CLOSE') {
    //         // setIsOpen(false);
    //         console.log('FORCE_CLOSE');
    //       } else if (state === 'COMPLETE_CLOSE') {

    //         console.log('COMPLETE_CLOSE');
    //       }
    // }

    function dataFnc(data){           ///////카카오 맵의 데이터 가져오기
        SetSub_coordinate(data)
        console.log(data)
    }

    const popupStyle = {
        width: '400px',
        height: '470px',
        display:popupState,
        position:'fixed',
        left:'50%', transform:'translate(-50%,-50%)',
        top:'45%', zIndex:'4'
      }

    

    return(
        <div className="Acc_regist_lv5-container" onClick={(e)=>{
            if(!e.target.classList.contains('popup')){
                SetpopupState('none')
            }
        }}>
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv5_content">
                <div className="Acc_regist_lv5-con-title">
                    숙소 위치 입력
                </div>
                <div className="Acc_regist_lv5-con-sec1">
                    <div className="Acc_regist_lv5-con-s1-b1">상세 주소는 예약이 확정된 이후에 공개 됩니다.</div>
                    <form className="Acc_regist_lv5-con-s1-b2">
                        <input className="ac_reg_lv5-con-s1-b2-in" ref={adressRef} readOnly={true} type="text" placeholder="도로명 / 지번" onClick={clickAdressIn}></input>
                        <input className="ac_reg_lv5-con-s1-b2-in" type="text" placeholder="상세주소"></input>
                    </form>
                    {/* 지도 */}
                    <div className="Acc_regist_lv5-con-s1-b3">
                        <div className="Acc_regist_lv5-con-s1-b3-t1">
                            <div className="Acc_regist_lv5-con-s1-b3-t1-d1">구체적인 위치를 표시해주세요</div>
                            <div className="Acc_regist_lv5-con-s1-b3-t1-d2">숙소 판매 페이지에서는 도로명 주소의 위치가 표시되며 <br/> 예약 확정 시 상세 위치가 표시 됩니다</div>
                        </div>
                        <div className="Acc_regist_lv5-con-s1-b3-t2">
                            <Kakaomap setDataHandler={dataFnc} adressData={main_adress}></Kakaomap>
                        </div>
                    </div>

                </div>
                <DaumPostcodeEmbed submitMode={false} onComplete={inputData} className="popup" style={popupStyle} autoClose={false}></DaumPostcodeEmbed>
            </div>

            <div className="Acc_regist_lv5-footer">
                <Host_footer></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv5