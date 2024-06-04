import React, {useEffect,useState} from "react";
import './Detail_infoApp.css'
import { useParams } from "react-router-dom";
import Main_menu from "../../../menu/main-menu/main-menu";
import Detail_many from "../../../picture/detail-many/Detail-many";
import Detail from "../../../picture/detail/Detail";
import Footer from "../../../menu/footer/Footer";
import Det_sec1 from "../det-sec1/Det-sec1";
import Sec1_payment from "../det-sec1/sec1-payment/Sec1-payment";
import connectData from "../../../utilData/Utildata";
import default_data from "../../../utilData/defaultData";





function Detail_infoApp({data}){
    let params = useParams()


    ///state
    const [sellectData, setSellectData] = useState() ///숙소 data
    const [user, setUser] = useState()  ///유저 data

    ////////////숙소 한개 데이터 패치
    async function fetchAccomodation(){

        const houseParam = params.house

        const homeData = await connectData(`${default_data.d_base_url}/api/common/sellect`, 'POST', 
        {_id:houseParam
        })
        console.log(homeData)
        setSellectData(homeData.accomodations)
        setUser(homeData.seller)
    } 

    useEffect(()=>{
        fetchAccomodation()

    },[])

    return(
        <div className="Detail_infoApp-container">
            <Main_menu></Main_menu>
            <div className="Detail_infoApp-img">
                <div className="info-imgBox1">
                    <Detail data={sellectData}></Detail>
                </div>
                <div className="info-imgBox2">
                    <Detail_many data={sellectData}></Detail_many>
                </div>
            </div>
            <div className="Detail_infoApp-sec1">
                <div className="det-info-con1">
                    <Det_sec1 data={sellectData} user={user}></Det_sec1>
                </div>
                <div className="det-info-con2">
                    <Sec1_payment data={sellectData} params={params.house}></Sec1_payment>
                </div>
            </div>
            <div className="Detail_infoApp-sec2">섹션 2 / 숙소 평가</div>
            <div className="Detail_infoApp-sec3">섹션 3 / 사용자 댓글</div>
            <div className="Detail_infoApp-sec4">섹션 4 / 숙소 위치/ 지도 api</div>
            <div className="Detail_infoApp-sec5">섹션 5 / 호스트 정보</div>
            <div className="Detail_infoApp-sec6">섹션 6 / 숙소 이용규칙/ 환불정책</div>

            <div className="Detail_infoApp-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Detail_infoApp 