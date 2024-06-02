import React,{useRef, useState} from "react";
import './Acc_regist_lv11.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import connectData from "../../../utilData/Utildata";
import default_data from "../../../utilData/defaultData";

function Acc_regist_lv11(){
    // ref
    const priceRef = useRef()
    const addPriceRef = useRef()

    // 선택된 카테고리의 data값 state
    const [sellectData, setSellectData] = useState({
        price:null, addPrice:null
    })


    const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터
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

    //////////////////타이틀 스테이트값 1초 디바운스 한후에 스테이트에 담기 ㅇㅇ
    function handleFn(){
        let copied_data = sellectData
        copied_data.price = Number(priceRef.current.value)
        setSellectData(copied_data)
    }

    const debounceSetPrice = debounce(handleFn,1000)   

        //////////////////타이틀 스테이트값 1초 디바운스 한후에 스테이트에 담기 ㅇㅇ
        function handleAddFn(){
            let copied_data = sellectData
            copied_data.addPrice = Number(addPriceRef.current.value)
            setSellectData(copied_data)
        }
    
        const debounceSetAddPrice = debounce(handleAddFn,1000)   

        
    ///숙소 데이터 업데이트 패치
    async function fetchCategory(data){
        const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register/update`, 'PUT', 
        {seller : userData._id,
        price : data.price,
        addPrice : data.addPrice
        }, localStorage.getItem('log'))
        
    }     
    
    ///가격 온체인지 함수
    function changePrice(){
        debounceSetPrice()
    }

    //추가인원 온체인지 함수
    function changeAddPrice(){
        debounceSetAddPrice()
    }

    console.log(sellectData)

    return(
        <div className="Acc_regist_lv11-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv11_content">
                <div className="Acc_regist_lv11-con-title">
                    호스팅 가격을 정해주세요!
                </div>
                <div className="Acc_regist_lv11-con-sec1">  
                    <div className="Acc_regist_lv11-con-s1-box1">예약 가격</div>                 
                    <input type="text" ref={priceRef}
                    onInput={(e)=>{e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')}}
                    onChange={changePrice}/>

                    <div className="Acc_regist_lv11-con-s1-box2">추가 인원 가격</div>
                    <input type="text" ref={addPriceRef} onInput={(e)=>{e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')}}
                    onChange={changeAddPrice}></input>

                </div>
            </div>

            <div className="Acc_regist_lv11-footer">
                <Host_footer fetchHandlerFun = {fetchCategory} dropData = {sellectData}></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv11