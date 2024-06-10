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
import Det_sec4 from "../det-sec4/Det-sec4";
import Det_sec5 from "../det-sec5/Det-sec5";
import Det_sec6 from "../det-sec6/Det-sec6";

// 모달
import ImgdisModal from "../../../modal/imgdisModal/ImgdisModal";



import connectData from "../../../utilData/Utildata";
import default_data from "../../../utilData/defaultData";





function Detail_infoApp({data}){
    let params = useParams()


    ///state
    const [sellectData, setSellectData] = useState() ///숙소, User, 평가 data
    const [imgModal, setImgModal] = useState(false) ///이미지 모달 상태값



    ////////////숙소 한개 데이터 패치
    async function fetchAccomodation(){

        const houseParam = params.house

        const homeData = await connectData(`${default_data.d_base_url}/api/common/sellect`, 'POST', 
        {_id:houseParam
        })
        // console.log(homeData)
        setSellectData(homeData)
    } 

    useEffect(()=>{
        fetchAccomodation()

    },[])

    // 이미지 모달 껏다 키기
    function imgModalState(){
        setImgModal(!imgModal)
    }




    return(
        <div className="Detail_infoApp-container">
            <Main_menu></Main_menu>
            <div className="Detail_infoApp-img">
                <div className="info-imgBox1">
                    <Detail data={sellectData?.accomodations} handleFnc={imgModalState}></Detail>
                </div>
                <div className="info-imgBox2">
                    <Detail_many data={sellectData?.accomodations} handleFnc={imgModalState}></Detail_many>
                </div>
            </div>

            {/* 요약 숙소 정보 섹션 */}
            <div className="Detail_infoApp-sec1">
                <div className="det-info-con1">
                    <Det_sec1 data={sellectData?.accomodations} user={sellectData?.seller} evaluations={sellectData?.evaluations}></Det_sec1>
                </div>
                <div className="det-info-con2">
                    <Sec1_payment data={sellectData?.accomodations} params={params.house}></Sec1_payment>
                </div>
            </div>
            {/* 지도 */}
            <div className="Detail_infoApp-sec2">
                <Det_sec2 data={sellectData?.accomodations}></Det_sec2>
            </div>

            {/* 숙소 평점 */}
            <div className="Detail_infoApp-sec3">
                <Det_sec3 data={sellectData?.evaluations} avgdata={sellectData?.aggreEvalu}></Det_sec3>
            </div>


            {/* 댓글목록 페이지네이션으로 구성하기 */}
            <div className="Detail_infoApp-sec4">
                <Det_sec4 data={sellectData?.evaluations}></Det_sec4>
            </div>

            {/* 호스트 정보 */}
            <div className="Detail_infoApp-sec5">
                <Det_sec5 data={sellectData?.seller} homeData = {sellectData?.accomodations}></Det_sec5>
            </div>

            {/* 이용규칙 */}
            <div className="Detail_infoApp-sec6">
                <Det_sec6 data={sellectData?.accomodations}></Det_sec6>
            </div>

            <div className="Detail_infoApp-footer">
                <Footer></Footer>
            </div>

            {/* 모달 */}
            <ImgdisModal data={sellectData?.accomodations} imgModalState={imgModalState} imgModal={imgModal}></ImgdisModal>

        </div>
    )
}

export default Detail_infoApp 