import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './Private-history.css'
import Pri_side_menu from "../../../menu/pri-side-menu/Pri-side-menu";
import Main_menu from "../../../menu/main-menu/main-menu";
import Footer from "../../../menu/footer/Footer";
import connectData from "../../../utilData/Utildata";
import default_data from "../../../utilData/defaultData";
import Small_main from "../../../picture/small-main/Small-main";

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
                            {resData?.length !== 0 ? resData?.map((el)=>{
                                return(
                                    <div className="pri-his-con-m-s1-b1-d1">
                                        <div>
                                            <Small_main data={el}></Small_main>
                                        </div>
                                    </div>
                                )
                            }) : <span>없음</span>}
                        </div>
                        <div className="pri-his-con-m-s1-b2">

                        </div>
                    </div>
                    <div className="pri-his-con-main-sec2">
                        <div className="pri-his-con-main-sec2-title">이용완료</div>
                        {resData?.length !== 0 ? resData?.map((el)=>{
                                    return(
                                        <div className="pri-his-con-main-sec2-b1">
                                            <div className="pri-his-con-m-s2-b1-d1">
                                                <Small_main data={el}></Small_main>
                                            </div>
                                            <div className="pri-his-con-m-s2-b1-d2">
                
                                                <button onClick={()=>{clickEvalu(el)}}>숙소 평가/후기 작성</button>
                                                <button>재방문하기</button>
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