import React,{useEffect, useState, useRef} from "react";
import './Acc_regist_lv5.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import DaumPostcodeEmbed from "react-daum-postcode";
import Kakaomap from "../../../utilData/kakaomap/Kakaomap";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/Utildata";


////////////검색어 만드는 디폴트 값 , 초기버전 
const specialCity = ['서울','부산','대구','대전','울산','인천','광주']
const island = ['제주']              // ex. 제주 특별 자치시등등등..
const island2 = ['울릉']

function Acc_regist_lv5(){

    const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터


    //////////////////////////state
    const [popupState, SetpopupState] = useState('none')
    const [initial_adress, setInitial] = useState(null)
    const [sub_coor, setSub_coor] = useState([])  /////////상세주소 위도 경도

    const [sub_adress, SetSub_adress] = useState() ///////////////상세 주소
    const [main_adress, setMain_adress] = useState(default_data.d_main_adress)    ///////////기본주소
    const [filter_adress, setFilter_adress] = useState() ///////////검색창에 주소 검색어 넣는곳 
    const [sellectData, setSellectData] = useState()

    ///숙소 데이터 업데이트 패치
    async function fetchCategory(data){      


        const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register/update`, 'PUT', 
        {seller : userData._id,
            main_adress : data.main,
            sub_adress : data.sub,
            search_adress : data.filter
        }, localStorage.getItem('log'))    
    } 


    /////////////////ref
    const adressRef = useRef()
    const sub_adressRef = useRef()

    ////////////////////디바운싱
    function debounce(func, delay) {
        let timer;
        return function() {
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        }
    }

    ///////////////////// 서브 주소 onchange 함수
    function sub_ad_onchange_fun(){
        let def_structure = default_data.d_sub_adress

        def_structure.name = sub_adressRef.current.value
        def_structure.coor = [main_adress.coor[0],main_adress.coor[1]]
        SetSub_adress(def_structure)

    }

    /////////main_adress 데이터 저장
    function setMain_adress_fun(adress, x, y){
        let def_structure = default_data.d_main_adress
        def_structure.name = adress
        def_structure.coor = [x,y]
        setMain_adress(def_structure)
    }

    /////////// sub_adress 데이터 저장
    function setSub_adress_fun(x, y){
        let def_structure = sub_adress
        def_structure.coor = [x,y]
        SetSub_adress(def_structure)
    }

    ///////////카카오맵에서 클릭한 곳 위도경도 받아오기
    function set_sub_coorFn(x,y){
        const coordina = [x,y]
        setSub_coor(coordina)
    }

    ///////////////카카오맵에서 받아온 세부주소 위도경도 주소로 sub_adress 스테이트값 변경하기
    useEffect(()=>{
        if(sub_coor.length != 0){
            let sub_ad = sub_adress
            sub_ad.coor = sub_coor
            SetSub_adress(sub_ad)

        }

        setSellectData({
            main:main_adress,
            sub:sub_adress,
            filter:filter_adress
        })

    },[sub_coor,sub_adress])

    
// console.log('메인',main_adress)
// console.log('서브',sub_adress)
console.log('필터', sellectData)



    ////주소 인풋창 클릭 함수
    function clickAdressIn(e){
        e.stopPropagation()
        SetpopupState('block')
    }

    ///////인풋 데이터 함수
    function inputData(data){

        // data.sido 시,도 정보             filter_adress에 가공해서 저장할 것
        // data.sigungu 시,군,구 정보       filter_adress에 가공해서 저장할 것
        // data.roadAddress 도로명 주소     main_adress에 저장할 것


        ////////////////검색창에 필터링 할때 쓰는 주소 검색어 만들어보기 // 초기버전 제주도 울릉도 등등만 넣어보기 ㅇ
        if(specialCity.includes((data.sido).slice(0,2))){
            setFilter_adress((data.sido).slice(0,2))
        }else if(island.includes((data.sido).slice(0,2))){
            setFilter_adress((data.sido).slice(0,2)+'도')
        }else if(island2.includes((data.sigungu).slice(0,2))){
            setFilter_adress((data.sigungu).slice(0,2)+'도')
        } else{
            let copiedData = data.sigungu
            const length = copiedData.length
            setFilter_adress(copiedData.slice(0,length-1))
        }

        adressRef.current.value = data.roadAddress
        SetpopupState('none')
        setInitial(data.roadAddress)
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
                    <form className="Acc_regist_lv5-con-s1-b2">
                        <input className="ac_reg_lv5-con-s1-b2-in" ref={adressRef} readOnly={true} type="text" placeholder="도로명 / 지번" onClick={clickAdressIn}></input>
                        <input className="ac_reg_lv5-con-s1-b2-in" type="text" placeholder="상세주소" ref={sub_adressRef} onChange={debounce(sub_ad_onchange_fun,1000)}></input>
                        <div className="Acc_regist_lv5-con-s1-b1" style={{display:`${initial_adress?'block':'none'}`}}>상세 주소와 상세 지도 정보는 예약이 확정된 이후에 공개 됩니다.</div>
                    </form>

                    {/* 지도 */}
                    <div className="Acc_regist_lv5-con-s1-b3">
                        <div className="Acc_regist_lv5-con-s1-b3-t1">
                            <div className="Acc_regist_lv5-con-s1-b3-t1-d1">구체적인 위치를 클릭해주세요</div>
                        </div>
                        <div className="Acc_regist_lv5-con-s1-b3-t2">
                            <Kakaomap adressData={initial_adress} setMain_adress_fun={setMain_adress_fun}
                            set_sub_coorFn={set_sub_coorFn} sub_ad_date={sub_adress} event={true}></Kakaomap>
                        </div>
                    </div>

                </div>
                <DaumPostcodeEmbed submitMode={false} onComplete={inputData} set_sub_coorFn={set_sub_coorFn} className="popup" style={popupStyle} autoClose={false}></DaumPostcodeEmbed>
            </div>

            <div className="Acc_regist_lv5-footer">
                <Host_footer fetchHandlerFun = {fetchCategory} dropData = {sellectData}></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv5