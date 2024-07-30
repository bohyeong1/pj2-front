import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './Private-history.css'
import Pri_side_menu from "../../../menu/pri-side-menu/Pri-side-menu";
import Main_menu from "../../../menu/main-menu/main-menu";
import Footer from "../../../menu/footer/Footer";
import connectData from "../../../utilData/UtilFunction";
import default_data from "../../../utilData/defaultData";
import History_main from "../../../picture/history-main/History-main";

function Private_history(){

    const navigate = useNavigate()

    const [resData, setResData] = useState(null)

    const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터

    async function reservationData(){
        const resData = await connectData(`${default_data.d_base_url}/api/reserv`,'POST',{
            userId : userData._id
        })
        // if(resData.length !== 0 && resData){

        // }else{
        //     console.log('예약목록 없음')
        // }
        setResData(resData)
    }
    // console.log(resData[0]?.accomodation)

    console.log(resData)

    useEffect(()=>{
        reservationData()
    },[])

    // 숙소평가클릭
    function clickEvalu(url){
        // console.log(url.accomodation) 
        navigate(`/evaluation/${url.accomodation}`)
    }

    console.log(resData)

    return(
        <div className="Private_history-container">
            <Main_menu></Main_menu>
            <div className="Private_history-content">
                <Pri_side_menu data={default_data.pri_sidemenu}></Pri_side_menu>
                <div className="pri-his-con-main">

                    <div className="pri-his-con-main-sec1">
                        <div className="pri-his-con-main-title">예약내역</div>
                        <div className="pri-his-con-m-s1-b1">
                            {resData?.length !== 0 ? resData?.map((el, id)=>{
                                return(
                                    <div key={id} className="pri-his-con-m-s1-b1-d1" 
                                    style={{borderBottom : `${id === resData.length - 1 ? 'none' : 'solid 1px rgb(210, 210, 210)'}`}}> 
                                        <div>
                                            <History_main data={el}></History_main>
                                        </div>
                                        <div className="pri-his-con-m-s1-b1-d2">
                                            <div>                                            
                                                <span>숙소 이름</span>
                                                <span>{el.title}</span>
                                            </div>
                                            <div>
                                                <span>집주인</span>
                                                <span>{el.seller.name}</span>
                                            </div>
                                            <div>
                                                <span>가격</span>
                                                <span>{`${el.totalPrice}원`}</span>
                                            </div>
                                            <div style={{display:'flex'}}>
                                                <span>주소</span>
                                                <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                                                    <span style={{width:'fit-content'}}>{el.main_adress.name}</span>
                                                    <span>{el.sub_adress.name}</span>
                                                </div>

                                            </div>
                                            <div>
                                                <span>예약 날짜</span>
                                                <span>{el.totalPrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <span>없음</span>}
                        </div>

                    </div>
                    <div className="pri-his-con-main-sec2">
                        <div className="pri-his-con-main-sec2-title">이용완료</div>
                        {resData?.length !== 0 ? resData?.map((el, id)=>{
                                    return(
                                        <div key={id} className="pri-his-con-main-sec2-b1"
                                        style={{borderBottom : `${id === resData.length - 1 ? 'none' : 'solid 1px rgb(210, 210, 210)'}`}}>
                                            <div className="pri-his-con-m-s2-b1-d1">
                                                <History_main data={el}></History_main>
                                            </div>
                                            <div className="pri-his-con-m-s2-b1-d2">
                
                                                <button onClick={()=>{clickEvalu(el)}}>숙소 평가/후기 작성</button>
                                                <button onClick={()=>{navigate(`/SubApp/Detail_infoApp/${el.accomodation}`)}}>재방문하기</button>
                                            </div>
                                        </div>
                                    )
                                })
                            : <span>없음</span>}

                    </div>
                </div>
            </div>
            <div className="Private_history-footer">
                <Footer></Footer>
            </div>
        </div>
    )

}

export default Private_history