import React, {useEffect,useState} from "react";
import './Detail_infoApp.css'
import { useParams } from "react-router-dom";
import Main_menu from "../../../menu/main-menu/main-menu";
import Detail_many from "../../../picture/detail-many/Detail-many";
import Detail from "../../../picture/detail/Detail";
import Footer from "../../../menu/footer/Footer";
import Det_sec1 from "../det-sec1/Det-sec1";
import Sec1_payment from "../det-sec1/sec1-payment/Sec1-payment";
import Det_sec2 from "../det-sec2/Det-sec2";
import Det_sec3 from "../det-sec3/Det-sec3";


import connectData from "../../../utilData/Utildata";
import default_data from "../../../utilData/defaultData";





function Detail_infoApp({data}){
    let params = useParams()


    ///state
    const [sellectData, setSellectData] = useState() ///숙소, User, 평가 data


    ////////////숙소 한개 데이터 패치
    async function fetchAccomodation(){

        const houseParam = params.house

        const homeData = await connectData(`${default_data.d_base_url}/api/common/sellect`, 'POST', 
        {_id:houseParam
        })
        console.log(homeData)
        setSellectData(homeData)
    } 

    useEffect(()=>{
        fetchAccomodation()

    },[])

    return(
        <div className="Detail_infoApp-container">
            <Main_menu></Main_menu>
            <div className="Detail_infoApp-img">
                <div className="info-imgBox1">
                    <Detail data={sellectData?.accomodations}></Detail>
                </div>
                <div className="info-imgBox2">
                    <Detail_many data={sellectData?.accomodations}></Detail_many>
                </div>
            </div>
            <div className="Detail_infoApp-sec1">
                <div className="det-info-con1">
                    <Det_sec1 data={sellectData?.accomodations} user={sellectData?.seller}></Det_sec1>
                </div>
                <div className="det-info-con2">
                    <Sec1_payment data={sellectData?.accomodations} params={params.house}></Sec1_payment>
                </div>
            </div>
            <div className="Detail_infoApp-sec2">
                <Det_sec2 data={sellectData?.accomodations}></Det_sec2>
            </div>
            <div className="Detail_infoApp-sec3">
                <Det_sec3 data={sellectData?.aggreEvalu}></Det_sec3>
            </div>
            <div className="Detail_infoApp-sec4">섹션 4 / 숙소 평가</div>
            <div className="Detail_infoApp-sec5">섹션 5 / 호스트 정보</div>
            <div className="Detail_infoApp-sec6">섹션 6 / 숙소 이용규칙/ 환불정책</div>

            <div className="Detail_infoApp-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Detail_infoApp 